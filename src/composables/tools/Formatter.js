export default function useFormatter() {
  const fmt = {
    currency(value) {
      try {
        const options = {
          maximumFractionDigits: 2,
          // roundingIncrement: 5,
          style: 'currency',
          currency: 'BRL'
        }
        const cnf = new Intl.NumberFormat('pt-br', options)
        return cnf.format(value)
      } catch (e) {
        console.log('fmt currency: ', value, ' err: ', e)
      }
      return '*** Err ***'
    },

    integer(value) {
      try {
        const options = {
          maximumFractionDigits: 0
        }
        const inf = new Intl.NumberFormat('pt-br', options)
        return inf.format(value)
      } catch (e) {
        console.log('fmt integer: ', value, ' err: ', e)
      }
      return '*** Err ***'
    },

    brDateToDbDate(date) {
      try {
        const temp = date.split('/')
        // 01/12/2022
        // ISO standard YYYY-MM-DD
        const d = new Date(temp[2], temp[1] - 1, temp[0])
        return d
      } catch (e) {
        console.log('fmt dateToDB: ', date, ' err: ', e)
      }
    },

    dbDateToBrDate(date) {
      try {
        const d = new Date(date)
        return d.toLocaleString('pt-BR', 'short')
      } catch (e) {
        console.log('fmt dateToBR: ', date, ' err: ', e)
      }
    },

    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    }
  }

  return { fmt }
}
