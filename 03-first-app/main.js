const { BrowserWindow, app, ipcMain, dialog } = require('electron');

function createWindow(){
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        maxHeight : 600,
        maxWidth: 800,
        backgroundColor: '#fff',
        title : 'Parent Window',
        //frame : false,
        webPreferences: {
            nodeIntegration : true,
            enableRemoteModule : true
        }
    });
    mainWindow.loadFile('index.html');
    mainWindow.webContents.openDevTools();

    /* const mainWindow2 = new BrowserWindow({
      width: 400,
      height: 400,
      maxHeight: 600,
      maxWidth: 800,
      backgroundColor: "#fff",
      //frame : false,
      title : 'Child Window',
      parent : mainWindow,
      webPreferences: {
        nodeIntegration: true
      }
    });
    mainWindow2.loadFile("index2.html");
    mainWindow2.webContents.openDevTools(); */
}

ipcMain.on('evt:message', (evt, data)=>{
    console.log(data);
    evt.sender.send('evt:ack', { message : 'Message successfully received'});
});

ipcMain.on('evt:messageSync', (evt, data) => {
    console.log(data);
    evt.returnValue = 'Message successfully received';
    //evt.sender.send('evt:ack', { message: 'Message successfully received' });
});

ipcMain.on('evt:error', (evt, data) => {
    dialog.showErrorBox('Application Error', data);
});

app.on('ready', createWindow);

//mac
app.on('window-all-closed', function(){
    if (process.platform === 'darwin' /*mac*/){
        app.quit();
    }
});

app.on('activate', function(){
    if (BrowserWindow.getAllWindows().length === 0){
        createWindow();
    }
})