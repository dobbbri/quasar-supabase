import { Dialog } from 'quasar'

export default function useConfirm() {
  const confirm = {
    delete: (message) => {
      return Dialog.create({
        // title: 'Atenção',
        message: `Tem certeza que quer excluir ${message}?`,
        cancel: { label: 'Cancelar', flat: true, noCaps: true },
        ok: { label: 'Excluir', flat: true, noCaps: true, color: 'negative' },
        persistent: true
      })
    },
    exit: () => {
      return Dialog.create({
        title: 'Sair',
        message: 'Você realmente quer ir embora?',
        ok: { label: 'Ok. Sair', flat: true, noCaps: true, color: 'negative' },
        cancel: { label: 'Cancelar', flat: true, noCaps: true },
        persistent: true
      })
    }
  }

  return {
    confirm
  }
}
