export default function useDefaults() {
  const attr = {
    btn: {
      basic: {
        rounded: true,
        dense: false,
        color: 'primary',
        class: 'text-weight-medium'
      },
      icon: { round: true, size: 'md', dense: true }
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

  return { attr, cfg }
}
