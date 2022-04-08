import { formatInactive } from 'src/utils'

const columnsCategory = [
  { name: 'nome', align: 'left', label: 'Nome', field: 'name', sortable: true },
  {
    name: 'status',
    align: 'left',
    label: 'Status',
    field: 'inactive',
    format: (val) => formatInactive(val),
    sortable: true
  },
  { name: 'actions', align: 'right', label: 'Ações', field: 'actions', sortable: false }
]

export { columnsCategory }
