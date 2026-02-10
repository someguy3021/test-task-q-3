export default {
  AppLink: {
    home: 'Home',
    profile: 'Profile',
    settings: 'Settings',
    logout: 'Logout'
  },
  AppLanguageSwitch: {
    change_language: 'Change language'
  },
  UserCard: {
    uploadPhoto: 'Upload photo',
    age: '{age} years old',
    minor: 'Minor',
  },
  AccountsForm: {
    title: 'Account Management',
    add_account: 'Add Account',
    hint: 'To specify multiple labels for one login/password pair, use separator ;',
    account_label: 'Account',
    delete: 'Delete',
    label: 'Label',
    label_hint: 'Maximum 50 characters',
    type_label: 'Record Type',
    login_label: 'Login *',
    login_hint: 'Required field, maximum 100 characters',
    password_label: 'Password *',
    password_hint: 'Required field, maximum 100 characters',
    type_options: {
      ldap: 'LDAP',
      local: 'Local'
    },
    validation: {
      login_required: 'Login is required',
      login_max_length: 'Login cannot be longer than 100 characters',
      label_max_length: 'Label cannot be longer than 50 characters',
      password_required: 'Password is required for local account',
      password_max_length: 'Password cannot be longer than 100 characters'
    },
    labels_preview: 'Labels (converted to array):',
    empty_state: {
      title: 'No accounts',
      message: 'Click "Add Account" to create first record'
    },
    warning: 'Warning',
    // New fields for dialog and notifications
    delete_dialog: {
      title: 'Delete Account',
      message: 'Are you sure you want to delete this account?',
      cancel: 'Cancel',
      confirm: 'Delete'
    },
    notifications: {
      delete_success: 'Account successfully deleted',
      delete_error: 'Error deleting account'
    },
    actions: 'Actions',
    label_placeholder: 'Enter label...',
    login_placeholder: 'Enter login...',
    password_placeholder: 'Enter password...',
    ldap_password_hint: 'Not required for LDAP',
  }
} as const