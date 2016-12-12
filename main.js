const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');

let win

function createWindow () {
  fs.readFile('./display.txt', function(error, data) {
    console.log(data);
    options = {};
    Object.assign(options, JSON.parse(data));
    console.log(options);
    if(options.width == undefined) {
      options.width = 640;
    }
    if(options.height == undefined) {
      options.height = 360;
    }
    if(options.fullscreen == undefined) {
      options.fullscreen = false;
    }
    if(options.frame == undefined) {
      options.frame = false;
    }
    console.log(options);

    win = new BrowserWindow({width: options.width, height: options.height, frame: options.frame, fullscreen: options.fullscreen});

    win.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    }));

    //win.webContents.openDevTools({'mode': 'detach'});

    win.on('closed', () => {
      win = null
    });
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
