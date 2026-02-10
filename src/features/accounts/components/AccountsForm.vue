<template>
    <div class="accounts-form">
        <div class="form-header">
            <h2 class="text-h5 q-mb-md">{{ t('components.AccountsForm.title') }}</h2>
            <q-btn color="primary" icon="add" :label="t('components.AccountsForm.add_account')" @click="addAccount" />
        </div>

        <div class="label-hint q-mb-lg">
            <q-icon name="info" color="info" size="sm" />
            <span class="q-ml-sm text-caption">
                {{ t('components.AccountsForm.hint') }}
            </span>
        </div>

        <!-- Заголовки столбцов для десктопа -->
        <div class="desktop-header row q-mb-sm text-caption text-grey-7 q-px-md">
            <div class="col-3">{{ t('components.AccountsForm.label') }}</div>
            <div class="col-2">{{ t('components.AccountsForm.type_label') }}</div>
            <div :class="getLoginColumnClass()">{{ t('components.AccountsForm.login_label') }}</div>
            <div class="col-3" v-if="hasLocalAccount">{{ t('components.AccountsForm.password_label') }}</div>
            <div class="col-1 text-center">{{ t('components.AccountsForm.actions') }}</div>
        </div>

        <div class="accounts-list">
            <div v-for="account in accountData" :key="account.id" class="account-item q-mb-sm q-pa-md"
                :class="{ 'invalid-account': !account.isValid }">
                <div class="row items-center q-col-gutter-md">
                    <div class="col-12" v-if="$q.screen.lt.md">
                        <div class="mobile-delete-btn flex justify-end q-mb-sm">
                            <q-btn flat round color="negative" icon="delete" size="md"
                                :title="t('components.AccountsForm.delete')" @click="showDeleteDialog(account.id)" />
                        </div>
                    </div>
                    <!-- Метка (TextArea с авторастягиванием) -->
                    <div class="col-12 col-md-3">
                        <q-input :model-value="account.label"
                            @update:model-value="(value) => updateField(account.id, 'label', value)"
                            :placeholder="t('components.AccountsForm.label_placeholder')"
                            :hint="t('components.AccountsForm.label_hint')" :maxlength="50" outlined dense
                            type="textarea" autogrow :error="hasError(account.id, 'label')"
                            @blur="validateAccount(account.id)" rows="1">
                            <template v-slot:append>
                                <q-icon v-if="account.label.length > 45" name="warning" color="warning" size="xs" />
                            </template>
                        </q-input>
                    </div>

                    <!-- Тип записи -->
                    <div class="col-12 col-md-2">
                        <q-select :model-value="account.type" @update:model-value="handleTypeChange(account.id, $event)"
                            :options="typeOptions" outlined dense emit-value map-options
                            :error="hasError(account.id, 'type')" />
                    </div>

                    <!-- Логин (растягивается для LDAP) -->
                    <div :class="getLoginColumnClass(account.type)">
                        <q-input :model-value="account.login"
                            @update:model-value="(value) => updateField(account.id, 'login', value)"
                            :placeholder="t('components.AccountsForm.login_placeholder')"
                            :hint="t('components.AccountsForm.login_hint')" :maxlength="100" outlined dense
                            :error="hasError(account.id, 'login')" @blur="validateAccount(account.id)" />
                    </div>

                    <!-- Пароль (только для локальных) -->
                    <div v-if="account.type === 'local'" class="col-12 col-md-3">
                        <q-input :model-value="account.password || ''"
                            @update:model-value="(value) => updateField(account.id, 'password', value)"
                            :placeholder="t('components.AccountsForm.password_placeholder')"
                            :hint="t('components.AccountsForm.password_hint')" :maxlength="100"
                            :type="account.showPassword ? 'text' : 'password'" outlined dense
                            :error="hasError(account.id, 'password')" @blur="validateAccount(account.id)">
                            <template v-slot:append>
                                <q-icon :name="account.showPassword ? 'visibility' : 'visibility_off'"
                                    class="cursor-pointer" @click="togglePasswordVisibility(account.id)" size="xs" />
                            </template>
                        </q-input>
                    </div>

                    <!-- Пустая колонка для LDAP (не показываем) -->

                    <!-- Кнопка удаления -->
                    <div class="col-12 col-md-1 text-center" v-if="!$q.screen.lt.md">
                        <q-btn flat round color="negative" icon="delete" size="md"
                            :title="t('components.AccountsForm.delete')" @click="showDeleteDialog(account.id)" />
                    </div>
                </div>

                <!-- Отображение ошибок валидации -->
                <div v-if="getAccountErrors(account.id).length > 0" class="validation-errors q-mt-sm">
                    <div v-for="error in getAccountErrors(account.id)" :key="error.field"
                        class="error-message text-negative text-caption">
                        <q-icon name="error" size="xs" />
                        <span class="q-ml-xs">{{ t(error.message) }}</span>
                    </div>
                </div>

                <!-- Предпросмотр меток (чипы) -->
                <div v-if="account.labelArray.length > 0" class="label-preview q-mt-sm">
                    <div class="text-caption text-grey-6">{{ t('components.AccountsForm.labels_preview') }}</div>
                    <div class="label-chips q-mt-xs">
                        <q-chip v-for="(labelItem, idx) in account.labelArray" :key="idx" size="sm" color="primary"
                            text-color="white" dense>
                            {{ labelItem.text }}
                        </q-chip>
                    </div>
                </div>
            </div>
        </div>

        <!-- Пустое состояние -->
        <div v-if="accounts.length === 0" class="empty-state text-center q-pa-xl">
            <q-icon name="person_outline" size="xl" color="grey" />
            <div class="text-h6 q-mt-md text-grey">{{ t('components.AccountsForm.empty_state.title') }}</div>
            <div class="text-caption q-mt-sm text-grey">
                {{ t('components.AccountsForm.empty_state.message') }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useAccountsStore, type Account } from '../stores/accounts-store'
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'

