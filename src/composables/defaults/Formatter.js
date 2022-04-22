export default function useFormatters() {
  const formatter = {
    inactive(value) {
      return value ? 'NÃO EXIBIR' : ''
    },
    currency(value) {
      return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    }
  }

  return { formatter }
}
