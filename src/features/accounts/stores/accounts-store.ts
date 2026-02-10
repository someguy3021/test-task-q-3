import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface AccountLabel {
  text: string
}

export interface Account {
  id: string
  label: string
  type: 'ldap' | 'local'
  login: string
  password: string | null
}

export interface AccountUpdate {
  label?: string
  type?: 'ldap' | 'local'
  login?: string
  password?: string | null
}

export const useAccountsStore = defineStore('accounts', () => {
  const accounts = ref<Account[]>([])

  // Загрузка из localStorage при инициализации
  const loadFromStorage = () => {
    const saved = localStorage.getItem('accounts')
    if (saved) {
      accounts.value = JSON.parse(saved)
    }
  }

  // Сохранение в localStorage
  const saveToStorage = () => {
    localStorage.setItem('accounts', JSON.stringify(accounts.value))
  }

  // Инициализация
  loadFromStorage()

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
    saveToStorage()
    return newAccount.id
  }

  // Удаление записи
  const removeAccount = (id: string) => {
    const index = accounts.value.findIndex(account => account.id === id)
    if (index !== -1) {
      accounts.value.splice(index, 1)
      saveToStorage()
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
    saveToStorage()
  }

  // Получение записи по ID
  const getAccountById = (id: string) => {
    return accounts.value.find(account => account.id === id)
  }

  // Преобразование метки в массив объектов
  const getLabelArray = (labelString: string): AccountLabel[] => {
    if (!labelString.trim()) return []
    return labelString
      .split(';')
      .map(item => item.trim())
      .filter(item => item.length > 0)
      .map(text => ({ text }))
  }

  // Валидация учетной записи
  const validateAccount = (account: Account): boolean => {
    if (!account.login.trim()) return false
    if (account.type === 'local' && !account.password) return false
    if (account.login.length > 100) return false
    if (account.password && account.password.length > 100) return false
    if (account.label.length > 50) return false
    return true
  }

  return {
    accounts: computed(() => accounts.value),
    getAccountById,
    addAccount,
    removeAccount,
    updateAccount,
    getLabelArray,
    validateAccount
  }
})