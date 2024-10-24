<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useWandStore } from './stores/wand'

const wands = useWandStore()

wands.updateStreamerHandle('Codeacula')
</script>

<template>
  <header>
    <h1>Noita Wands Overlay</h1>
  </header>

  <RouterView />
</template>

<style scoped></style>
