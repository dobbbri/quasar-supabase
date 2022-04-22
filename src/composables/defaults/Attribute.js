export default function useAttribute() {
  const attributes = {
    btn: {
      basic: {
        rounded: true,
        dense: false,
        color: 'primary',
        class: 'text-weight-medium'
      },
      icon: { round: true, size: 'md', color: 'primary', dense: true }
    },
    input: {
      search: {
        clearable: true,
        dense: true,
        rounded: true,
        outlined: true,
        bgColor: 'white',
        color: 'primary',
        class: 'q-px-md'
      }
    }
  }

  return { attributes }
}
