import Swal from 'sweetalert2'

export function isValidEmail(email) {
    const emailRegex = /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  }
  
  export function isValidPassword(password) {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
    
    return pattern.test(password);
  }

  export function showCustomizedAlert(errorMessage) {
    Swal.fire({
        title: 'Error!',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#008B8B',
        background: '#FFFFFF',
        width:'300px',
        padding:'10px',
         customClass: {
              confirmButton: 'custom-swal-confirm', // Apply custom class to the confirm button
              icon:'icon-swal',
              title:'title-swal',
              text:'text-swal'
          }
    });
  }

