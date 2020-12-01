const { BrowserWindow, app, ipcMain, dialog, Menu, MenuItem, Tray } = require('electron');
const path = require('path');

let tray;

function createWindow(){
    /* const mainWindow = new BrowserWindow({
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
    mainWindow.webContents.openDevTools(); */

   /*  
   let timerId ;

    mainWindow.on('ready-to-show', () => {
        timerId = setInterval(() => {
            mainWindow.webContents.send('evt:time', new Date());
        },1000);
    });

    mainWindow.on('closed', () => {
        if (timerId) clearInterval(timerId);
    }); 
    */
    


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

    //Tray 
    /* 
    tray = new Tray(path.join(__dirname, "icon.jpg"));
    const template  = [
        { 
            label : 'Audio',
            submenu : [
                {
                    label : 'Low',
                    type : 'radio',
                    checked : true
                },
                { 
                    label : 'High',
                    type : 'radio'
                }
            ]
        }
    ];

    const contextMenu = Menu.buildFromTemplate(template);
    tray.setContextMenu(contextMenu);
    tray.setToolTip('My Tray App'); 
    */
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

app.on('ready', () => {
    createWindow();
    const template = [
        {
            label : 'Demo',
            submenu : [
                {
                    label : 'Greet',
                    submenu : [
                        {
                            label : 'Personal',
                            click: function () {
                                console.log('Hi there!')
                            }
                        },
                        {
                            label : 'Official'
                        }
                    ]
                },
                {
                    type : 'separator'
                },
                {
                    label : 'Busy',
                    type : 'radio',
                    checked : true
                }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
});

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
});

//Context menu
app.on('browser-window-created', (evt, win) => {
    const ctxMenu = new Menu();
    ctxMenu.append(new MenuItem({
        label : 'Hello',
        click : function(){
            console.log('Context menu activated');
        }
    }))
    ctxMenu.append(new MenuItem({ role : 'selectall'}))
    win.webContents.on('context-menu', (evt, params) => {
        ctxMenu.popup(win, params.x, params.y);
    });
})