export function useTheme() {
  const isDark = useState('theme-dark', () => false)

  function apply(dark: boolean) {
    isDark.value = dark
    if (import.meta.client) {
      document.documentElement.classList.toggle('dark', dark)
      try {
        localStorage.setItem('theme', dark ? 'dark' : 'light')
      } catch {}
    }
  }

  function toggle() {
    apply(!isDark.value)
  }

  function init() {
    if (!import.meta.client) return
    isDark.value = document.documentElement.classList.contains('dark')
    try {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) apply(e.matches)
      })
    } catch {}
  }

  return { isDark, toggle, init }
}
