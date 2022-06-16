import { Notify } from 'quasar';

export default function useNoyify() {
  const notify = {
    success: (message) => {
      Notify.create({
        message: message || 'Gravado.',
        icon: 'check_circle',
        iconSize: 'lg',
        iconColor: 'green',
        timeout: 2000
      });
    },

    info: (message, caption) => {
      Notify.create({
        message: message,
        caption: caption,
        icon: 'info',
        iconSize: 'lg',
        iconColor: 'blue',
        timeout: 200000,
        actions: [{ label: 'Fechar', color: 'white' }]
      });
    },

    error: (message, error = null) => {
      if (process.env.DEV) console.info(`${message} - error: ${error.code} - ${error.message}`);
      Notify.create({
        message: message,
        caption: `${error.message} (${error.code || ''})`,
        icon: 'error',
        iconSize: 'lg',
        iconColor: 'red',
        timeout: 200000,
        actions: [{ label: 'Fechar', color: 'white' }]
      });
    }
  };

  return {
    notify
  };
}
