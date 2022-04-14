export default function useAttributes() {
  const attr = {
    btn: {
      basic: { unelevated: true, dense: true, class: 'text-weight-bold' },
      icon: { flat: true, round: true }
    }
  }

  return { attr }
}
