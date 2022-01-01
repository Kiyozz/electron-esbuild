/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import * as fs from 'node:fs'
import * as fsP from 'node:fs/promises'
import * as path from 'node:path'

const renameFiles = {
  gitignore: '.gitignore',
  gitkeep: '.gitkeep',
  'README-template.md': 'README.md',
}

type WriteOptions = {
  file: keyof typeof renameFiles | string
  content?: string
  out: string
  templateDir: string
}

const shouldRename = (file: string): file is keyof typeof renameFiles => {
  return file in renameFiles
}

const copyDir = async (srcDir: string, destDir: string): Promise<void> => {
  await fsP.mkdir(destDir, { recursive: true })

  for (const file of await fsP.readdir(srcDir)) {
    const srcFile = path.resolve(srcDir, file)
    const destFile = path.resolve(destDir, file)
    await copy(srcFile, destFile)
  }
}

const copy = async (src: string, dest: string): Promise<void> => {
  const stat = await fsP.stat(src)

  if (stat.isDirectory()) {
    await copyDir(src, dest)
  } else {
    await fsP.copyFile(src, dest)
  }
}

export const write = async ({
  file,
  content,
  out,
  templateDir,
}: WriteOptions): Promise<void> => {
  const targetPath = path.join(
    out,
    shouldRename(file) ? renameFiles[file] : file,
  )

  if (content) {
    await fsP.writeFile(targetPath, content)
  } else {
    await copy(path.join(templateDir, file), targetPath)
  }
}

export const emptyDir = async (dir: string): Promise<void> => {
  if (!fs.existsSync(dir)) {
    return
  }
  for (const file of await fsP.readdir(dir)) {
    const abs = path.resolve(dir, file)
    if (fs.lstatSync(abs).isDirectory()) {
      await emptyDir(abs)
      await fsP.rmdir(abs)
    } else {
      await fsP.unlink(abs)
    }
  }
}

export const isDirEmpty = async (dir: string): Promise<boolean> => {
  if (!fs.existsSync(dir)) {
    return true
  }

  return (await fsP.readdir(dir)).length === 0
}

export const makeDir = async (dir: string): Promise<unknown> => {
  try {
    return fsP.mkdir(dir, { recursive: true })
  } catch {
    // silent error
  }
}
