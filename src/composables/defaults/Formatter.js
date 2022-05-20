export default function useFormatter() {
  const formatter = {
    currency(value) {
      return value.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL'
      });
    }
  };

  return { formatter };
}