const { t } = useI18n()
const $q = useQuasar()
const accountsStore = useAccountsStore()
const accounts = computed(() => accountsStore.accounts)

interface AccountData extends Account {
    labelArray: Array<{ text: string }>
    isValid: boolean
    showPassword: boolean
}

const accountData = ref<AccountData[]>([])
const validationErrors = ref<Record<string, Array<{ field: string; message: string }>>>({})

const typeOptions = computed(() => [
    { label: t('components.AccountsForm.type_options.ldap'), value: 'ldap' },
    { label: t('components.AccountsForm.type_options.local'), value: 'local' }
])


const hasLocalAccount = computed(() => {
    return accountData.value.some(account => account.type === 'local')
})
const getLoginColumnClass = (accountType?: 'ldap' | 'local') => {
    if (accountType === 'ldap') {
        return 'col-12 col-md-6'
    } else if (accountType === 'local') {
        return 'col-12 col-md-3'
    }
    return hasLocalAccount.value ? 'col-12 col-md-3' : 'col-12 col-md-6'
}

const initializeAccountData = () => {
    accountData.value = accounts.value.map(account => ({
        ...account,
        labelArray: accountsStore.getLabelArray(account.label),
        isValid: accountsStore.validateAccount(account),
        showPassword: false
    }))

    accounts.value.forEach(account => {
        validateAccount(account.id)
    })
}

const handleTypeChange = (accountId: string, value: 'ldap' | 'local') => {
    const accountIndex = accountData.value.findIndex(acc => acc.id === accountId)
    if (accountIndex === -1) return

    const account = accountData.value[accountIndex]
    if (!account) return

    // Обновляем локальные данные
    const updatedAccount = {
        ...account,
        type: value,
        // При смене на LDAP сбрасываем пароль
        ...(value === 'ldap' ? { password: null, showPassword: false } : {})
    }

    accountData.value[accountIndex] = updatedAccount
    validateAccount(accountId)

    // Сохраняем в хранилище
    accountsStore.updateAccount(accountId, {
        type: value,
        ...(value === 'ldap' ? { password: null } : {})
    })
}

const updateField = (accountId: string, field: keyof Account, value: any) => {
    const accountIndex = accountData.value.findIndex(acc => acc.id === accountId)
    if (accountIndex === -1) return

    const account = accountData.value[accountIndex]
    if (!account) return

    const updatedAccount = {
        ...account,
        [field]: value
    }

    if (field === 'label') {
        updatedAccount.labelArray = accountsStore.getLabelArray(value)
    }

    accountData.value[accountIndex] = updatedAccount
}

