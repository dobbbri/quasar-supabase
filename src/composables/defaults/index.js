export default function useAttribute() {
  const attr = {
    btn: {
      basic: {
        rounded: false,
        unelevated: true,
        noCaps: true,
        textColor: 'white',
        class: 'text-weight-bold'
      },
      big: {
        rounded: false,
        noCaps: true,
        color: 'grey-3',
        textColor: 'grey-10',
        class: 'text-weight-bold'
      },
      icon: { round: true, size: 'md', color: 'white' }
    },

    input: {
      basic: {
        hideBottomSpace: false,
        outlined: false,
        dense: false,
        optionsDense: false,
        stackLabel: true,
        color: 'secondary'
      },
      search: {
        clearable: true,
        dense: false,
        outlined: true,
        color: 'secondary',
        class: 'q-mb-md q-py-sx'
      }
    },

    page: {
      class: 'full-width q-pa-md'
    },

    lineSpacing: {
      class: 'q-gutter-y-sm'
    },

    expansion: {
      headerClass: 'text-primary title title-expansion q-mt-md',
      denseToggle: true,
      expandIcon: 'chevron_right',
      expandedIcon: 'expand_less',
      dense: true
    },

    banner: {
      class: 'q-px-md bg-blue-grey-1',
      dense: true
    },

    fab: {
      menu: {
        color: 'primary',
        direction: 'down'
      },
      action: {
        labelPosition: 'left',
        externalLabel: true,
        textColor: 'white'
      }
    }
  };

  return { attr };
}
