export default {
  AppLink: {
    home: 'Inicio',
    profile: 'Perfil',
    settings: 'Configuración',
    logout: 'Cerrar sesión'
  },
  AppLanguageSwitch: {
    change_language: 'Cambiar idioma'
  },
  UserCard: {
    uploadPhoto: 'Subir foto',
    age: '{age} años',
    minor: 'Menor de edad',
  },
  AccountsForm: {
    title: 'Gestión de cuentas',
    add_account: 'Agregar cuenta',
    hint: 'Para especificar múltiples etiquetas para un par de inicio de sesión/contraseña, use el separador ;',
    account_label: 'Cuenta',
    delete: 'Eliminar',
    label: 'Etiqueta',
    label_hint: 'Máximo 50 caracteres',
    type_label: 'Tipo de registro',
    login_label: 'Inicio de sesión *',
    login_hint: 'Campo obligatorio, máximo 100 caracteres',
    password_label: 'Contraseña *',
    password_hint: 'Campo obligatorio, máximo 100 caracteres',
    type_options: {
      ldap: 'LDAP',
      local: 'Local'
    },
    validation: {
      login_required: 'El inicio de sesión es obligatorio',
      login_max_length: 'El inicio de sesión no puede tener más de 100 caracteres',
      label_max_length: 'La etiqueta no puede tener más de 50 caracteres',
      password_required: 'La contraseña es obligatoria para la cuenta local',
      password_max_length: 'La contraseña no puede tener más de 100 caracteres'
    },
    labels_preview: 'Etiquetas (convertidas a array):',
    empty_state: {
      title: 'Sin cuentas',
      message: 'Haga clic en "Agregar cuenta" para crear el primer registro'
    },
    warning: 'Advertencia',
    // Nuevos campos para diálogo y notificaciones
    delete_dialog: {
      title: 'Eliminar cuenta',
      message: '¿Está seguro de que desea eliminar esta cuenta?',
      cancel: 'Cancelar',
      confirm: 'Eliminar'
    },
    notifications: {
      delete_success: 'Cuenta eliminada exitosamente',
      delete_error: 'Error al eliminar la cuenta'
    },
    actions: 'Acciones',
    label_placeholder: 'Introducir etiqueta...',
    login_placeholder: 'Introducir inicio de sesión...',
    password_placeholder: 'Introducir contraseña...',
    ldap_password_hint: 'No requerido para LDAP',
  }
} as const