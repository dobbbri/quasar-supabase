import useConfirm from 'src/composables/tools/Confirm';
import useNotify from 'src/composables/tools/Notify';

export default function useTools() {
  const { confirm } = useConfirm();
  const { notify } = useNotify();

  return {
    confirm,
    notify
  };
}
