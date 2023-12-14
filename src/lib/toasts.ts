import { toast } from 'react-toastify';

export function displayToast(type: string, message: string, duration?: number) {
  switch (type) {
    case 'success':
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: duration || 1000,
        theme: 'dark',
        style: {
          backgroundColor: 'black',
        },
      });
      break;
    case 'error':
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: duration || 1000,
        theme: 'dark',
        style: {
          backgroundColor: 'black',
        },
      });
      break;
    case 'warning':
      toast.warning(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: duration || 1000,
        theme: 'dark',
        style: {
          backgroundColor: 'black',
        },
      });
      break;
    case 'info':
      toast.info(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: duration || 1000,
        theme: 'dark',
        style: {
          backgroundColor: 'black',
        },
      });
      break;
    default:
      toast(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: duration || 1000,
        theme: 'dark',
        style: {
          backgroundColor: 'black',
        },
      });
      break;
  }
}

export async function displayToastAfterFetch(
  res: Response,
  data: any,
  callback?: any
) {
  if (res.status === 200) {
    toast.success(data.message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
      theme: 'dark',

      style: {
        backgroundColor: 'black',
      },
    });
    if (callback) callback();
  } else {
    toast.error(data.message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
      theme: 'dark',
      style: {
        backgroundColor: 'black',
      },
    });
  }
}
