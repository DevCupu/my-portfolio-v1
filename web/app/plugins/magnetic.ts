export default defineNuxtPlugin((nuxtApp) => {
  let enabled = false
  if (import.meta.client) {
    const motionOK = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    enabled = motionOK && finePointer
  }

  function onMove(this: HTMLElement, e: MouseEvent) {
    const r = this.getBoundingClientRect()
    const x = e.clientX - r.left - r.width / 2
    const y = e.clientY - r.top - r.height / 2
    this.style.transform = `translate(${x * 0.18}px, ${y * 0.3}px)`
  }
  function onLeave(this: HTMLElement) {
    this.style.transform = ''
  }

  nuxtApp.vueApp.directive('magnetic', {
    mounted(el: HTMLElement) {
      if (!enabled) return
      el.addEventListener('mousemove', onMove)
      el.addEventListener('mouseleave', onLeave)
    },
    unmounted(el: HTMLElement) {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  })
})
