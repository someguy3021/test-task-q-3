<template>
    <q-page class="about-page q-pa-lg">
        <div class="container">
            <!-- Заголовок -->
            <div class="row q-mb-xl">
                <div class="col-12">
                    <h1 class="text-h3 text-weight-bold q-mb-md">
                        {{ $t('pages.AboutThisProjectPage.title') }}
                    </h1>
                    <div class="text-subtitle1">
                        {{ $t('pages.AboutThisProjectPage.subtitle') }}
                    </div>
                </div>
            </div>
            <!-- Реализованные функции -->
            <q-card class="q-mb-xl" flat bordered>
                <q-card-section>
                    <div class="text-h4 q-mb-md">
                        {{ t('pages.AboutThisProjectPage.testtaskcompletion') }}
                    </div>

                    <q-list bordered separator>
                        <q-item v-for="feature in implementedFeatures" :key="feature.title">
                            <q-item-section avatar>
                                <q-icon name="check_circle" color="positive" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label class="text-weight-medium">{{ feature.title }}</q-item-label>
                                <q-item-label caption>{{ feature.desc }}</q-item-label>
                                <div v-if="feature.details" class="q-mt-xs text-caption">
                                    <div v-for="detail in feature.details" :key="detail" class="q-ml-lg">
                                        • {{ detail }}
                                    </div>
                                </div>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-card-section>
            </q-card>

            <!-- Основной контент -->
            <div class="row q-col-gutter-lg">
                <!-- Левая колонка - Технологии -->
                <div class="col-12 col-md-8">
                    <!-- Технологический стек -->
                    <q-card class="tech-card q-mb-lg" flat bordered>
                        <q-card-section class="bg-primary text-white">
                            <div class="text-h5 q-mb-sm">{{ $t('pages.AboutThisProjectPage.tech.title') }}</div>
                            <div class="text-caption opacity-70">
                                {{ $t('pages.AboutThisProjectPage.tech.subtitle') }}
                            </div>
                        </q-card-section>

                        <q-card-section>
                            <div class="row q-col-gutter-md">
                                <div class="col-12 col-sm-6" v-for="tech in technologies" :key="tech.name">
                                    <q-item class="tech-item q-pa-sm">
                                        <q-item-section avatar>
                                            <q-icon :name="tech.icon" :color="tech.color" size="28px" />
                                        </q-item-section>
                                        <q-item-section>
                                            <q-item-label class="text-weight-medium">
                                                {{ tech.name }}
                                            </q-item-label>
                                            <q-item-label caption class="">
                                                {{ tech.description }}
                                            </q-item-label>
                                        </q-item-section>
                                    </q-item>
                                </div>
                            </div>
                        </q-card-section>
                    </q-card>

                    <!-- Архитектура -->
                    <q-card class="arch-card q-mb-lg" flat bordered>
                        <q-card-section class="bg-accent text-white">
                            <div class="text-h5 q-mb-sm">{{ $t('pages.AboutThisProjectPage.architecture.title') }}</div>
                            <div class="text-caption opacity-70">
                                {{ $t('pages.AboutThisProjectPage.architecture.subtitle') }}
                            </div>
                        </q-card-section>

                        <q-card-section>
                            <q-timeline color="secondary" class="q-mt-md">
                                <q-timeline-entry v-for="item in architecture" :key="item.title" :title="item.title"
                                    :subtitle="item.subtitle" :icon="item.icon" :color="item.color">
                                    <div class="text-body2 q-mt-sm">
                                        {{ item.description }}
                                    </div>
                                    <q-chip v-for="tag in item.tags" :key="tag" size="sm" :color="item.color"
                                        text-color="white" class="q-mt-xs q-mr-xs">
                                        {{ tag }}
                                    </q-chip>
                                </q-timeline-entry>
                            </q-timeline>
                        </q-card-section>
                    </q-card>
                </div>

                <!-- Правая колонка - Статистика -->
                <div class="col-12 col-md-4">
                    <!-- Статистика проекта -->
                    <q-card class="stats-card q-mb-lg" flat bordered>
                        <q-card-section class="bg-secondary text-white">
                            <div class="text-h5 q-mb-sm">{{ $t('pages.AboutThisProjectPage.stats.title') }}</div>
                            <div class="text-caption opacity-70">
                                {{ $t('pages.AboutThisProjectPage.stats.subtitle') }}
                            </div>
                        </q-card-section>

                        <q-card-section>
                            <div class="column q-gutter-y-md">
                                <div class="stat-item" v-for="stat in stats" :key="stat.label">
                                    <div class="row items-center justify-between">
                                        <div class="col">
                                            <div class="text-body2">
                                                {{ stat.label }}
                                            </div>
                                        </div>
                                        <div class="col-auto">
                                            <div class="text-h6 text-weight-bold" :style="{ color: stat.color }">
                                                {{ stat.value }}
                                            </div>
                                        </div>
                                    </div>
                                    <q-linear-progress v-if="stat.progress" :value="stat.progress" :color="stat.color"
                                        class="q-mt-xs" />
                                </div>
                            </div>
                        </q-card-section>
                    </q-card>

                    <!-- Особенности реализации -->
                    <q-card class="features-card" flat bordered>
                        <q-card-section class="bg-positive text-white">
                            <div class="text-h5 q-mb-sm">{{ $t('pages.AboutThisProjectPage.features.title') }}</div>
                            <div class="text-caption opacity-70">
                                {{ $t('pages.AboutThisProjectPage.features.subtitle') }}
                            </div>
                        </q-card-section>

                        <q-card-section>
                            <q-list bordered separator>
                                <q-item v-for="feature in features" :key="feature.title" class="q-py-md">
                                    <q-item-section avatar>
                                        <q-icon :name="feature.icon" :color="feature.color" />
                                    </q-item-section>
                                    <q-item-section>
                                        <q-item-label class="text-weight-medium">
                                            {{ feature.title }}
                                        </q-item-label>
                                        <q-item-label caption lines="2">
                                            {{ feature.description }}
                                        </q-item-label>
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </q-card-section>
                    </q-card>
                </div>
            </div>

            <!-- Дополнительная информация -->
            <div class="row q-mt-xl">
                <div class="col-12">
                    <q-card class="info-card" flat bordered>
                        <q-card-section>
                            <div class="text-h5 q-mb-md text-weight-medium">
                                {{ $t('pages.AboutThisProjectPage.additional.title') }}
                            </div>
                            <div class="row q-col-gutter-md">
                                <div class="col-12 col-sm-6">
                                    <div class="text-body1 q-mb-sm">
                                        <strong>{{ $t('pages.AboutThisProjectPage.additional.buildDeploy') }}</strong>
                                    </div>
                                    <ul class="q-pl-md">
                                        <li>{{ $t('pages.AboutThisProjectPage.additional.dev') }}</li>
                                        <li>{{ $t('pages.AboutThisProjectPage.additional.build') }}</li>
                                        <li>{{ $t('pages.AboutThisProjectPage.additional.deploy') }}</li>
                                    </ul>
                                </div>
                            </div>
                        </q-card-section>
                    </q-card>
                </div>
            </div>
        </div>
    </q-page>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';

