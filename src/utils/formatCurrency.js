const formatCurrency = (value) => {
  const formatted = value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
  return formatted
}

export default formatCurrency
