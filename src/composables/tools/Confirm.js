import { Dialog } from 'quasar'

export default function useConfirm() {
  const confirm = {
    delete: (message) => {
      return Dialog.create({
        title: 'Confirme para excluir',
        message: `Isso é permanente! Tem certeza de que deseja excluir ${message}?`,
        cancel: { label: 'Cancelar', flat: true },
        ok: { label: 'Confirmar', flat: true, color: 'negative' },
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
