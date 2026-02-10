export default {
  AppLink: {
    home: 'Главная',
    profile: 'Профиль',
    settings: 'Настройки',
    logout: 'Выйти'
  },
  AppLanguageSwitch: {
    change_language: 'Изменить язык'
  },
  UserCard: {
    uploadPhoto: 'Загрузить фото',
    age: '{age} лет',
    minor: 'Несовершеннолетний',
  },
  UserForm: {
    firstName: 'Имя',
    lastName: 'Фамилия',
    age: 'Возраст',
    email: 'Email',
    ageHint: 'Введите возраст от 0 до 120 лет',
    ageMaxValidation: 'Возраст не должен превышать 120 лет',
    photo: 'Фотография',
    photoHint: 'JPG, PNG или GIF до 5MB',
    photoPreview: 'Предпросмотр',
    uploadPhoto: 'Загрузите фото',
    adult: 'Взрослый',
    minor: 'Несовершеннолетний'
  },
  AccountsForm: {
    title: 'Управление учетными записями',
    add_account: 'Добавить учетную запись',
    hint: 'Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;',
    account_label: 'Учетная запись',
    delete: 'Удалить',
    label: 'Метка',
    label_hint: 'Максимум 50 символов',
    type_label: 'Тип записи',
    login_label: 'Логин *',
    login_hint: 'Обязательное поле, максимум 100 символов',
    password_label: 'Пароль *',
    password_hint: 'Обязательное поле, максимум 100 символов',
    type_options: {
      ldap: 'LDAP',
      local: 'Локальная'
    },
    validation: {
      login_required: 'Логин обязателен для заполнения',
      login_max_length: 'Логин не может быть длиннее 100 символов',
      label_max_length: 'Метка не может быть длиннее 50 символов',
      password_required: 'Пароль обязателен для локальной учетной записи',
      password_max_length: 'Пароль не может быть длиннее 100 символов'
    },
    labels_preview: 'Метки (преобразованы в массив):',
    empty_state: {
      title: 'Нет учетных записей',
      message: 'Нажмите "Добавить учетную запись", чтобы создать первую запись'
    },
    warning: 'Предупреждение',
    // Новые поля для диалога и уведомлений
    delete_dialog: {
      title: 'Удаление учетной записи',
      message: 'Вы уверены, что хотите удалить эту учетную запись?',
      cancel: 'Отмена',
      confirm: 'Удалить'
    },
    notifications: {
      delete_success: 'Учетная запись успешно удалена',
      delete_error: 'Ошибка при удалении учетной записи'
    },
    actions: 'Действия',
    label_placeholder: 'Введите метку...',
    login_placeholder: 'Введите логин...',
    password_placeholder: 'Введите пароль...',
    ldap_password_hint: 'Для LDAP не требуется'
  }
} as const