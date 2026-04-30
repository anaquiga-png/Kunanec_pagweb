/** Scroll to the lead form anchor (`#demo`). */
export function scrollToDemo() {
  document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
