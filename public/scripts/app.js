(function() {
  'use strict';

  window.onload = function() {
    let content = localStorage.getItem("message") || 'Enter a message';
    $('#message').val(content);
    $('#card').val(content);
  }

   $('#button').click(() => {
     console.log('click');
     let message = $('#message').val();
     localStorage.setItem("message", message);
     $('#message').val('');
     $('#card').val(message);
   });


  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }
})();
