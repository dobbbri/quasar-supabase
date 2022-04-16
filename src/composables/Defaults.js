export default function useDefaults() {
  const attr = {
    btn: {
      basic: { unelevated: true, dense: true, color: 'primary', class: 'text-weight-bold' },
      icon: { flat: true, round: true, size: 'md', dense: true }
    }
  }

  const cfg = {
    dialog: {
      delete: {
        title: 'Excluir',
        message: '',
        ok: { label: 'Excluir', flat: true, color: 'negative' },
        cancel: { label: 'Cancelar', flat: true },
        persistent: true
      },
      exit: {}
    }
  }

  return { attr, cfg }
}
