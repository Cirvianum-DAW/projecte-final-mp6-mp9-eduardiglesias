document.addEventListener('DOMContentLoaded', function() {
    const dataContainer = document.getElementById('data-container');
    const apiUrl = 'https://664cbd3fede9a2b556516ae6.mockapi.io/api/cars';
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        data.forEach(item => {
          const carModel = new CarModelComponent(item);
          dataContainer.appendChild(carModel.render());
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  });
  