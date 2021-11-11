<script setup lang="ts">
import { reactive, watchEffect, defineProps, ref, onMounted } from 'vue';
import { useDocs } from '../../hooks';

const props = defineProps({
  sliderTitle: {
    type: String,
  },
  sliderObjectOrContent: {
    require: true,
    type: Object,
  },
});

const docsData = useDocs();

const data = reactive<{ sliderObjectOrContent: any; activeDoc: any }>({
  sliderObjectOrContent: {},
  activeDoc: {},
});

watchEffect(() => {
  data.sliderObjectOrContent = props.sliderObjectOrContent;
});

const isFolder = (valueData: any) =>
  typeof valueData === 'object' && Object.keys(valueData).length > 0;

const isContent = (valueData: any) => typeof valueData === 'string';

const handleClick = (menuValue: any) => {
  if (isFolder(menuValue)) {
    menuValue.__open = !menuValue.__open;
    return;
  }
  // 文章内容
  docsData?.setDocsContent(menuValue);
};
</script>
<template>
  <div>
    <span
      v-if="props.sliderTitle"
      :class="{ 'l-tt': true, active: docsData?.docsContent === data.sliderObjectOrContent }"
      @click="
        () => isContent(data.sliderObjectOrContent) && handleClick(data.sliderObjectOrContent)
      "
      >{{ props.sliderTitle }}</span
    >
    <ul class="l-ul" v-if="isFolder(data.sliderObjectOrContent)">
      <template
        v-for="(value, key, index) in data.sliderObjectOrContent"
        :key="String(key) + String(index || 0)"
      >
        <li
          :class="{ 'l-li': true, active: value === docsData?.docsContent }"
          v-if="key !== '__open'"
        >
          <div @click="() => handleClick(value)" :class="isFolder(value) ? 'l-folder' : 'l-text'">
            <span v-if="typeof value === 'string' || isFolder(value)">{{ key }}</span>
            <span
              v-if="isFolder(value)"
              :class="{ 'button-arrow': true, __open: value.__open }"
            ></span>
          </div>
          <transition name="slide-fade">
            <slider-link
              v-if="!!value.__open && isFolder(value)"
              :slider-object-or-content="value"
            />
          </transition>
        </li>
      </template>
    </ul>
  </div>
</template>
<style lang="less" scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
.l-tt {
  display: block;
  margin: 5px auto;
  padding-left: 20px;
  font-weight: 500;
  cursor: pointer;
  &.active {
    color: var(--c-brand);
  }
}
.l-ul,
.l-li {
  padding: 2px 0;
  list-style: none;
  cursor: pointer;
  transition: all 0.2s;
  .l-folder {
    font-weight: 500;
  }
  .l-text {
    user-select: none;
    &:hover {
      color: var(--c-brand);
    }
  }
  .active-doc {
    color: red;
  }
  &.active {
    color: var(--c-brand);
  }
}
.l-ul {
  margin: 0;
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
  &.__open {
    transform: rotateZ(0deg);
  }
}
</style>
