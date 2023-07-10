const { contextBridge, ipcRenderer } = require('electron')

ipcRenderer.on('money', (event, data) => {
    console.log(data)
    console.log('ipcrender')
    // Send a message back to the main process
    ipcRenderer.send('message', 'Hello from the renderer process!')
  })

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ipcRenderer: () => ipcRenderer,

})