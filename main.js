const { app, BrowserWindow } = require('electron')
let win;
function createWindow() {
    win = new BrowserWindow({
        width: 1400,
        height: 800,
        backgroundColor: '#ffff',
        autoHideMenuBar: true,
        center: true,
        resizable:false,
        title: "Task-list Angular+Electron"
    })
    win.loadURL(`file://${__dirname}/dist/ninja-directory/index.html`)

    // win.webContents.openDevTools()
    win.on('close', function () {
        win = null;
    })

    // const child = new BrowserWindow({ parent: win, modal: true, show: false})
    // child.loadURL('https://artinsoft.sharepoint.com/sites/EmployeePortal')
    // child.once('ready-to-show', () => {
    //     child.show()
    // })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
    app.on('active', function () {
        if (win == null) {
            createWindow()
        }
    })
})
