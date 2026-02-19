import { ref, watch } from 'vue';

/**
 * Custom hook for managing localStorage data with error handling
 */
export function useLocalStorage<T>(
    key: string,
    defaultValue: T,
    serialize: (value: T) => string = JSON.stringify,
    deserialize: (value: string) => T = JSON.parse
) {
    const getValueFromLocalStorage = (): T => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? deserialize(item) : defaultValue;
        } catch (error) {
            console.error(`Error reading from localStorage with key "${key}":`, error);
            return defaultValue;
        }
    };

    const storedValue = ref<T>(getValueFromLocalStorage());

    const setValue = (value: T) => {
        try {
            const serializedValue = serialize(value);
            window.localStorage.setItem(key, serializedValue);
            storedValue.value = value;
        } catch (error) {
            console.error(`Error writing to localStorage with key "${key}":`, error);
        }
    };

    // Watch for changes and sync to localStorage
    watch(storedValue, (newValue) => {
        setValue(newValue);
    });

    return {
        value: storedValue,
        setValue
    };
}

/**
 * Direct function to get item from localStorage with error handling
 */
export function getLocalStorageItem<T>(
    key: string,
    deserialize: (value: string) => T = JSON.parse
): T | null {
    try {
        const item = window.localStorage.getItem(key);
        return item ? deserialize(item) : null;
    } catch (error) {
        console.error(`Error reading from localStorage with key "${key}":`, error);
        return null;
    }
}

/**
 * Direct function to set item in localStorage with error handling
 */
export function setLocalStorageItem(
    key: string,
    value: unknown,
    serialize: (value: unknown) => string = JSON.stringify
): void {
    try {
        const serializedValue = serialize(value);
        window.localStorage.setItem(key, serializedValue);
    } catch (error) {
        console.error(`Error writing to localStorage with key "${key}":`, error);
    }
}

/**
 * Direct function to remove item from localStorage with error handling
 */
export function removeLocalStorageItem(key: string): void {
    try {
        window.localStorage.removeItem(key);
    } catch (error) {
        console.error(`Error removing from localStorage with key "${key}":`, error);
    }
}