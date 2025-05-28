import {toast} from 'react-toastify';

const style = {
    className : "mx-4 py-2 mt-16 md:m-8"
}
const toastOptions = {
    position:"top-center",
    hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  ...style
}

export const displayToastError = (message,time = 1500) =>{
    toast.error(
        message,
        {
            ...toastOptions,
            autoClose:time
        }
    )
};

export const displayToastSuccess = (message,time = 1500) =>{
    toast.success(
        message,
        {
            ...toastOptions,
            autoClose:time
        }
    )
};
