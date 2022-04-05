import { Notify } from 'quasar'

export default function useNotify() {
  const notifySuccess = (message) => {
    Notify.create({
      message: message || 'Gravado.',
      icon: 'check_circle',
      iconColor: 'green',
      timeout: 2000
    })
  }

  const notifyError = (message, error = null) => {
    if (process.env.DEV) console.info(`${message} - error: ${error.code} - ${error.message}`)
    Notify.create({
      message: message,
      caption: `${error.message} (${error.code || ''})`,
      icon: 'error',
      iconColor: 'red',
      timeout: 200000,
      actions: [{ label: 'Fechar', color: 'white' }]
    })
  }

  return {
    notifySuccess,
    notifyError
  }
}
