import { formatInactive } from 'src/utils'

const tableConfig = {
  rowsPerPageLabel: 'registros por página',
  noDataLabel: 'Nenhum dado disponível',
  class: 'col-12',
  flat: true,
  pagination: { rowsPerPage: '10' },
  rowKey: 'id',
  columns: [
    { name: 'nome', align: 'left', label: 'Nome', field: 'name', sortable: true },
    {
      name: 'status',
      align: 'center',
      label: 'Status',
      field: 'inactive',
      format: (val) => formatInactive(val),
      sortable: true
    },
    { name: 'actions', align: 'right', label: 'Ações', field: 'actions', sortable: false }
  ]
}
export { tableConfig }
