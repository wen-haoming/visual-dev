<script lang="ts" setup>
import { reactive, watchEffect } from 'vue';
import { useDocs } from '../../hooks';
import SliderLink from './SliderLink.vue';

const docsData = useDocs();
const props = defineProps({
  sliderTitle: {
    type: String,
  },
  sliderObject: {
    require: true,
    type: Object,
  },
});

const data = reactive<{ sliderObject: any; activeDoc: any }>({
  sliderObject: {},
  activeDoc: {},
});

watchEffect(() => {
  data.sliderObject = props.sliderObject;
});

const isFolder = (valueData: any) => typeof valueData === 'object';

const handleClick = (menuValue: any) => {
  if (isFolder(menuValue)) {
    menuValue.open = !menuValue.open;
    return;
  }
  // 文章内容
  docsData?.setDocsContent(menuValue);
};
</script>
<template>
  <ul class="l-ul">
    <span v-if="props.sliderTitle" class="l-tt">{{ props.sliderTitle }}</span>
    <li
      :class="{ 'l-li': true, active: value === docsData.docsContent }"
      v-for="(value, key, index) in data.sliderObject"
      :key="key + (index || 0)"
    >
      <div @click="() => handleClick(value)" :class="isFolder(value) ? 'l-folder' : 'l-text'">
        <span v-if="typeof value === 'string' || isFolder(value)">{{ key }}</span>
        <span v-if="isFolder(value)" :class="{ 'button-arrow': true, open: value.open }"></span>
      </div>
      <slider-link v-if="!!value.open && isFolder(value)" :slider-object="value" />
    </li>
  </ul>
</template>
<style lang="less" scoped>
.l-tt {
  display: block;
  margin: 10px auto;
  font-weight: 500;
  user-select: none;
}
.l-ul,
.l-li {
  list-style: none;
  cursor: pointer;
  transition: all 0.2s;
  height:100px .l-folder {
  }
  .l-text {
    user-select: none;
  }
  .active-doc {
    color: red;
  }
  &.active {
    color: var(--c-brand);
  }
}
.l-ul {
  padding-left: 1.5rem;
  user-select: none;
}

.button-arrow {
  display: inline-block;
  margin-top: -1px;
  margin-left: 5px;
  vertical-align: middle;
  border-top: 6px solid rgb(204, 204, 204);
  border-right: 4px solid transparent;
  border-bottom: 0px;
  border-left: 4px solid transparent;
  transform: rotateZ(90deg);
  transition: transform 0.3s;
  &.open {
    transform: rotateZ(0deg);
  }
}
</style>
