
const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${window.versions.chrome()}), Node.js (v${window.versions.node()}), and Electron (v${window.versions.electron()})`
// ipcRenderer.on('money', (event, data) => {
//   console.log(data)
//   // Send a message back to the main process
//   ipcRenderer.send('message', 'Hello from the renderer process!')
// })