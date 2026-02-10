<template>
    <!-- Обычная ссылка без вложенных роутов -->
    <q-item v-if="!deepLinks || deepLinks.length === 0" clickable :to="props.link || { name: props.linkByName }" exact
        :dense="props.compact" :class="props.compact ? 'q-pa-none' : ''"
        :active-class="props.isHeader ? 'active-header-link' : undefined"
        :exact-active-class="props.isHeader ? 'active-header-link' : undefined">
        <q-item-section v-if="props.icon" avatar :class="props.compact ? 'q-pa-none flex flex-center' : ''">
            <q-icon :name="props.icon" />
        </q-item-section>

        <q-item-section v-if="!props.compact">
            <q-item-label class="non-selectable">{{ props.title }}</q-item-label>
            <q-item-label class="non-selectable" caption v-if="props.caption">{{ props.caption }}</q-item-label>
        </q-item-section>
    </q-item>

    <!-- Ссылка с выпадающим меню -->
    <q-btn-dropdown v-else-if="deepLinks && deepLinks.length > 0 && !deepLinksShowAsList && !isHeader" flat
        :label="props.compact ? undefined : props.title" :icon="props.icon" class="full-width q-px-md"
        menu-anchor="bottom left" menu-self="top left" :dropdown-icon="props.compact ? undefined : 'arrow_drop_down'"
        :class="{ 'text-secondary': isActive }">
        <q-list>
            <q-item v-for="(deepLink, index) in deepLinks" :key="index" clickable
                :to="deepLink.link || { name: deepLink.linkByName }" exact>
                <q-item-section avatar v-if="deepLink.icon">
                    <q-icon :name="deepLink.icon" />
                </q-item-section>
                <q-item-section>
                    <q-item-label>{{ deepLink.title }}</q-item-label>
                    <q-item-label caption v-if="deepLink.caption">{{ deepLink.caption }}</q-item-label>
                </q-item-section>
            </q-item>
        </q-list>
    </q-btn-dropdown>

    <!-- Ссылка со списком вложенных ссылок (для сайдбара) -->
    <div v-else-if="deepLinks && deepLinks.length > 0 && deepLinksShowAsList && !isHeader">
        <q-item clickable @click="expanded = !expanded" :class="{ 'text-secondary': isActive }">
            <q-item-section v-if="props.icon" avatar>
                <q-icon :name="props.icon" />
            </q-item-section>

            <q-item-section v-if="!props.compact">
                <q-item-label class="non-selectable">{{ props.title }}</q-item-label>
                <q-item-label class="non-selectable" caption v-if="props.caption">{{ props.caption }}</q-item-label>
            </q-item-section>

            <q-item-section side v-if="!props.compact">
                <q-icon :name="expanded ? 'expand_less' : 'expand_more'" />
            </q-item-section>
        </q-item>

        <q-slide-transition>
            <div v-show="expanded">
                <q-item v-for="(deepLink, index) in deepLinks" :key="index" clickable
                    :to="deepLink.link || { name: deepLink.linkByName }" exact class="q-pl-xl">
                    <q-item-section avatar v-if="deepLink.icon">
                        <q-icon :name="deepLink.icon" size="sm" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label class="non-selectable">{{ deepLink.title }}</q-item-label>
                        <q-item-label class="non-selectable" caption v-if="deepLink.caption">{{ deepLink.caption
                            }}</q-item-label>
                    </q-item-section>
                </q-item>
            </div>
        </q-slide-transition>
    </div>

    <!-- Для хедера/футера с вложенными ссылками (упрощенная версия) -->
    <q-btn-dropdown v-else-if="deepLinks && deepLinks.length > 0 && isHeader" flat
        :label="props.compact ? undefined : props.title" :icon="props.icon" class="q-mx-none rounded-borders"
        :class="{ 'active-header-link': isActive, 'compact_dropdown': props.compact }" no-caps
        :dropdown-icon="props.compact ? undefined : 'arrow_drop_down'">
        <q-list>
            <q-item v-for="(deepLink, index) in deepLinks" :key="index" clickable
                :to="deepLink.link || { name: deepLink.linkByName }" exact v-close-popup
                active-class="active-header-link" exact-active-class="active-header-link">
                <q-item-section avatar v-if="deepLink.icon">
                    <q-icon :name="deepLink.icon" />
                </q-item-section>
                <q-item-section>
                    <q-item-label>{{ deepLink.title }}</q-item-label>
                </q-item-section>
            </q-item>
        </q-list>
    </q-btn-dropdown>

    <!-- Запасной вариант для хедера/футера без вложенных ссылок -->
    <q-item v-else-if="isHeader" class="q-mx-none rounded-borders"
        :class="props.compact ? 'compact-link' : 'normal-link'" :to="props.link || { name: props.linkByName }" exact
        active-class="active-header-link" exact-active-class="active-header-link">
        <q-item-section :class="props.compact ? 'compact-section' : 'normal-section'" avatar no-wrap>
            <q-icon :size="props.compact ? 'sm' : 'xs'" :name="props.icon" />
            <q-item-label v-if="!props.compact" class="non-selectable" no-wrap
                style="text-align: center; min-width: 20px">
                {{ props.title }}
            </q-item-label>
        </q-item-section>
    </q-item>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

interface DeepLink {
    title: string;
    caption?: string;
    link?: string;
    linkByName?: string;
    icon?: string;
}

interface Props {
    title: string;
    caption?: string;
    link?: string;
    linkByName?: string;
    icon?: string;
    isHeader?: boolean; // применяет верстку для ссылок хедера
    compact?: boolean; // убирает все надписи, оставляя только иконку
    deepLinks?: DeepLink[]; // вложенные ссылки
    deepLinksShowAsList?: boolean; // если да, то в Drawer будет список. Если нет - дропдаун меню
}

const props = defineProps<Props>();
const route = useRoute();
const expanded = ref(false);

// Функция для проверки активности ссылки
const isLinkActive = (link: { link?: string | undefined, linkByName?: string | undefined }): boolean => {
    if (link.linkByName) {
        return route.name === link.linkByName;
    } else if (link.link) {
        return route.path === link.link;
    }
    return false;
};

// Вычисляемое свойство для определения активного состояния
const isActive = computed(() => {
    // Проверяем основную ссылку
    if (isLinkActive({ link: props.link, linkByName: props.linkByName })) {
        return true;
    }

    // Проверяем вложенные ссылки
    if (props.deepLinks) {
        return props.deepLinks.some(deepLink => isLinkActive(deepLink));
    }

    return false;
});
</script>

<style scoped lang="scss">
// скрытие стрелок для выпадающих ссылок
.compact_dropdown :deep(.q-btn-dropdown__arrow-container) {
    display: none;
}

// Стиль только для активных хедерных ссылок
.active-header-link {
    color: var(--q-primary-contrast) !important;
}
</style>