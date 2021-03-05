import { track } from './track'
import { TypeConfig } from './config'

export function unsupportedType(type: TypeConfig, env?: 'main' | 'renderer'): never {
  const args = [track(), 'unsupported type', type]

  if (env) {
    args.push('for', env)
  }

  console.error(...args)
  process.exit(1)
}

export class Logger {
  constructor(private namespace: string) {}

  log(...args: unknown[]) {
    console.log(track(), `(${this.namespace})`, ...args)
  }

  error(...args: unknown[]) {
    console.error(track(), `(${this.namespace})`, ...args)
  }

  end(...args: unknown[]): never {
    this.error(...args)
    process.exit(1)
  }
}
