<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-item>
          <AppLanguageSwitch :dark="true" :options-dark="$q.dark.isActive ? true : false" label-color="white"
            v-if="!$q.screen.lt.md" />
        </q-item>
        <AppThemeSwitcher v-if="!$q.screen.lt.md" />
        <q-toolbar-title class="toolbar_length">
          {{ $t('common.appName') }}
        </q-toolbar-title>

        <q-space />

        <!-- Ссылки в хедере для десктопа -->
        <div class="row gt-sm" v-if="showHeaderLinks">
          <AppLink v-for="link in sidebarLinks" :key="link.title" v-bind="link" :isHeader="true" />
        </div>

        <!-- <q-btn-dropdown flat :label="userDisplayName" icon="person" v-if="$q.screen.gt.md" class="q-ml-md">
          <q-list>
            <q-item clickable v-close-popup @click="handleLogout">
              <q-item-section avatar>
                <q-icon name="logout" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ $t('common.logout') }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown> -->
      </q-toolbar>

      <!-- Хлебные крошки с i18n -->
      <div class="q-pt-none q-pb-sm q-pl-md">
        <q-breadcrumbs class="text-white" active-color="white" separator-color="white">
          <q-breadcrumbs-el v-for="(crumb, index) in breadcrumbs" :key="index" :label="$t(crumb.labelKey)"
            :icon="crumb.icon" :to="crumb.to" :disable="crumb.disable" />
        </q-breadcrumbs>
      </div>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" overlay bordered no-swipe-open no-swipe-close behavior="mobile">
      <q-scroll-area class="fit">
        <q-list padding>
          <div class="flex">
            <q-item>
              <AppLanguageSwitch />
            </q-item>
            <AppThemeSwitcher />
          </div>
          <!-- Заголовок и информация о пользователе -->
          <q-item-label header class="h6">
            {{ $t('common.appName') }}
          </q-item-label>

          <!-- <q-btn-dropdown flat no-caps class="full-width q-py-sm">
            <template v-slot:label>

              <q-item-section avatar>
                <q-avatar color="secondary" text-color="white">
                  {{ userDisplayName[0]?.toUpperCase() || 'A' }}
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ userDisplayName }}</q-item-label>
                <q-item-label caption>{{ $t('layouts.main_layout.admin') }}</q-item-label>
              </q-item-section>

            </template>
<q-list>
  <q-item clickable v-close-popup @click="handleLogout">
    <q-item-section avatar>
      <q-icon name="logout" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ $t('common.logout') }}</q-item-label>
    </q-item-section>
  </q-item>
