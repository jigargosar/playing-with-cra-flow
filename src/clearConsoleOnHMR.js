import { storageGet, storageSet } from './components/StorageSet'

const clearOnHMRKey = 'clearConsoleOnHMR'

export const shouldClearConsoleOnHMR = () => storageGet(clearOnHMRKey, true)
export function toggleClearConsoleOnHMR() {
  storageSet(clearOnHMRKey, !Boolean(shouldClearConsoleOnHMR()))
  // console.log(`clearConsoleOnHMR:`, storageGet(clearOnHMRKey, null))
}