const i18n = useI18n();
const t = i18n.t;

// Технологии - статические, но с переведенными описаниями
const technologies = computed(() => [
    {
        name: t('pages.AboutThisProjectPage.tech.quasar.name'),
        icon: 'rocket_launch',
        color: 'primary',
        description: t('pages.AboutThisProjectPage.tech.quasar.desc')
    },
    {
        name: t('pages.AboutThisProjectPage.tech.vue.name'),
        icon: 'view_in_ar',
        color: 'positive',
        description: t('pages.AboutThisProjectPage.tech.vue.desc')
    },
    {
        name: t('pages.AboutThisProjectPage.tech.pinia.name'),
        icon: 'storage',
        color: 'accent',
        description: t('pages.AboutThisProjectPage.tech.pinia.desc')
    },
    {
        name: t('pages.AboutThisProjectPage.tech.router.name'),
        icon: 'signpost',
        color: 'info',
        description: t('pages.AboutThisProjectPage.tech.router.desc')
    },
    {
        name: t('pages.AboutThisProjectPage.tech.typescript.name'),
        icon: 'code',
        color: 'secondary',
        description: t('pages.AboutThisProjectPage.tech.typescript.desc')
    },
    {
        name: t('pages.AboutThisProjectPage.tech.i18n.name'),
        icon: 'translate',
        color: 'warning',
        description: t('pages.AboutThisProjectPage.tech.i18n.desc')
    }
]);

// Архитектура
const architecture = computed(() => [
    {
        title: t('pages.AboutThisProjectPage.architecture.feature.title'),
        subtitle: t('pages.AboutThisProjectPage.architecture.feature.subtitle'),
        icon: 'widgets',
        color: 'primary',
        description: t('pages.AboutThisProjectPage.architecture.feature.desc'),
        tags: [t('pages.AboutThisProjectPage.architecture.feature.tags.users'), t('pages.AboutThisProjectPage.architecture.feature.tags.auth'), t('pages.AboutThisProjectPage.architecture.feature.tags.scalable')]
    },
    {
        title: t('pages.AboutThisProjectPage.architecture.shared.title'),
        subtitle: t('pages.AboutThisProjectPage.architecture.shared.subtitle'),
        icon: 'share',
        color: 'secondary',
        description: t('pages.AboutThisProjectPage.architecture.shared.desc'),
        tags: [t('pages.AboutThisProjectPage.architecture.shared.tags.components'), t('pages.AboutThisProjectPage.architecture.shared.tags.types'), t('pages.AboutThisProjectPage.architecture.shared.tags.stores')]
    },
    {
        title: t('pages.AboutThisProjectPage.architecture.i18n.title'),
        subtitle: t('pages.AboutThisProjectPage.architecture.i18n.subtitle'),
        icon: 'language',
        color: 'accent',
        description: t('pages.AboutThisProjectPage.architecture.i18n.desc'),
        tags: [t('pages.AboutThisProjectPage.architecture.i18n.tags.i18n'), t('pages.AboutThisProjectPage.architecture.i18n.tags.en'), t('pages.AboutThisProjectPage.architecture.i18n.tags.ru'), t('pages.AboutThisProjectPage.architecture.i18n.tags.es')]
    },
    {
        title: t('pages.AboutThisProjectPage.architecture.theme.title'),
        subtitle: t('pages.AboutThisProjectPage.architecture.theme.subtitle'),
        icon: 'palette',
        color: 'positive',
        description: t('pages.AboutThisProjectPage.architecture.theme.desc'),
        tags: [t('pages.AboutThisProjectPage.architecture.theme.tags.light'), t('pages.AboutThisProjectPage.architecture.theme.tags.dark')]
    }
]);