const validateAccount = (accountId: string) => {
    const accountIndex = accountData.value.findIndex(acc => acc.id === accountId)
    if (accountIndex === -1) return

    const account = accountData.value[accountIndex]
    if (!account) return

    const errors: Array<{ field: string; message: string }> = []

    if (!account.login.trim()) {
        errors.push({ field: 'login', message: 'components.AccountsForm.validation.login_required' })
    } else if (account.login.length > 100) {
        errors.push({ field: 'login', message: 'components.AccountsForm.validation.login_max_length' })
    }

    if (account.label.length > 50) {
        errors.push({ field: 'label', message: 'components.AccountsForm.validation.label_max_length' })
    }

    if (account.type === 'local') {
        if (!account.password) {
            errors.push({ field: 'password', message: 'components.AccountsForm.validation.password_required' })
        } else if (account.password.length > 100) {
            errors.push({ field: 'password', message: 'components.AccountsForm.validation.password_max_length' })
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

const togglePasswordVisibility = (accountId: string) => {
    const accountIndex = accountData.value.findIndex(acc => acc.id === accountId)
    if (accountIndex === -1) return

    const account = accountData.value[accountIndex]
    if (!account || account.type !== 'local') return

    accountData.value[accountIndex] = {
        ...account,
        showPassword: !account.showPassword
    }
}

const hasError = (accountId: string, field: string): boolean => {
    const accountErrors = validationErrors.value[accountId]
    return accountErrors?.some(error => error.field === field) || false
}

const addAccount = () => {
    const newId = accountsStore.addAccount()
    initializeAccountData()

    $q.notify({
        type: 'positive',
        message: t('common.success.success_create'),
        position: 'top-right',
        timeout: 3000
    })
}

const removeAccount = (id: string) => {
    try {
        accountsStore.removeAccount(id)
        const accountIndex = accountData.value.findIndex(acc => acc.id === id)
        if (accountIndex !== -1) {
            accountData.value.splice(accountIndex, 1)
        }

        const newValidationErrors = { ...validationErrors.value }
        delete newValidationErrors[id]
        validationErrors.value = newValidationErrors

        $q.notify({
            type: 'positive',
            message: t('components.AccountsForm.notifications.delete_success'),
            position: 'top-right',
            timeout: 3000,
            icon: 'check_circle'
        })
    } catch (error) {
        $q.notify({
            type: 'negative',
            message: t('components.AccountsForm.notifications.delete_error'),
            position: 'top-right',
            timeout: 3000,
            icon: 'error'
        })
        console.error('Error deleting account:', error)
    }
}

const showDeleteDialog = (accountId: string) => {
    $q.dialog({
        title: t('components.AccountsForm.delete_dialog.title'),
        message: t('components.AccountsForm.delete_dialog.message'),
        cancel: {
            label: t('components.AccountsForm.delete_dialog.cancel'),
            color: 'grey',
            flat: true
        },
        ok: {
            label: t('components.AccountsForm.delete_dialog.confirm'),
            color: 'negative',
            flat: true
        },
        persistent: true
    }).onOk(() => {
        removeAccount(accountId)
    })
}

const getAccountErrors = (accountId: string) => {
    return validationErrors.value[accountId] || []
}

watch(accounts, () => {
    initializeAccountData()
}, { immediate: true })
</script>

<style scoped lang="scss">
.accounts-form {
    max-width: 1200px;
    margin: 0 auto;
}

.form-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 24px;
}

.label-hint {
    background-color: rgba(152, 212, 255, 0.082);
    padding: 12px 16px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    margin-bottom: 24px;
}

.desktop-header {
    display: none;

    @media (min-width: $breakpoint-md-min) {
        display: flex;
        border-bottom: 1px solid var(--q-pageUtilityContrastLow);
        padding-bottom: 8px;
        margin-bottom: 16px;
    }
}

.account-item {
    border: 1px solid #e0e0e09c;
    border-radius: 8px;
    transition: all 0.3s ease;

    &.invalid-account {
        border-color: var(--q-negative);
        background-color: rgba(244, 67, 54, 0.03);
    }

    &:hover {
        border-color: var(--q-primary);
        box-shadow: 0 2px 8px rgba(25, 118, 210, 0.1);
    }

    @media (min-width: $breakpoint-md-min) {
        .row>div {
            margin-bottom: 0;
        }
    }
}

.validation-errors {
    background-color: rgba(244, 67, 54, 0.05);
    padding: 8px 12px;
    border-radius: 4px;
    border-left: 3px solid var(--q-negative);
}

.error-message {
    display: flex;
    align-items: center;
    margin-bottom: 4px;

    &:last-child {
        margin-bottom: 0;
    }
}

.label-preview {
    border-top: 1px solid var(--q-pageUtilityContrastLow);
    padding-top: 12px;
    margin-top: 12px;
}

.label-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin-top: 4px;
}

.empty-state {
    border: 2px dashed var(--q-pageUtilityContrastLow);
    border-radius: 8px;
    margin-top: 32px;
}

// Адаптивность
@media (max-width: $breakpoint-sm-max) {
    .form-header {
        flex-direction: column;
        align-items: stretch;
        text-align: center;
    }

    .account-item {
        .row>div {
            margin-bottom: 12px;

            &:last-child {
                margin-bottom: 0;
            }
        }
    }
}

@media (min-width: $breakpoint-md-min) {
    .accounts-form {
        padding: 0 16px;
    }

    .account-item {
        padding: 16px;
    }
}
</style>