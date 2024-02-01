<template>
  <div class="virtual-seamless-scroll">
    <div ref="scrollRef" :class="props.direction">
      <template v-for="(item, index) in currentList" :key="index">
        <slot name="item" :item="item"></slot>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  name: "VirtualSeamlessScroll",
};
</script>

<script setup>
import {
  defineProps,
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from "vue";

const props = defineProps({
  // 数据列表
  list: {
    type: Array,
    default: () => [],
  },
  // 开启滚动的数据量，只有列表长度大于等于该值才会滚动
  limitScrollNum: {
    type: Number,
    default: 10,
  },
  // 滚动间隔时间
  intervalTime: {
    type: Number,
    default: 300,
  },
  // 视图里最多显示的数据量 20
  maxViewNum: {
    type: Number,
    default: 20,
  },
  // 鼠标移入是否停止滚动
  mouseenterStop: {
    type: Boolean,
    default: true,
  },
  // 滚动方向 vertical horizontal 默认vertical
  direction: {
    type: String,
    default: "vertical",
    validator(value) {
      return ["vertical", "horizontal"].includes(value);
    },
  },
});

const scrollRef = ref();
// 当前渲染的索引
const currentIndex = ref(0);
// 是否开启虚拟滚动
const isVirtual = computed(() => nList.value.length > props.maxViewNum);
// 新列表
const nList = ref([]);

// 动画
let animation;
// 当前渲染的列表
const currentList = computed(() => {
  // 如果列表长度小于limitScrollNum，不滚动
  if (nList.value.length < props.limitScrollNum) return nList.value;
  // 如果不开启虚拟滚动，直接返回2倍列表
  const arr = nList.value.concat(nList.value);
  if (!isVirtual.value) return arr;
  // 补齐为maxViewNum的倍数
  const nArr =
    arr.length % props.maxViewNum
      ? arr.concat(
          arr.slice(0, props.maxViewNum - (arr.length % props.maxViewNum))
        )
      : arr;
  return nArr.slice(currentIndex.value, currentIndex.value + props.maxViewNum);
});

/**
 * @description 滚动
 */
function run() {
  if (nList.value.length < props.limitScrollNum) return;
  const moveDirection = {
    vertical: "translateY",
    horizontal: "translateX",
  };
  const moveDistance = {
    vertical: scrollRef.value?.clientHeight,
    horizontal: scrollRef.value?.clientWidth,
  };
  // 创建动画
  const keyframes = [
    { transform: `${moveDirection[props.direction]}(0px)` },
    {
      transform: `${moveDirection[props.direction]}(-${
        moveDistance[props.direction] / 2
      }px)`,
    },
  ];
  const options = {
    duration: props.intervalTime * currentList.value.length,
    iterations: 1,
  };
  animation = scrollRef.value.animate(keyframes, options);
  animation.onfinish = () => {
    if (isVirtual.value) {
      if (currentIndex.value + props.maxViewNum / 2 >= nList.value.length) {
        currentIndex.value =
          props.maxViewNum / 2 - (nList.value.length - currentIndex.value);
      } else {
        currentIndex.value += props.maxViewNum / 2;
      }
    }
    run();
  };
}

/**
 * @description 暂停动画
 */
function animationPause() {
  animation && animation.pause();
}

/**
 * @description 播放动画
 */
function animationPlay() {
  animation && animation.play();
}

/**
 * @description 取消动画
 */
function animationCancel() {
  animation && animation.cancel();
}

watch(
  () => props.list,
  () => {
    nextTick(() => {
      animationCancel();
      currentIndex.value = 0;
      nList.value = props.list;
      nextTick(() => {
        run();
      });
    });
  },
  { deep: true, immediate: true }
);

onMounted(() => {
  if (props.mouseenterStop) {
    // 鼠标移入停止滚动
    scrollRef.value?.addEventListener("mouseenter", animationPause);
    // 鼠标移出继续滚动
    scrollRef.value?.addEventListener("mouseleave", animationPlay);
  }
});
onUnmounted(() => {
  animationCancel();
  if (props.mouseenterStop) {
    scrollRef.value?.removeEventListener("mouseenter", animationPause);
    scrollRef.value?.removeEventListener("mouseleave", animationPlay);
  }
});
</script>

<style scoped>
.virtual-seamless-scroll {
  overflow: hidden;
  height: 100%;
  box-sizing: border-box;
}
.vertical {
}
.horizontal {
  display: inline-flex;
  white-space: nowrap;
}
</style>
