export default function useAttribute() {
  const attr = {
    page: {
      class: 'full-width q-pa-md q-pt-none bg-app'
    },

    lineSpacing: {
      class: 'q-gutter-y-sm'
    },

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
        color: 'white',
        textColor: 'grey-10',
        class: 'text-weight-bold'
      },
      header: {
        rounded: true,
        flat: true,
        noCaps: true,
        bgColor: 'white',
        textColor: 'info'
      },
      icon: { round: true, size: 'md', color: 'white' }
    },

    input: {
      basic: {
        hideBottomSpace: true,
        outlined: true,
        dense: false,
        optionsDense: false,
        stackLabel: false,
        color: 'secondary',
        bgColor: 'white'
      },
      search: {
        hideBottomSpace: true,
        clearable: true,
        dense: false,
        outlined: true,
        color: 'secondary',
        bgColor: 'white',
        class: 'q-py-sx -q-mt-md'
      }
    },

    expansion: {
      headerClass: 'text-primary bg-white title title-expansion q-mt-md',
      denseToggle: true,
      expandIcon: 'chevron_right',
      expandedIcon: 'expand_less',
      class: 'bg-white -q-mx-md',
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
