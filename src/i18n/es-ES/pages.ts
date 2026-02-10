export default {
  UsersPage: {
    title: 'Gestión de usuarios',
    subtitle: 'Mostrando {filtered} de {count} usuarios',
    addUser: 'Agregar usuario',
    filterAdults: 'Mostrar solo adultos (18+)',
    sortBy: 'Ordenar por',
    sortByName: 'Nombre',
    sortByAge: 'Edad',
    sortByEmail: 'Correo electrónico',
    sortAscending: 'Orden ascendente',
    sortDescending: 'Orden descendente',
    toggleSortDirection: 'Cambiar dirección de ordenación',
    noUsers: 'No se encontraron usuarios',
    noUsersDescription: 'Intente cambiar los filtros o agregue un nuevo usuario',
    addFirstUser: 'Agregar primer usuario',
    firstName: 'Nombre',
    lastName: 'Apellido',
    age: 'Edad',
    email: 'Correo electrónico',
    filtersAndSort: 'Filters',
  },
  AboutThisProjectPage: {
    title: 'Acerca de la finalización de la tarea de prueba',
    subtitle: 'Descripción general de la arquitectura del proyecto y soluciones técnicas',
    tech: {
      title: '🛠 Pila tecnológica',
      subtitle: 'Pila moderna para aplicación SPA',
      quasar: {
        name: 'Quasar Framework',
        desc: 'Framework Vue.js con Material Design'
      },
      vue: {
        name: 'Vue 3',
        desc: 'API de composición, TypeScript'
      },
      pinia: {
        name: 'Pinia',
        desc: 'Gestión de estado para Vue 3'
      },
      router: {
        name: 'Vue Router',
        desc: 'Enrutamiento del lado del cliente'
      },
      typescript: {
        name: 'TypeScript',
        desc: 'Tipado estático'
      },
      i18n: {
        name: 'Vue I18n',
        desc: 'Soporte multilingüe'
      }
    },
    architecture: {
      title: '🏗 Arquitectura del proyecto',
      subtitle: 'Estructura basada en características con enfoque modular',
      feature: {
        title: 'Estructura basada en características',
        subtitle: 'Organización modular del código',
        desc: 'El proyecto está organizado por módulos funcionales (características) para una mejor escalabilidad y reutilización del código.',
        tags: {
          users: 'usuarios',
          auth: 'autenticación',
          scalable: 'escalable'
        }
      },
      shared: {
        title: 'Capa compartida',
        subtitle: 'Componentes y utilidades comunes',
        desc: 'Almacenamiento centralizado de componentes, tipos, constantes y almacenes comunes para garantizar la coherencia.',
        tags: {
          components: 'componentes',
          types: 'tipos',
          stores: 'almacenes'
        }
      },
      i18n: {
        title: 'Internacionalización',
        subtitle: 'Soporte para 3 idiomas',
        desc: 'Soporte completo para inglés, ruso y español con el sistema de complementos de Quasar.',
        tags: {
          i18n: 'i18n',
          en: 'en-US',
          ru: 'ru-RU',
          es: 'es-ES'
        }
      },
      theme: {
        title: 'Sistema de temas',
        subtitle: 'Temas claro y oscuro',
        desc: 'Sistema de temas flexible con colores personalizados para ambos modos de visualización.',
        tags: {
          light: 'claro',
          dark: 'oscuro'
        }
      }
    },
    stats: {
      title: '📊 Estadísticas del proyecto',
      subtitle: 'Números y hechos',
      totalFiles: 'Archivos totales',
      vueComponents: 'Componentes Vue',
      typescriptFiles: 'Archivos TypeScript',
      languages: 'Idiomas soportados',
      dependencies: 'Dependencias'
    },
    features: {
      title: '✨ Características',
      subtitle: 'Soluciones técnicas clave',
      responsive: {
        title: 'Diseño responsivo',
        desc: 'Soporte completo para dispositivos móviles y de escritorio'
      },
      typescript: {
        title: 'TypeScript primero',
        desc: 'Tipado estricto para confiabilidad del código'
      },
      quasar: {
        title: 'Componentes Quasar',
        desc: 'Uso de componentes Material Design listos'
      }
    },
    additional: {
      title: '📝 Información adicional',
      buildDeploy: 'Compilación y despliegue:',
      dev: 'Desarrollo: quasar dev',
      build: 'Compilación: quasar build',
      deploy: 'Despliegue en plataforma Vercel'
    }
  },
  ErrorNotFound: {
    title: '¡Ups! Aquí no hay nada...',
    message: 'La página que buscas no existe',
    goHome: 'Ir al inicio'
  }
} as const