<script setup lang="ts">
import { onMounted } from 'vue';

const props = defineProps({
  docContent: {
    required: true,
  },
});

onMounted(() => {});
</script>
<template>
  <div class="doc-render">
    {{ props.docContent }}
    <div id="div1"></div>
    <div id="div2"></div>
  </div>
</template>
<style lang="less">
.doc-render {
  color: #fff;
}
</style>
