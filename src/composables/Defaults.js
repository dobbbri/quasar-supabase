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

  const cfg = {
    confirm: {
      delete(message) {
        return {
          title: 'Excluir',
          message: `Confirme a exclusão ${message}?`,
          ok: { label: 'Excluir', flat: true, color: 'negative' },
          cancel: { label: 'Cancelar', flat: true },
          persistent: true
        }
      },
      exit() {
        return {
          title: 'Sair',
          message: 'Você realmente quer ir embora?',
          ok: { label: 'Sair', flat: true, color: 'negative' },
          cancel: { label: 'Cancelar', flat: true },
          persistent: true
        }
      }
    }
  }

  return { attr, cfg }
}
