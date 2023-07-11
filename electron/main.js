const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const BillAcceptor = require('../helpers/BillAcceptor')

let mainWindow;
let money = 0;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
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
}

app.whenReady().then(() => {
  createWindow()
  let bill = new BillAcceptor.BillAcceptor(readBill)
  ipcMain.handle("getMoney", () => money)

  app.on('activate', () => {
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