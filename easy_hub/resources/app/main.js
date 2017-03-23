const electron = require('electron');

const {app, BrowserWindow} = electron;
const path = require('path');
const url = require('url');
const jsonfile = require('jsonfile');
const fs = require('fs');
const _ = require('lodash');  // lodash API, really powerful stuff for js objects. Look at docs or ask Ben for info


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 1366, height: 768, frame: true, icon: path.join(__dirname,'easy_hub_logo.png')})
  //get rid of file bar
  win.setMenu(null);
  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })


}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

function myFunction(){
  var command = $('#commandField')[0];
  var commandOut = $('#commandOutput')[0];
  commandOut.value += ">"+command.value+"\n";
  const spawn = require('child_process').spawn;
  const bat = spawn('cmd.exe', ['/c', command.value]);
  command.value = "";


// Handle normal output
bat.stdout.on('data', (data) => {
    // As said before, convert the Uint8Array to a readable string.
    var str = String.fromCharCode.apply(null, data);
    var command = $('#commandOutput')[0];
    command.value += str+"\n";
});

// Handle error output
bat.stderr.on('data', (data) => {
    // As said before, convert the Uint8Array to a readable string.
    var str = String.fromCharCode.apply(null, data);
    console.error(str);
});


}
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
