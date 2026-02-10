export default {
  UsersPage: {
    title: 'Users Management',
    subtitle: 'Showing {filtered} of {count} users',
    addUser: 'Add User',
    filterAdults: 'Show only adults (18+)',
    sortBy: 'Sort by',
    sortByName: 'Name',
    sortByAge: 'Age',
    sortByEmail: 'Email',
    sortAscending: 'Sort ascending',
    sortDescending: 'Sort descending',
    toggleSortDirection: 'Toggle sort direction',
    noUsers: 'No users found',
    noUsersDescription: 'Try changing your filters or add a new user',
    addFirstUser: 'Add First User',
    firstName: 'First Name',
    lastName: 'Last Name',
    age: 'Age',
    email: 'Email',
    filtersAndSort: 'Filters',
  },
  AboutThisProjectPage: {
    title: 'About Test Task Completion',
    subtitle: 'Overview of project architecture and technical solutions',
    tech: {
      title: '🛠 Technology Stack',
      subtitle: 'Modern stack for SPA application',
      quasar: {
        name: 'Quasar Framework',
        desc: 'Vue.js framework with Material Design'
      },
      vue: {
        name: 'Vue 3',
        desc: 'Composition API, TypeScript'
      },
      pinia: {
        name: 'Pinia',
        desc: 'State management for Vue 3'
      },
      router: {
        name: 'Vue Router',
        desc: 'Client-side routing'
      },
      typescript: {
        name: 'TypeScript',
        desc: 'Static typing'
      },
      i18n: {
        name: 'Vue I18n',
        desc: 'Multi-language support'
      }
    },
    architecture: {
      title: '🏗 Project Architecture',
      subtitle: 'Feature-based structure with modular approach',
      feature: {
        title: 'Feature-Based Structure',
        subtitle: 'Modular code organization',
        desc: 'The project is organized by functional modules (features) for better scalability and code reusability.',
        tags: {
          users: 'users',
          auth: 'auth',
          scalable: 'scalable'
        }
      },
      shared: {
        title: 'Shared Layer',
        subtitle: 'Common components and utilities',
        desc: 'Centralized storage of common components, types, constants and stores for consistency.',
        tags: {
          components: 'components',
          types: 'types',
          stores: 'stores'
        }
      },
      i18n: {
        title: 'Internationalization',
        subtitle: 'Support for 3 languages',
        desc: 'Full support for English, Russian and Spanish with Quasar plugin system.',
        tags: {
          i18n: 'i18n',
          en: 'en-US',
          ru: 'ru-RU',
          es: 'es-ES'
        }
      },
      theme: {
        title: 'Theme System',
        subtitle: 'Light and dark themes',
        desc: 'Flexible theme system with custom colors for both display modes.',
        tags: {
          light: 'light',
          dark: 'dark'
        }
      }
    },
    stats: {
      title: '📊 Project Statistics',
      subtitle: 'Numbers and facts',
      totalFiles: 'Total files',
      vueComponents: 'Vue components',
      typescriptFiles: 'TypeScript files',
      languages: 'Supported languages',
      dependencies: 'Dependencies'
    },
    features: {
      title: '✨ Features',
      subtitle: 'Key technical solutions',
      responsive: {
        title: 'Responsive Design',
        desc: 'Full support for mobile and desktop devices'
      },
      typescript: {
        title: 'TypeScript First',
        desc: 'Strict typing for code reliability'
      },
      quasar: {
        title: 'Quasar Components',
        desc: 'Using ready-made Material Design components'
      }
    },
    additional: {
      title: '📝 Additional Information',
      buildDeploy: 'Build and deploy:',
      dev: 'Development: quasar dev',
      build: 'Build: quasar build',
      deploy: 'Deploy on Vercel platform'
    },
    implementedFeatures: {
      formManagement: {
        title: 'Account Management Form',
        desc: 'Fully functional form with validation',
        details: [
          'Add/remove accounts',
          'Validation of required fields',
          'Converting labels to array of objects',
          'Saving to localStorage'
        ]
      },
      accountTypes: {
        title: 'Two Types of Accounts',
        desc: 'LDAP and local with different behavior',
        details: [
          'LDAP: password is hidden and saved as null',
          'Local: password is required',
          'Dynamic field display'
        ]
      },
      fieldValidation: {
        title: 'Field Validation',
        desc: 'Checking for required fields and maximum length',
        details: [
          'Label: up to 50 characters, optional',
          'Login: up to 100 characters, required',
          'Password: up to 100 characters, required for local'
        ]
      },
      statePersistence: {
        title: 'State Persistence',
        desc: 'Saves data between sessions',
        details: [
          'Using Pinia for state management',
          'Saving to localStorage',
          'Automatic loading on initialization'
        ]
      },
      responsiveDesign: {
        title: 'Responsive Design',
        desc: 'Correct display on all devices',
        details: [
          'Mobile-first approach',
          'Adaptive Quasar grid',
          'Convenient UX on touch devices'
        ]
      }
    }
  },
  ErrorNotFound: {
    title: 'Oops! Nothing here...',
    message: 'The page you are looking for does not exist',
    goHome: 'Go Home'
  }
} as const