export default function useFormatter() {
  const fmt = {
    currency(value) {
      try {
        const format = { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' };
        return value.toLocaleString('pt-br', format);
      } catch (e) {
        console.log('fmt $ value: ', value, ' err: ', e);
      }
      return '*** Err ***';
    }
  };

  return { fmt };
}
