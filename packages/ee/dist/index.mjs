#!/usr/bin/env node
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target2 = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target2[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target2[prop] = source[prop];
    }
  return target2;
};
import * as fs from "fs/promises";
import minimist from "minimist";
import * as path from "path";
import { build } from "./build.mjs";
const argv = minimist(process.argv.slice(2));
if (argv.version) {
  console.log(JSON.parse((await fs.readFile(path.resolve(__dirname, "../package.json"))).toString("utf-8")).version);
  process.exit(0);
}
const toArray = (value) => {
  return value ? typeof value === "string" ? [value] : value : [];
};
const entries = argv._;
const _a = argv, {
  _,
  "--": __,
  "check-types": checkTypes,
  "ts-project": tsProject = "tsconfig.json",
  format,
  external,
  "clean-outdir": cleanOutDir,
  outdir,
  target
} = _a, options = __objRest(_a, [
  "_",
  "--",
  "check-types",
  "ts-project",
  "format",
  "external",
  "clean-outdir",
  "outdir",
  "target"
]);
const formats = toArray(format);
const externals = toArray(external);
await build({
  entries,
  tsProject,
  outdir,
  cleanOutDir,
  checkTypes,
  formats,
  target,
  options: __spreadProps(__spreadValues({}, options), {
    external: externals
  })
});
//# sourceMappingURL=index.mjs.map
