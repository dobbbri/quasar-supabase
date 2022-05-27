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
        optionsDense: true
      },
      search: {
        rounded: false,
        clearable: true,
        dense: true,
        outlined: true,
        bgColor: 'blue-grey-1',
        class: 'q-mb-sm q-py-sx rounded-borders-sm'
      }
    },

    form: {
      class: 'q-mt-xs q-mx-xs full-width',
      style: 'max-width: 620px'
    },

    banner: {
      dense: true,
      class: 'q-px-md bg-blue-grey-1'
    }
  };

  return { attribute };
}
