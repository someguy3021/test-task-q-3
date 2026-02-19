import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useLocalStorage } from 'src/shared/composables/use-local-storage'
import { STORAGE_KEYS } from 'src/shared/constants/storage-keys'
import { type Account, type AccountUpdate } from 'src/entities/account/types/account-types'
import { generateAccountId, createDefaultAccount, updateAccountData } from 'src/entities/account/helpers/account-helpers'

export const useAccountsStore = defineStore('accounts', () => {
  const { value: accounts, setValue: saveToStorage } = useLocalStorage<Account[]>(
    STORAGE_KEYS.ACCOUNTS,
    []
  )

  // Добавление новой пустой записи
  const addAccount = () => {
    const id = generateAccountId();
    const newAccount = createDefaultAccount(id);
    accounts.value.push(newAccount)
    saveToStorage(accounts.value)
    return newAccount.id
  }

  // Удаление записи
  const removeAccount = (id: string) => {
    const index = accounts.value.findIndex(account => account.id === id)
    if (index !== -1) {
      accounts.value.splice(index, 1)
      saveToStorage(accounts.value)
    }
  }

  // Обновление записи
  const updateAccount = (id: string, updates: AccountUpdate) => {
    const index = accounts.value.findIndex(account => account.id === id)
    if (index === -1) return

    const currentAccount = accounts.value[index]
    if (!currentAccount) return // Добавляем проверку на существование

    const updatedAccount = updateAccountData(currentAccount, updates);

    accounts.value[index] = updatedAccount
    saveToStorage(accounts.value)
  }

  // Получение записи по ID
  const getAccountById = (id: string) => {
    return accounts.value.find(account => account.id === id)
  }

  return {
    accounts: computed(() => accounts.value),
    getAccountById,
    addAccount,
    removeAccount,
    updateAccount
  }
})