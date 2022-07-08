export default function useFormatter() {
  const fmt = {
    currency(value) {
      return value.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL'
      });
    }
  };

  return { fmt };
}
