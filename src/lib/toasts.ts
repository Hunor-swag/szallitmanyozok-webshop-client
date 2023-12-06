import { toast } from 'react-toastify';

export function displayToast(type: string, message: string) {
  switch (type) {
    case 'success':
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        theme: 'dark',
        style: {
          backgroundColor: 'gray',
        },
      });
      break;
    case 'error':
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        theme: 'dark',
        style: {
          backgroundColor: 'gray',
        },
      });
      break;
    case 'warning':
      toast.warning(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        theme: 'dark',
        style: {
          backgroundColor: 'gray',
        },
      });
      break;
    case 'info':
      toast.info(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        theme: 'dark',
        style: {
          backgroundColor: 'gray',
        },
      });
      break;
    default:
      toast(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        theme: 'dark',
        style: {
          backgroundColor: 'gray',
        },
      });
      break;
  }
}
