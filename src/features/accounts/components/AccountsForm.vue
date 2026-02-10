<template>
    <div class="accounts-form">
        <div class="form-header">
            <h2 class="text-h5 q-mb-md">Управление учетными записями</h2>
            <q-btn color="primary" icon="add" label="Добавить учетную запись" @click="addAccount" />
        </div>

        <div class="label-hint q-mb-lg">
            <q-icon name="info" color="info" size="sm" />
            <span class="q-ml-sm text-caption">
                Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
            </span>
        </div>

        <div class="accounts-list">
            <div v-for="account in accountData" :key="account.id" class="account-item q-mb-lg q-pa-md"
                :class="{ 'invalid-account': !account.isValid }">
                <div class="account-header row justify-between items-center q-mb-md">
                    <div class="text-subtitle1">Учетная запись</div>
                    <q-btn flat round color="negative" icon="delete" size="sm" @click="removeAccount(account.id)" />
                </div>

                <div class="account-fields">
                    <div class="row q-col-gutter-md">
                        <!-- Метка -->
                        <div class="col-12">
                            <q-input :model-value="account.label"
                                @update:model-value="(value) => updateField(account.id, 'label', value)" label="Метка"
                                hint="Максимум 50 символов" :maxlength="50" outlined
                                :error="hasError(account.id, 'label')" @blur="validateAccount(account.id)">
                                <template v-slot:append>
                                    <q-icon v-if="account.label.length > 45" name="warning" color="warning" />
                                </template>
                            </q-input>
                        </div>

                        <!-- Тип записи -->
                        <div class="col-12 col-md-6">
                            <q-select :model-value="account.type"
                                @update:model-value="handleTypeChange(account.id, $event)" :options="typeOptions"
                                label="Тип записи" outlined />
                        </div>

                        <!-- Логин -->
                        <div class="col-12 col-md-6">
                            <q-input :model-value="account.login"
                                @update:model-value="(value) => updateField(account.id, 'login', value)" label="Логин *"
                                hint="Обязательное поле, максимум 100 символов" :maxlength="100" outlined
                                :error="hasError(account.id, 'login')" @blur="validateAccount(account.id)" />
                        </div>

                        <!-- Пароль (только для локальных) -->
                        <div v-if="account.type === 'local'" class="col-12">
                            <q-input :model-value="account.password || ''"
                                @update:model-value="(value) => updateField(account.id, 'password', value)"
                                label="Пароль *" hint="Обязательное поле, максимум 100 символов" :maxlength="100"
                                type="password" outlined :error="hasError(account.id, 'password')"
                                @blur="validateAccount(account.id)" />
                        </div>
                    </div>
                </div>

                <!-- Отображение ошибок -->
                <div v-if="getAccountErrors(account.id).length > 0" class="validation-errors q-mt-sm">
                    <div v-for="error in getAccountErrors(account.id)" :key="error.field"
                        class="error-message text-negative text-caption">
                        {{ error.message }}
                    </div>
                </div>

                <!-- Преобразованная метка -->
                <div v-if="account.labelArray.length > 0" class="label-preview q-mt-sm">
                    <div class="text-caption text-grey">Метки (преобразованы в массив):</div>
                    <div class="label-chips">
                        <q-chip v-for="(labelItem, idx) in account.labelArray" :key="idx" size="sm" color="primary"
                            text-color="white">
                            {{ labelItem.text }}
                        </q-chip>
                    </div>
                </div>
            </div>
        </div>

        <!-- Пустое состояние -->
        <div v-if="accounts.length === 0" class="empty-state text-center q-pa-xl">
            <q-icon name="person_outline" size="xl" color="grey" />
            <div class="text-h6 q-mt-md text-grey">Нет учетных записей</div>
            <div class="text-caption q-mt-sm text-grey">
                Нажмите "Добавить учетную запись", чтобы создать первую запись
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useAccountsStore, type Account } from '../stores/accounts-store'

const accountsStore = useAccountsStore()
const accounts = computed(() => accountsStore.accounts)

// Локальные копии с расширенными данными
interface AccountData extends Account {
    labelArray: Array<{ text: string }>
    isValid: boolean
}

const accountData = ref<AccountData[]>([])
const validationErrors = ref<Record<string, Array<{ field: string; message: string }>>>({})

const typeOptions = [
    { label: 'LDAP', value: 'ldap' },
    { label: 'Локальная', value: 'local' }
]

// Инициализация данных
const initializeAccountData = () => {
    accountData.value = accounts.value.map(account => ({
        ...account,
        labelArray: accountsStore.getLabelArray(account.label),
        isValid: accountsStore.validateAccount(account)
    }))

    // Инициализация ошибок валидации
    accounts.value.forEach(account => {
        validateAccount(account.id)
    })
}

