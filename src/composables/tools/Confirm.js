import { Dialog } from 'quasar';

export default function useConfirm() {
  const confirm = {
    delete: (message) => {
      return Dialog.create({
        title: 'Confirmação',
        message: `Tem certeza de que deseja remover ${message}?`,
        cancel: { label: 'Não', flat: true, noCaps: true },
        ok: { label: 'Sim, remover', flat: true, noCaps: true, color: 'negative' },
        persistent: true
      });
    },
    exit: () => {
      return Dialog.create({
        title: 'Sair',
        message: 'Você realmente quer ir embora?',
        ok: { label: 'Sair', flat: true, noCaps: true, color: 'negative' },
        cancel: { label: 'Cancelar', flat: true, noCaps: true },
        persistent: true
      });
    }
  };

  return {
    confirm
  };
}
