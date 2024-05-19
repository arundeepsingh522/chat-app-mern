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

  
   export function showToast(message) {
    var toast = document.getElementById("toastMessage");
    toast.innerText = message; // Set the message text
    toast.style.display = "block";

    return new Promise(resolve => {
      setTimeout(function(){
          toast.style.display = "none";
          resolve(); // Resolve the promise after hiding the toast
      }, 2500); // Hide the toast after 3 seconds
  });// Hide the toast after 3 seconds
}

export function compressImage(inputFile, quality, callback) {
  var reader = new FileReader();
  reader.onload = function(event) {
      var img = new Image();
      img.onload = function() {
          var canvas = document.createElement('canvas');
          var ctx = canvas.getContext('2d');
          var maxWidth = 800; // Set a maximum width for the compressed image
          var maxHeight = 600; // Set a maximum height for the compressed image
          var width = img.width;
          var height = img.height;

          if (width > height) {
              if (width > maxWidth) {
                  height *= maxWidth / width;
                  width = maxWidth;
              }
          } else {
              if (height > maxHeight) {
                  width *= maxHeight / height;
                  height = maxHeight;
              }
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          var currentDate = new Date();
          var dateString = currentDate.toISOString().split('T')[0]; // Get current date as YYYY-MM-DD
          var timeString = currentDate.toTimeString().split(' ')[0].replace(/:/g, ''); // Get current time as HHMMSS
          var outputFileName = 'compressed_' + dateString + '_' + timeString + '.jpg'; // Generate filename with current date and time

          canvas.toBlob(function(blob) {
              var compressedFile = new File([blob], outputFileName, { type: 'image/jpeg', lastModified: Date.now() });
              callback(compressedFile);
          }, 'image/jpeg', quality / 100);
      };
      img.src = event.target.result;
  };
  reader.readAsDataURL(inputFile);
}




