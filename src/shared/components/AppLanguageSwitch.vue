<template>
  <q-select v-model="currentLocale" :options="localeOptions" :label="$t('components.AppLanguageSwitch.change_language')"
    dense borderless emit-value map-options options-dense style="min-width: 160px">
    <template v-slot:prepend>
      <q-icon name="language" class="q-pr-sm" />
    </template>
  </q-select>
</template>

<script lang="ts">
import { useI18n } from "vue-i18n";
import { onMounted, computed, onBeforeUnmount } from "vue";
import { STORAGE_KEYS } from "src/shared/constants/storage-keys";
import { setLocalStorageItem } from "src/shared/composables/use-local-storage";

export default {
  setup() {
    const { locale } = useI18n({ useScope: "global" });

    // Define available locale options
    const localeOptions = [
      { value: "ru-RU", label: "Русский" },
      { value: "en-US", label: "English" },
      { value: "es-ES", label: "Español" },
    ];

    // Sync currentLocale with global locale using computed property
    const currentLocale = computed({
      get: () => locale.value,
      set: (value) => {
        locale.value = value;
        setLocalStorageItem(STORAGE_KEYS.USER_LOCALE, value);
      }
    });

    // Listen for locale changes in localStorage from other tabs/windows
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === STORAGE_KEYS.USER_LOCALE && event.newValue) {
        // Only update if the change came from another tab/window
        if (event.newValue !== locale.value) {
          locale.value = event.newValue;
        }
      }
    };

    onMounted(() => {
      window.addEventListener('storage', handleStorageChange);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('storage', handleStorageChange);
    });

    return {
      currentLocale,
      localeOptions,
    };
  }
};
</script>