// Обработчик изменения типа
const handleTypeChange = (accountId: string, value: 'ldap' | 'local') => {
    updateField(accountId, 'type', value)
    validateAccount(accountId)
}

// Обновление поля
const updateField = (accountId: string, field: keyof Account, value: any) => {
    const accountIndex = accountData.value.findIndex(acc => acc.id === accountId)
    if (accountIndex === -1) return

    const account = accountData.value[accountIndex]
    if (!account) return // Добавляем проверку на существование

    // Обновляем локальные данные
    const updatedAccount = {
        ...account,
        [field]: value
    }

    // Пересчитываем labelArray если обновилась метка
    if (field === 'label') {
        updatedAccount.labelArray = accountsStore.getLabelArray(value)
    }

    accountData.value[accountIndex] = updatedAccount
}

// Валидация учетной записи
const validateAccount = (accountId: string) => {
    const accountIndex = accountData.value.findIndex(acc => acc.id === accountId)
    if (accountIndex === -1) return

    const account = accountData.value[accountIndex]
    if (!account) return // Добавляем проверку на существование

    const errors: Array<{ field: string; message: string }> = []

    if (!account.login.trim()) {
        errors.push({ field: 'login', message: 'Логин обязателен для заполнения' })
    } else if (account.login.length > 100) {
        errors.push({ field: 'login', message: 'Логин не может быть длиннее 100 символов' })
    }

    if (account.label.length > 50) {
        errors.push({ field: 'label', message: 'Метка не может быть длиннее 50 символов' })
    }

    if (account.type === 'local') {
        if (!account.password) {
            errors.push({ field: 'password', message: 'Пароль обязателен для локальной учетной записи' })
        } else if (account.password.length > 100) {
            errors.push({ field: 'password', message: 'Пароль не может быть длиннее 100 символов' })
        }
    }

    validationErrors.value[accountId] = errors
    accountData.value[accountIndex] = {
        ...account,
        isValid: errors.length === 0
    }

    // Если валидно, сохраняем в хранилище
    if (errors.length === 0) {
        accountsStore.updateAccount(accountId, {
            label: account.label,
            type: account.type,
            login: account.login,
            password: account.password
        })
    }
}

// Проверка, есть ли ошибки для конкретного поля
const hasError = (accountId: string, field: string): boolean => {
    const accountErrors = validationErrors.value[accountId]
    return accountErrors?.some(error => error.field === field) || false
}

// Добавление новой учетной записи
const addAccount = () => {
    const newId = accountsStore.addAccount()
    // После добавления обновляем данные
    initializeAccountData()
}

// Удаление учетной записи
const removeAccount = (id: string) => {
    accountsStore.removeAccount(id)
    const accountIndex = accountData.value.findIndex(acc => acc.id === id)
    if (accountIndex !== -1) {
        accountData.value.splice(accountIndex, 1)
    }

    const newValidationErrors = { ...validationErrors.value }
    delete newValidationErrors[id]
    validationErrors.value = newValidationErrors
}

const getAccountErrors = (accountId: string) => {
    return validationErrors.value[accountId] || []
}

// Синхронизация при изменении accounts
watch(accounts, () => {
    initializeAccountData()
}, { immediate: true })
</script>

<style scoped lang="scss">
.accounts-form {
    max-width: 800px;
    margin: 0 auto;
}

.form-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
}

.label-hint {
    background-color: #98d4ff73;
    padding: 12px;
    border-radius: 8px;
    display: flex;
    align-items: center;
}

.account-item {
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    transition: all 0.3s ease;

    &.invalid-account {
        border-color: #f44336;
        background-color: rgba(244, 67, 54, 0.05);
    }

    &:hover {
        border-color: #1976d2;
        box-shadow: 0 2px 8px rgba(25, 118, 210, 0.1);
    }
}

.account-header {
    padding-bottom: 12px;
}

.validation-errors {
    background-color: rgba(244, 67, 54, 0.1);
    padding: 8px;
    border-radius: 4px;
}

.error-message {
    margin-bottom: 4px;

    &:last-child {
        margin-bottom: 0;
    }
}

.label-preview {
    border-top: 1px solid #e0e0e0;
    padding-top: 12px;
}

.label-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin-top: 8px;
}

.empty-state {
    border: 2px dashed #e0e0e0;
    border-radius: 8px;
    margin-top: 24px;
}

@media (max-width: 600px) {
    .form-header {
        flex-direction: column;
        align-items: stretch;
    }

    .account-fields .row {
        margin: 0;
    }
}
</style>