export default function useDefaults() {
  const attr = {
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

  const fmt = {
    inactive(value) {
      return value ? 'NÃO EXIBIR' : ''
    },
    currency(value) {
      return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    }
  }

  const cfg = {
    table: {
      rowsPerPageLabel: 'registros por página',
      noDataLabel: 'Nenhum registrto disponível',
      class: 'col-12',
      flat: true,
      pagination: { rowsPerPage: '9' },
      rowKey: 'id'
    }
  }

  return { attr, cfg, fmt }
}
