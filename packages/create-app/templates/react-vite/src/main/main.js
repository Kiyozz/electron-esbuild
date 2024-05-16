import { app, BrowserWindow } from 'electron'
import { isDev } from 'electron-util/main'
import { is } from 'electron-util'
import * as path from 'node:path'
import * as url from 'node:url'

/** @type {BrowserWindow | null} */
let win = null

const dirname = path.dirname(new URL(import.meta.url).pathname)

async function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 820,
    minHeight: 600,
    minWidth: 650,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(dirname, 'preload.js'),
    },
    show: false,
  })

  if (isDev) {
    // this is the default port electron-esbuild is using
    win.loadURL('http://localhost:9080')
  } else {
    win.loadURL(
      url.format({
        pathname: path.join(dirname, 'index.html'),
        protocol: 'file',
        slashes: true,
      }),
    )
  }

  win.on('closed', () => {
    win = null
  })

  win.webContents.on('devtools-opened', () => {
    win.focus()
  })

  win.on('ready-to-show', () => {
    win.show()
    win.focus()

    if (isDev) {
      win.webContents.openDevTools({ mode: 'bottom' })
    }
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (!is.macos) {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null && app.isReady()) {
    createWindow()
  }
})
