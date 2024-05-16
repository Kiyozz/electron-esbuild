import { app, BrowserWindow } from 'electron'
import { isDev } from 'electron-util/main'
import { is } from 'electron-util'
import * as path from 'node:path'

let win: BrowserWindow | null = null

const dirname = path.dirname(new URL(import.meta.url).pathname)

async function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 820,
    minHeight: 600,
    minWidth: 650,
    webPreferences: {
      preload: path.join(dirname, 'preload.mjs'),
    },
    show: false,
  })

  win.loadURL('https://duckduckgo.com') // load any url you want to use with electron

  win.on('closed', () => {
    win = null
  })

  win.webContents.on('devtools-opened', () => {
    win!.focus()
  })

  win.on('ready-to-show', () => {
    win!.show()
    win!.focus()

    if (isDev) {
      win!.webContents.openDevTools({ mode: 'bottom' })
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
