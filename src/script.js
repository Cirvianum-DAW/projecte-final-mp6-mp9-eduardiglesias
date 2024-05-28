document.addEventListener('DOMContentLoaded', function() {
  const dataContainer = document.getElementById('data-container');
  const carsApiUrl = 'https://664cbd3fede9a2b556516ae6.mockapi.io/api/cars';
  const apiUrl = 'https://664cbd3fede9a2b556516ae6.mockapi.io/api';
  const seriesApiUrl = 'https://664cbd3fede9a2b556516ae6.mockapi.io/api/series';
  const form = document.getElementById('car-form');
  const seriesSelect = document.getElementById('series');

  // Fetch and display existing car models
  fetch(carsApiUrl)
    .then(response => response.json())
    .then(data => {
      data.forEach(item => {
        const carModel = new CarModelComponent(item);
        dataContainer.appendChild(carModel.render());
      });
    })
    .catch(error => console.error('Error fetching data:', error));

  // Fetch series and populate the select box
  fetch(seriesApiUrl)
    .then(response => response.json())
    .then(data => {
      data.forEach(series => {
        const option = document.createElement('option');
        option.value = series.id;
        option.textContent = series.name;
        seriesSelect.appendChild(option);
      });
    })
    .catch(error => console.error('Error fetching series:', error));

  // Handle form submission to create a new car model
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const image = document.getElementById('image').value;
    const description = document.getElementById('description').value;
    const seriesId = document.getElementById('series').value;
    const packM = document.getElementById('pack_m').checked;

    const newCar = {
      name: name,
      image: image,
      description: description,
      seriesId: seriesId,
      pack_m: packM
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCar)
      });

      if (response.ok) {
        const createdCar = await response.json();
        const carModel = new CarModelComponent(createdCar);
        dataContainer.appendChild(carModel.render());
        form.reset();
      } else {
        console.error('Error creating car:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });


  dataContainer.addEventListener('click', async (event) => {
    if (event.target && event.target.tagName === 'BUTTON' && event.target.classList.contains('delete-btn')) {
      const carId = event.target.id;
      const seriesId = event.target.dataset.seriesId; // Utilitza dataset per obtenir l'atribut seriesId
      
      try {
        const deleteResponse = await fetch(`${apiUrl}/series/${seriesId}/cars/${carId}`, {
          method: 'DELETE'
        });

        if (deleteResponse.ok) {
          // Eliminar el model de cotxe del DOM
          event.target.parentNode.remove();
        } else {
          console.error('Error eliminant el cotxe:', deleteResponse.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  });

});
  