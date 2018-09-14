import { storageGet, storageSet } from './components/StorageSet'

const clearOnHMRKey = 'clearConsoleOnHMR'

function logClearConsoleOnHMRStatus() {
  console.log(`clearConsoleOnHMR:`, storageGet(clearOnHMRKey, null))
}

export const shouldClearConsoleOnHMR = () => storageGet(clearOnHMRKey, true)
export function toggleClearConsoleOnHMR() {
  storageSet(clearOnHMRKey, !Boolean(shouldClearConsoleOnHMR()))
  logClearConsoleOnHMRStatus()
}
