export default function useAttribute() {
  const attribute = {
    btn: {
      basic: {
        rounded: false,
        unelevated: true,
        noCaps: true,
        dense: false,
        color: 'white',
        textColor: 'primary',
        class: 'q-px-sm text-weight-medium'
      },
      icon: { round: true, size: 'md', color: 'white', dense: true }
    },

    input: {
      basic: {
        hideBottomSpace: true,
        outlined: true,
        dense: true,
        optionsDense: true,
        color: 'secondary'
      },
      search: {
        clearable: true,
        dense: true,
        outlined: true,
        color: 'secondary',
        class: 'q-mb-sm q-py-sx'
      }
    },

    form: {
      class: 'q-mt-xs q-mx-xs full-width',
      style: 'max-width: 620px'
    },

    banner: {
      dense: true,
      class: 'q-px-md bg-blue-grey-1'
    },

    expansion: {
      headerClass: 'bt-1px text-title text-primary q-mt-lg',
      dense: true
    },

    lineSpacing: {
      class: 'q-gutter-y-md q-pt-md'
    }
  };

  return { attribute };
}
