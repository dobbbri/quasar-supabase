import useConfirm from 'src/composables/tools/Confirm'
import useNotify from 'src/composables/tools/Notify'
import useFormatter from 'src/composables/tools/Formatter'

export default function useTools() {
  const { confirm } = useConfirm()
  const { notify } = useNotify()
  const { fmt } = useFormatter()

  return {
    confirm,
    notify,
    fmt
  }
}
