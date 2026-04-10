document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      navLinks.classList.toggle('show');
    });
  }

  const counter = document.getElementById('gc-counter');
  if (counter) {
    function loadGoatCounterValue() {
      if (!window.goatcounter || !window.goatcounter.get_data) {
        setTimeout(loadGoatCounterValue, 150);
        return;
      }

      const path = window.goatcounter.get_data().p;
      const url = 'https://mrkgrb.goatcounter.com/counter/' + encodeURIComponent(path) + '.json';

      fetch(url)
        .then(function (response) {
          if (!response.ok) throw new Error('HTTP ' + response.status);
          return response.json();
        })
        .then(function (data) {
          counter.textContent = data.count;
        })
        .catch(function () {
          counter.textContent = '0';
        });
    }

    loadGoatCounterValue();
  }
});