<script setup lang="ts">
const props = defineProps({
  docContent: {
    required: true,
  },
});
</script>
<template>
  <div class="doc-render">{{ props.docContent }}</div>
</template>
<style lang="less">
.doc-render {
  color: #fff;
}
</style>
