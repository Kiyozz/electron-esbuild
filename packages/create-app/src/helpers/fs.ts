/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import fs, { promises as fsP } from 'fs'
import path from 'path'

const renameFiles = {
  gitignore: '.gitignore',
  gitkeep: '.gitkeep',
  'README-template.md': 'README.md',
}

interface WriteOptions {
  file: keyof typeof renameFiles | string
  content?: string
  out: string
  templateDir: string
}

function shouldRename(file: string): file is keyof typeof renameFiles {
  return file in renameFiles
}

export function write({ file, content, out, templateDir }: WriteOptions): void {
  const targetPath = shouldRename(file) ? path.join(out, renameFiles[file]) : path.join(out, file)

  if (content) {
    fs.writeFileSync(targetPath, content)
  } else {
    copy(path.join(templateDir, file), targetPath)
  }
}

export function copy(src: string, dest: string): void {
  const stat = fs.statSync(src)

  if (stat.isDirectory()) {
    copyDir(src, dest)
  } else {
    fs.copyFileSync(src, dest)
  }
}

export function copyDir(srcDir: string, destDir: string): void {
  fs.mkdirSync(destDir, { recursive: true })
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file)
    const destFile = path.resolve(destDir, file)
    copy(srcFile, destFile)
  }
}

export function emptyDir(dir: string): void {
  if (!fs.existsSync(dir)) {
    return
  }
  for (const file of fs.readdirSync(dir)) {
    const abs = path.resolve(dir, file)
    if (fs.lstatSync(abs).isDirectory()) {
      emptyDir(abs)
      fs.rmdirSync(abs)
    } else {
      fs.unlinkSync(abs)
    }
  }
}

export function isDirEmpty(dir: string): boolean {
  if (!fs.existsSync(dir)) {
    return true
  }

  return fs.readdirSync(dir).length === 0
}

export async function makeDir(dir: string): Promise<unknown> {
  try {
    return fsP.mkdir(dir, { recursive: true })
  } catch {
    // silent error
  }
}
