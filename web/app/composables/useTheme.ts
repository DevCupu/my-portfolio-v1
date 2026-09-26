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
    try {
      apply(localStorage.getItem('theme') === 'dark')
    } catch {}
  }

  return { isDark, toggle, init }
}
