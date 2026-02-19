import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useLocalStorage } from 'src/shared/composables/use-local-storage'
import { STORAGE_KEYS } from 'src/shared/constants/storage-keys'
import { type Account, type AccountUpdate } from 'src/shared/utils/account-utils'

export const useAccountsStore = defineStore('accounts', () => {
  const { value: accounts, setValue: saveToStorage } = useLocalStorage<Account[]>(
    STORAGE_KEYS.ACCOUNTS,
    []
  )

  // Добавление новой пустой записи
  const addAccount = () => {
    const newAccount: Account = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      label: '',
      type: 'ldap',
      login: '',
      password: null
    }
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

    // Создаем обновленную запись
    const updatedAccount: Account = {
      id: currentAccount.id,
      label: updates.label !== undefined ? updates.label : currentAccount.label,
      type: updates.type !== undefined ? updates.type : currentAccount.type,
      login: updates.login !== undefined ? updates.login : currentAccount.login,
      password: updates.password !== undefined ? updates.password : currentAccount.password
    }

    // Если тип LDAP, пароль должен быть null
    if (updatedAccount.type === 'ldap') {
      updatedAccount.password = null
    }

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