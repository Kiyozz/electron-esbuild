var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
import { sync as spawnSync } from "cross-spawn";
import { build as esbuildBuild } from "esbuild";
import glob from "fast-glob";
import { bgCyan, bgGreen, black, cyan, green } from "kolorist";
import { platform } from "os";
import path from "path";
import rimraf from "rimraf";
const clean = async (path2) => {
  return new Promise((resolve, reject) => {
    rimraf(path2, (err) => {
      if (err)
        reject(err);
      else
        resolve();
    });
  });
};
const getEntries = async (paths) => {
  const base = process.cwd();
  const result = await Promise.all(paths.map((p) => {
    let absP = path.resolve(base, p);
    if (absP.includes("'")) {
      absP = absP.replace(/'/g, "");
    }
    if (platform() === "win32") {
      absP = absP.replace(/\\/g, "/");
    }
    return glob(absP);
  }));
  return result.flat();
};
const humanizeDuration = (duration) => {
  if (duration > 1e3) {
    return `${duration / 1e3}s`;
  }
  return `${duration}ms`;
};
const task = (label) => {
  console.log(`${bgCyan(black(" TASK "))} ${cyan(label)}`);
  const now = Date.now();
  return {
    end() {
      const duration = Date.now() - now;
      console.log(`${bgGreen(black(" DONE "))} ${green(`${label} - ${humanizeDuration(duration)}`)}`);
    }
  };
};
const build = async ({
  entries,
  tsProject,
  target = "node14",
  outdir = "dist",
  cleanOutDir = false,
  checkTypes = false,
  formats = ["esm"],
  options
}) => {
  if (cleanOutDir) {
    await clean(outdir);
  }
  const entryPoints = await getEntries(entries);
  if (checkTypes) {
    const cTask = task("CHECKING TYPES");
    spawnSync(`tsc -p ${tsProject}`, { cwd: process.cwd(), stdio: "inherit" });
    cTask.end();
  }
  const bTask = task("BUILDING");
  await Promise.all(formats.map((format) => {
    return esbuildBuild(__spreadValues({
      entryPoints,
      outdir,
      platform: "node",
      format,
      target,
      logLevel: "info",
      outExtension: {
        ".js": format === "cjs" || format === "iife" ? ".js" : ".mjs"
      }
    }, options));
  }));
  bTask.end();
};
export {
  build
};
//# sourceMappingURL=build.mjs.map
