
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
    console.log('before sending the message');
    ipcRenderer.send('evt:message', 'Message from the renderer');
    console.log('Message sent');
});

const btnSendMessageSync = document.getElementById('btnSendMessageSync');

btnSendMessageSync.addEventListener('click', () => {
    console.log('before sending the message');
    const response = ipcRenderer.sendSync('evt:messageSync', 'Message from the renderer');
    console.log(response);
    console.log('Message sent');
});

ipcRenderer.on('evt:ack', (evt, data) => {
    console.log('from main process');
    console.log(data);
});

const btnDisplayError = document.getElementById('btnDisplayError');
btnDisplayError.addEventListener('click', () => {
    ipcRenderer.send('evt:error', 'Something went wrong!');
});

ipcRenderer.on('evt:time', (evt, data) => {
    document.getElementById('div-time').innerText = data;
});