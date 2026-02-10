<template>
  <div class="fullscreen text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">404</div>
      <div class="text-h2" style="opacity:.4">{{ $t('pages.ErrorNotFound.title') }}</div>
      <div class="text-h5 q-mt-md">{{ $t('pages.ErrorNotFound.message') }}</div>
      <q-btn class="q-mt-xl" color="primary" unelevated to="/" :label="$t('pages.ErrorNotFound.goHome')" no-caps />
    </div>
  </div>
</template>