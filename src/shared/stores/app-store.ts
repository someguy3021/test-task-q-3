import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

interface AppState {
  loading: boolean;
  error: string | null;
  sidebarOpen: boolean;
  pageTitle: string;
}

export const useAppStore = defineStore('admin_app', () => {
  const state = ref<AppState>({
    loading: false,
    error: null,
    sidebarOpen: true,
    pageTitle: 'Test Task'
  });

  const pageTitle = computed(() => state.value.pageTitle);

  const setLoading = (loading: boolean) => {
    state.value.loading = loading;
  };

  const setError = (error: string | null) => {
    state.value.error = error;
  };

  const toggleSidebar = () => {
    state.value.sidebarOpen = !state.value.sidebarOpen;
  };

  const setPageTitle = (title: string) => {
    state.value.pageTitle = title;
  };

  return {
    state: computed(() => state.value),
    pageTitle,
    setLoading,
    setError,
    toggleSidebar,
    setPageTitle
  };
});