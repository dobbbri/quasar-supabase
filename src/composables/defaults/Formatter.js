export default function useFormatter() {
  const formatter = {
    hideProducts(value) {
      return value ? 'Não exibir os produtos desta categoria' : ''
    },
    inactive(value) {
      return value ? 'Não exibir' : ''
    },
    currency(value) {
      return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    }
  }

  return { formatter }
}
