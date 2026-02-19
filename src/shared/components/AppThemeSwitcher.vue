<template>
  <q-toggle size="lg" keep-color v-model="themeDarkSwitch" @change="toggleDarkMode" checked-icon="dark_mode"
    :color="$q.dark.isActive ? 'black' : 'dark'" unchecked-icon="wb_sunny" />
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useQuasar } from "quasar";
import { STORAGE_KEYS } from "src/shared/constants/storage-keys";
import { getLocalStorageItem, setLocalStorageItem } from "src/shared/composables/use-local-storage";

defineOptions({
  name: "AppThemeSwitcher",
});
const toggleDarkMode = () => { }; // dummy method to disable warning
const $q = useQuasar();

// Initialize themeDarkSwitch with a default value of true (dark mode)
const themeDarkSwitch = computed({
  get: () => $q.dark.isActive,
  set: (value) => {
    $q.dark.set(value);
    setLocalStorageItem(STORAGE_KEYS.THEME_DARK, value);
  },
});

onMounted(() => {
  // Check localStorage for saved theme preference
  const savedTheme = getLocalStorageItem<boolean>(STORAGE_KEYS.THEME_DARK);
  if (savedTheme !== null) {
    themeDarkSwitch.value = savedTheme;
  } else {
    // If no preference is found, set dark mode as default
    themeDarkSwitch.value = true;
    $q.dark.set(true);
  }
});
</script>