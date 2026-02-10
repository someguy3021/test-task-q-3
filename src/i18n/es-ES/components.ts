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
    warning: 'Advertencia'
  }
} as const