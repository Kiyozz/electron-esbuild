/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import { cyan, stripColors, yellow } from 'kolorist'

import { Template } from '../enums/template'

export const TEMPLATES = [
  yellow(Template.MainOnlyJavaScript),
  yellow(Template.MainOnlyTypeScript),
  cyan(Template.ReactJavaScript),
  cyan(Template.ReactTypeScript),
  cyan(Template.ReactTypeScriptWebpack),
]

export default function isTemplateValid(template?: string): template is Template {
  if (template === undefined) {
    return false
  }

  return TEMPLATES.map(stripColors).includes(template)
}
