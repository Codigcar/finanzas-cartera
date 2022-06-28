


import swal from 'sweetalert2';

export const toastMessage = (type:any = 'success', message:string = '¡Cambios guardados correctamente!') => {
    const Toast = swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', swal.stopTimer)
            toast.addEventListener('mouseleave', swal.resumeTimer)
        }
    })
    Toast.fire({
        icon: type,
        title: message
    })
}
