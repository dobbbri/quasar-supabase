export default function useFormatter() {
  const fmt = {
    currency(value) {
      try {
        const format = { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' };
        return value.toLocaleString('pt-br', format);
      } catch (e) {
        console.log('fmt money: ', value, ' err: ', e);
      }
      return '*** Err ***';
    },

    BrDateToDbDate(date) {
      try {
        const temp = date.split('/');
        // 01/12/2022
        // ISO standard YYYY-MM-DD
        const d = new Date(temp[2], temp[1] - 1, temp[0]);
        return d;
      } catch (e) {
        console.log('fmt dateToDB: ', date, ' err: ', e);
      }
    },

    DbDateToBrDate(date) {
      try {
        const d = new Date(date);
        return d.toLocaleString('pt-BR', 'short');
      } catch (e) {
        console.log('fmt dateToBR: ', date, ' err: ', e);
      }
    }
  };

  return { fmt };
}
