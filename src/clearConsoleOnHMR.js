import { storageGet, storageSet } from './components/StorageSet'

const clearOnHMRKey = 'clearConsoleOnHMR'

function logClearConsoleOnHMRStatus() {
  console.log(`clearConsoleOnHMR:`, storageGet(clearOnHMRKey, null))
}

export function toggleClearConsoleOnHMR() {
  storageSet(clearOnHMRKey, !Boolean(storageGet(clearOnHMRKey, true)))
  logClearConsoleOnHMRStatus()
}
