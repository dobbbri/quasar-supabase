export default function useFormatter() {
  const formatter = {
    inactive(value) {
      return value ? 'Não exibir os produtos desta categoria' : ''
    },
    currency(value) {
      return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    }
  }

  return { formatter }
}