</q-list>
</q-btn-dropdown> -->


          <q-separator class="q-my-md" />

          <!-- Основные ссылки -->
          <q-item-label header>
            {{ $t('layouts.main_layout.main_menu') }}
          </q-item-label>

          <AppLink v-for="link in sidebarLinks" :key="link.title" v-bind="link" />

          <!-- Настройки -->
          <q-separator class="q-my-md" />

          <q-item-label header>
            {{ $t('layouts.main_layout.Settings.title') }}
          </q-item-label>

          <q-item tag="label" v-ripple>
            <q-item-section>
              <q-item-label>{{ $t('layouts.main_layout.Settings.showBottomMenu') }}</q-item-label>
              <q-item-label caption>{{ $t('layouts.main_layout.Settings.showBottomMenuHint') }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-toggle v-model="showBottomMenu" color="primary" />
            </q-item-section>
          </q-item>

          <q-item tag="label" v-ripple>
            <q-item-section>
              <q-item-label>{{ $t('layouts.main_layout.Settings.onlySideMenuLinks') }}</q-item-label>
              <q-item-label caption>{{ $t('layouts.main_layout.Settings.onlySideMenuLinksHint') }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-toggle v-model="onlySideMenuLinks" color="primary" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>

    <!-- Нижнее меню для мобильных устройств -->
    <q-footer v-if="showFooterLinks && $q.screen.lt.md" elevated class="bg-primary text-white">
      <q-toolbar class="flex flex-center no-padding">
        <AppLink v-for="link in sidebarLinks" :key="link.title" v-bind="link" :isHeader="true" :compact="true" />
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
// import { useAuthStore } from 'src/features/auth/stores/auth-store';
import { useAppStore } from 'src/shared/stores/app-store';
import { useRoute } from 'vue-router';
import { computed, ref, watch } from 'vue';
// import { useRouter } from 'vue-router';
import AppLink from 'src/shared/components/AppLink.vue';
import AppLanguageSwitch from "src/shared/components/AppLanguageSwitch.vue";
import AppThemeSwitcher from "src/shared/components/AppThemeSwitcher.vue";
import { useI18n } from 'vue-i18n';
import { STORAGE_KEYS } from 'src/shared/constants/storage-keys';

interface Breadcrumb {
  labelKey: string;
  icon: string;
  to: { name: string } | null;
  disable: boolean;
}

interface NavLink {
  title: string;
  caption?: string;
  link?: string;
  linkByName?: string;
  icon?: string;
  deepLinks?: Array<{
    title: string;
    caption?: string;
    link?: string;
    linkByName?: string;
    icon?: string;
  }>;
  deepLinksShowAsList?: boolean;
}

// const authStore = useAuthStore();
const appStore = useAppStore();
const route = useRoute();
// const router = useRouter();
const { t } = useI18n();

const leftDrawerOpen = ref(false);

// Получение начальных значений из localStorage
const initialShowBottomMenu = () => {
  const saved = localStorage.getItem(STORAGE_KEYS.SHOW_BOTTOM_MENU);
  return saved !== null ? JSON.parse(saved) : true;
};

const initialOnlySideMenuLinks = () => {
  const saved = localStorage.getItem(STORAGE_KEYS.ONLY_SIDE_MENU_LINKS);
  return saved !== null ? JSON.parse(saved) : false;
};

// Реактивные переменные с сохранением в localStorage
const showBottomMenu = ref(initialShowBottomMenu());
const onlySideMenuLinks = ref(initialOnlySideMenuLinks());

// Watchers для сохранения изменений в localStorage
watch(showBottomMenu, (newValue) => {
  localStorage.setItem(STORAGE_KEYS.SHOW_BOTTOM_MENU, JSON.stringify(newValue));
});

watch(onlySideMenuLinks, (newValue) => {
  localStorage.setItem(STORAGE_KEYS.ONLY_SIDE_MENU_LINKS, JSON.stringify(newValue));
});

// const userDisplayName = computed(() => authStore.getUser?.name || 'Admin');

// Маппинг имен маршрутов на ключи переводов в pages
const routeToTranslationKey: Record<string, string> = {
  'mainpage': 'layouts.main_layout.Dashboard',
  'dashboard': 'layouts.main_layout.Dashboard',
  'competitions': 'layouts.main_layout.Competitions',
  'competition-detail': 'layouts.main_layout.CompetitionDetail',
  'pupils': 'layouts.main_layout.Pupils',
  'teachers': 'layouts.main_layout.Teachers',
  'tovars': 'layouts.main_layout.Tovars',
  'users': 'layouts.main_layout.Users',
  'portfolio': 'layouts.main_layout.Portfolio',
  'inbox': 'layouts.main_layout.Inbox',
  'login': 'layouts.main_layout.LoginPage',
  'orders': 'layouts.main_layout.OrdersPage',
  'error-not-found': 'layouts.main_layout.ErrorNotFound',
  'testtask': 'layouts.main_layout.TestForm'
};

// Динамические breadcrumbs с i18n
const breadcrumbs = computed((): Breadcrumb[] => {
  const crumbs: Breadcrumb[] = [];

  // Добавляем главную страницу
  crumbs.push({
    labelKey: 'layouts.main_layout.Home',
    icon: 'home',
    to: { name: 'orders' },
    disable: false
  });

  // Получаем все matched routes
  const matchedRoutes = route.matched;

  // Обрабатываем каждый matched route
  matchedRoutes.forEach(matchedRoute => {
    if (matchedRoute.name && matchedRoute.name !== 'orders') {
      const routeName = matchedRoute.name as string;

      // Определяем, является ли этот маршрут последним
      const isLast = matchedRoute === matchedRoutes[matchedRoutes.length - 1];

      // Получаем ключ перевода для имени маршрута
      const translationKey = routeToTranslationKey[routeName] || routeName;

      crumbs.push({
        labelKey: translationKey,
        icon: getRouteIcon(routeName),
        to: isLast ? null : { name: routeName },
        disable: isLast
      });
    }
  });

  return crumbs;
});

// Функция для получения иконки по имени маршрута
const getRouteIcon = (routeName: string): string => {
  const icons: Record<string, string> = {
    'dashboard': 'dashboard',
    'competitions': 'emoji_events',
    'competition-detail': 'info',
    'pupils': 'school',
    'teachers': 'groups',
    'tovars': 'inventory_2',
    'users': 'people',
    'portfolio': 'folder',
    'inbox': 'archive',
    'login': 'login',
    'orders': 'shopping_cart',
    'error-not-found': 'error'
  };
  return icons[routeName] || 'label';
};

const sidebarLinks = computed((): NavLink[] => [
  {
    title: t('layouts.main_layout.AboutProject'),
    icon: 'info',
    link: '/'
  },
  {
    title: t('layouts.main_layout.TestForm'),
    icon: 'assignment',
    linkByName: 'testtask'
  }
]);

// Вычисляемые свойства для управления отображением
const showHeaderLinks = computed(() => !onlySideMenuLinks.value);
const showFooterLinks = computed(() => showBottomMenu.value && !onlySideMenuLinks.value);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

// const handleLogout = async () => {
//   await authStore.logout();
//   void router.push({ name: 'login' });
// };

// Динамическое обновление заголовка страницы
watch(
  () => route.meta.title,
  (newTitle) => {
    const title = typeof newTitle === 'string' ? newTitle : '';
    appStore.setPageTitle(title);
  },
  { immediate: true }
);
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Стили для хлебных крошек */
.q-breadcrumbs {
  font-size: 14px;
}

.q-breadcrumbs__el {
  opacity: 0.8;
}

.q-breadcrumbs__el--active {
  opacity: 1;
  font-weight: 500;
}

/* Стили для нижнего меню */
.q-footer .q-toolbar {
  min-height: 60px;
}

.toolbar_length {
  @media (max-width: $breakpoint-lg) {
    min-width: 280px;
  }
}
</style>