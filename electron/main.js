const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const TpSeries = require('tp-rs232')
const BillAcceptor = require('../helpers/BillAcceptor')
let mainWindow;
let money = 0;

function createWindow() {
  // Create the browser window.
  console.log(path.join(__dirname, 'preload.js'))
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // Load the index.html file.
  mainWindow.loadFile('index.html')

  // mainWindow.webContents.send('data', "test")
  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

function readBill(result) {
  const moneyValueChannel = {
    1 : 10000,
    2 : 20000,
    3 : 50000,
    4: 100000,
    5: 200000,
    6: 500000
  }
  money += moneyValueChannel[result.channel]
  mainWindow.webContents.send('money', money)
  console.log('money', money)
}

app.whenReady().then(() => {
  createWindow()
  let bill = new BillAcceptor.BillAcceptor(readBill)
  app.on('activate', () => {
    // On macOS, re-create a window when the dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  // On macOS, quit the app when all windows are closed, except if the user is holding the Command key.
  if (process.platform !== 'darwin') {
    app.quit()
  }
})