import useConfirm from "src/composables/tools/Confirm";
import useLoading from "src/composables/tools/Loading";
import useNotify from "src/composables/tools/Notify";

export default function useTools() {
  const { confirm } = useConfirm();
  const { loading, setLoading } = useLoading();
  const { notify } = useNotify();

  return {
    confirm,
    loading,
    setLoading,
    notify,
  };
}
