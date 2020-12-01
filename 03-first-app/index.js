const { remote, ipcRenderer } = require('electron');
const { BrowserWindow } = remote;
const btnCreateWindow = document.getElementById('btnCreateWindow');
btnCreateWindow.addEventListener('click', () => {
    
    const mainWindow2 = new BrowserWindow({
        width: 400,
        height: 400,
        maxHeight: 600,
        maxWidth: 800,
        backgroundColor: "#fff",
        //frame : false,
        title: 'Child Window',
        parent: remote.getCurrentWindow(),
        webPreferences: {
            nodeIntegration: true
        }
    });
    mainWindow2.loadFile("index2.html");
    mainWindow2.webContents.openDevTools();
}); 

const btnSendMessage = document.getElementById('btnSendMessage');

btnSendMessage.addEventListener('click',() => {
    ipcRenderer.send('evt:message', 'Message from the renderer');
    console.log('Message sent');
});

ipcRenderer.on('evt:ack', (evt, data) => {
    console.log('from main process');
    console.log(data);
});