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
        square: true,
        clearable: true,
        dense: true,
        outlined: true,
        bgColor: 'blue-grey-1',
        class: 'q-mb-sm'
      }
    },

    form: {
      class: 'q-gutter-y-xs q-mt-xs'
    },

    banner: {
      dense: true,
      class: 'q-px-md bg-blue-grey-1'
    }
  }

  return { attribute }
}
