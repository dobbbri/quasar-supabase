export default function useAttribute() {
  const attribute = {
    btn: {
      basic: {
        rounded: true,
        dense: false,
        color: 'primary',
        class: 'text-weight-medium'
      },
      icon: { round: true, size: 'md', color: 'white', dense: true }
    },

    input: {
      search: {
        clearable: true,
        dense: true,
        outlined: true,
        bgColor: 'grey-2'
      }
    }
  }

  return { attribute }
}
