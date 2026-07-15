export default defineNuxtPlugin((nuxtApp) => {
  let observer: IntersectionObserver | undefined
  if (import.meta.client) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer!.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '-40px 0px' }
    )
  }

  nuxtApp.vueApp.directive('reveal', {
    mounted(el: HTMLElement) {
      observer?.observe(el)
    },
    unmounted(el: HTMLElement) {
      observer?.unobserve(el)
    }
  })
})
