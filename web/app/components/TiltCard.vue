<script setup lang="ts">
const rotateX = useMotionValue(0)
const rotateY = useMotionValue(0)
const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 })
const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 })

const glowX = ref(50)
const glowY = ref(50)

function onMove(e: PointerEvent) {
  const el = e.currentTarget as HTMLElement
  const rect = el.getBoundingClientRect()
  const px = (e.clientX - rect.left) / rect.width
  const py = (e.clientY - rect.top) / rect.height
  rotateX.set((0.5 - py) * 12)
  rotateY.set((px - 0.5) * 12)
  glowX.value = px * 100
  glowY.value = py * 100
}
function onLeave() {
  rotateX.set(0)
  rotateY.set(0)
}
</script>

<template>
  <Motion
    class="tilt-card"
    :style="{ rotateX: springRotateX, rotateY: springRotateY, transformPerspective: '900px', '--glow-x': `${glowX}%`, '--glow-y': `${glowY}%` }"
    @pointermove="onMove"
    @pointerleave="onLeave"
  >
    <div class="tilt-card__glow" aria-hidden="true" />
    <slot />
  </Motion>
</template>
