import { storageGet, storageSet } from './components/StorageSet'

const clearConsoleOnHMR = 'clearConsoleOnHMR'

export const shouldClearConsoleOnHMR = () => storageGet(clearConsoleOnHMR, true)
export function toggleClearConsoleOnHMR() {
  storageSet(clearConsoleOnHMR, !Boolean(shouldClearConsoleOnHMR()))
}