// Статистика - статические значения, но переведенные метки
const stats = computed(() => [
    {
        label: t('pages.AboutThisProjectPage.stats.totalFiles'),
        value: '38',
        color: 'var(--q-primary)',
        progress: 1
    },
    {
        label: t('pages.AboutThisProjectPage.stats.vueComponents'),
        value: '9',
        color: 'var(--q-positive)',
        progress: 0.7
    },
    {
        label: t('pages.AboutThisProjectPage.stats.typescriptFiles'),
        value: '20+',
        color: 'var(--q-secondary)',
        progress: 0.8
    },
    {
        label: t('pages.AboutThisProjectPage.stats.languages'),
        value: '3',
        color: 'var(--q-primary)',
        progress: 0.6
    },
    {
        label: t('pages.AboutThisProjectPage.stats.dependencies'),
        value: '20',
        color: 'var(--q-info)',
        progress: 1
    }
]);

// Особенности
const features = computed(() => [
    {
        title: t('pages.AboutThisProjectPage.features.responsive.title'),
        icon: 'devices',
        color: 'primary',
        description: t('pages.AboutThisProjectPage.features.responsive.desc')
    },
    {
        title: t('pages.AboutThisProjectPage.features.typescript.title'),
        icon: 'security',
        color: 'secondary',
        description: t('pages.AboutThisProjectPage.features.typescript.desc')
    },
    {
        title: t('pages.AboutThisProjectPage.features.quasar.title'),
        icon: 'view_quilt',
        color: 'positive',
        description: t('pages.AboutThisProjectPage.features.quasar.desc')
    }
]);

// Реализованные функции согласно ТЗ
const implementedFeatures = computed(() => [
    {
        title: t('pages.AboutThisProjectPage.implementedFeatures.formManagement.title'),
        desc: t('pages.AboutThisProjectPage.implementedFeatures.formManagement.desc'),
        details: i18n.tm('pages.AboutThisProjectPage.implementedFeatures.formManagement.details')
    },
    {
        title: t('pages.AboutThisProjectPage.implementedFeatures.accountTypes.title'),
        desc: t('pages.AboutThisProjectPage.implementedFeatures.accountTypes.desc'),
        details: i18n.tm('pages.AboutThisProjectPage.implementedFeatures.accountTypes.details')
    },
    {
        title: t('pages.AboutThisProjectPage.implementedFeatures.fieldValidation.title'),
        desc: t('pages.AboutThisProjectPage.implementedFeatures.fieldValidation.desc'),
        details: i18n.tm('pages.AboutThisProjectPage.implementedFeatures.fieldValidation.details')
    },
    {
        title: t('pages.AboutThisProjectPage.implementedFeatures.statePersistence.title'),
        desc: t('pages.AboutThisProjectPage.implementedFeatures.statePersistence.desc'),
        details: i18n.tm('pages.AboutThisProjectPage.implementedFeatures.statePersistence.details')
    },
    {
        title: t('pages.AboutThisProjectPage.implementedFeatures.responsiveDesign.title'),
        desc: t('pages.AboutThisProjectPage.implementedFeatures.responsiveDesign.desc'),
        details: i18n.tm('pages.AboutThisProjectPage.implementedFeatures.responsiveDesign.details')
    }
])
</script>

<style lang="scss" scoped>
.about-page {
    transition: all 0.3s ease;

    .container {
        max-width: 1200px;
        margin: 0 auto;
    }
}

// Утилитарные классы для цветов
.opacity-70 {
    opacity: 0.7;
}

// Стили карточек
.tech-card,
.arch-card,
.stats-card,
.features-card,
.info-card {
    background: var(--q-pageUtility);
    border-color: var(--q-pageUtilityContrastLow);
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }
}

.tech-item {
    border-radius: 8px;
    transition: all 0.3s ease;

    &:hover {
        background: var(--q-pageUtilityContrastLow);
    }
}

.stat-item {
    padding: 8px 0;
    border-bottom: 1px solid var(--q-pageUtilityContrastLow);

    &:last-child {
        border-bottom: none;
    }
}

// Темная тема
.body--dark {

    .tech-card,
    .arch-card,
    .stats-card,
    .features-card,
    .info-card {
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);

        &:hover {
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
        }
    }

    .tech-item:hover {
        background: rgba(255, 255, 255, 0.05);
    }
}

// Адаптивность
@media (max-width: 600px) {
    .about-page {
        padding: 16px !important;
    }
}
</style>