<script setup lang="ts">
const props = defineProps<{ to: number }>()
const v = ref(props.to)
const el = ref<HTMLElement>()
onMounted(() => {
  const io = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return
    io.disconnect()
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t0 = performance.now()
    const step = (t: number) => {
      const p = Math.min((t - t0) / 1200, 1)
      v.value = Math.round(props.to * (1 - Math.pow(1 - p, 3)))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  })
  if (el.value) io.observe(el.value)
  onBeforeUnmount(() => io.disconnect())
})
</script>
<template><span ref="el">{{ v }}</span></template>
