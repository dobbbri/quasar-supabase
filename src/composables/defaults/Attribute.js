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
      basic: {
        hideBottomSpace: true
      },
      search: {
        square: true,
        clearable: true,
        dense: true,
        outlined: true,
        bgColor: 'blue-grey-1',
        class: 'q-mb-sm q-py-sx'
      }
    },

    form: {
      class: 'q-gutter-y-md q-mt-xs q-mx-xs full-width',
      style: 'max-width: 620px'
    },

    banner: {
      dense: true,
      class: 'q-px-md bg-blue-grey-1'
    }
  };

  return { attribute };
}
