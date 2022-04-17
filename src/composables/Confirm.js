import { Dialog } from 'quasar'

export default function useConfirm() {
  const confirm = {
    delete: (message) => {
      return Dialog.create({
        title: 'Excluir',
        message: `Confirme a exclusão ${message}?`,
        ok: { label: 'Excluir', flat: true, color: 'negative' },
        cancel: { label: 'Cancelar', flat: true },
        persistent: true
      })
    },
    exit: () => {
      return Dialog.create({
        title: 'Sair',
        message: 'Você realmente quer ir embora?',
        ok: { label: 'Sair', flat: true, color: 'negative' },
        cancel: { label: 'Cancelar', flat: true },
        persistent: true
      })
    }
  }

  return {
    confirm
  }
}
