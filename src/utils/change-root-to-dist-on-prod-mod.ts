import { existsSync } from 'fs';
import { join } from 'path';

export function changeRootToDistOnProdMode(rootBase: string) {
  const isDevMode = existsSync(join(rootBase, 'src'))

  if (isDevMode) {
    return join(rootBase)
  }

  return join(rootBase, 'dist')
}