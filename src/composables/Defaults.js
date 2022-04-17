export default function useDefaults() {
  const attr = {
    btn: {
      basic: {
        rounded: true,
        dense: true,
        color: 'primary',
        class: 'text-weight-bold'
      },
      icon: { flat: true, round: true, size: 'md', dense: true }
    }
  }

  const cfg = {}

  return { attr, cfg }
}
