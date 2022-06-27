export default function useAttribute() {
  const attribute = {
    btn: {
      basic: {
        rounded: false,
        unelevated: true,
        noCaps: true,
        color: 'white',
        textColor: 'primary',
        class: 'text-weight-bold'
      },
      icon: { round: true, size: 'lg', color: 'white' }
    },

    input: {
      basic: {
        hideBottomSpace: true,
        outlined: true,
        dense: false,
        optionsDense: false,
        color: 'secondary'
      },
      search: {
        clearable: true,
        dense: false,
        outlined: true,
        color: 'secondary',
        class: 'q-mb-sm q-py-sx'
      }
    },

    page: {
      class: 'full-width q-pa-md',
      style: 'max-width: 620px;'
    },

    lineSpacing: {
      class: 'q-gutter-y-lg q-py-md'
    },

    expansion: {
      headerClass: 'text-title text-primary q-mt-lg',
      denseToggle: true,
      dense: true
    },

    banner: {
      class: 'q-px-md bg-blue-grey-1',
      dense: true
    },

    fab: {
      menu: {
        unelevated: true,
        verticalActionsAlign: 'right',
        color: 'primary',
        direction: 'down'
      },
      action: {
        labelPosition: 'left',
        externalLabel: true,
        color: 'primary',
        textColor: 'white'
      }
    }
  };

  return { attribute };
}
