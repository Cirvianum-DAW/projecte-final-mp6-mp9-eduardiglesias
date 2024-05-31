class CarModelComponent {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.image = data.image;
    this.description = data.description;
    this.packM = data.pack_m;
    this.seriesId = data.seriesId;
  }

  render() {
    const itemElement = document.createElement("div");
    itemElement.className =
      "max-w-sm bg-white border rounded-lg overflow-hidden m-4 shadow-md";

    itemElement.innerHTML = `
        <h2 class="text-xl font-bold p-4">${this.name}</h2>
          <img src="${this.image}.jpg" class="w-full h-48 object-cover">
        <p class="p-4 hidden md:block">${this.description}</p>
      `;

    if (this.packM) {
      const packMText = document.createElement("p");
      packMText.textContent = "Aquest model té el pack M!";
      packMText.className = "text-lg p-4 hidden md:block text-red-500 font-semibold";
      itemElement.appendChild(packMText);
    }

    const editButton = document.createElement("button");
    editButton.textContent = "Editar";
    editButton.className = "edit-btn bg-blue-500 text-white px-4 py-2 rounded-lg mr-2 ml-4 mb-4";
    editButton.id = `${this.id}`;
    editButton.dataset.seriesId = this.seriesId;
    itemElement.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.className = "delete-btn bg-red-500 text-white px-4 py-2 rounded-lg ml-4 mb-4";
    deleteButton.id = `${this.id}`;
    deleteButton.dataset.seriesId = this.seriesId;
    itemElement.appendChild(deleteButton);


    return itemElement;
}

renderEditForm(seriesData) {
  const form = document.createElement('form');
  form.className = 'bg-white border rounded-lg overflow-hidden m-4 shadow-md';
  form.id = `edit-form-${this.id}`;
  form.innerHTML = `
  <div id="form-container" class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
    <form id="car-form" class="space-y-6">
      <div class="p-4 flex items-center"> <!-- Utilitzem la classe flex i items-center per alinear verticalment els elements -->
        <label for="name" class="block w-1/4">Nom</label> <!-- Utilitzem la classe w-1/4 per fixar la mida del label -->
        <input type="text" id="name" name="name" class="w-full p-4 border rounded-lg" value="${this.name}">
      </div>
      <div class="p-4 flex items-center">
        <label for="image" class="block w-1/4">Imatge</label>
        <input type="text" id="image" name="image" class="w-full p-4 border rounded-lg" value="${this.image}">
      </div>
      <div class="p-4 flex items-center">
        <label for="description" class="block w-1/4">Descripció</label>
        <textarea id="description" name="description" class="w-full p-4 border rounded-lg">${this.description}</textarea>
      </div>
      <div class="p-4 flex items-center">
        <label for="series" class="block w-1/4">Sèrie</label>
        <select id="series" name="series" class="w-full p-4">
          ${seriesData.map(series => `<option value="${series.id}" ${series.id === this.seriesId ? 'selected' : ''}>${series.name}</option>`).join('')}
        </select>
      </div>
      <div class="p-4 flex items-center"> <!-- Utilitzem la classe flex i items-center per alinear verticalment els elements -->
        <label for="pack_m" class="block w-1/4">Pack M</label> <!-- Utilitzem la classe w-1/4 per fixar la mida del label -->
        <input type="checkbox" id="pack_m" name="pack_m" class="p-4" ${this.packM ? 'checked' : ''}>
      </div>
      <input type="hidden" id="series" name="series" value="${this.seriesId}">
      <div class="p-4 flex justify-center"> <!-- Utilitzem la classe flex i justify-center per centrar horitzontalment els elements -->
        <button type="submit" class="save-btn bg-blue-500 text-white px-4 py-2 rounded-lg m-4">Desar</button>
        <button type="submit" class="cancel-btn bg-red-500 text-white px-4 py-2 rounded-lg m-4 cancel-btn">Cancel·lar</button>
      </div>
    </form>
  </div>
  `;
  // Afegeix un gestor d'esdeveniments al botó "Desar"
  form.querySelector('.save-btn').addEventListener('click', async (event) => {
    event.preventDefault();
    const dataContainer = document.getElementById('data-container');

    const newName = form.querySelector('#name').value;
    const newImage = form.querySelector('#image').value;
    const newDescription = form.querySelector('#description').value;
    const newSeriesId = form.querySelector('#series').value;
    const newPackM = form.querySelector('#pack_m').checked;

    const nameInput = form.querySelector('#name');
    const imageInput = form.querySelector('#image');
    const descriptionInput = form.querySelector('#description');

    if (nameInput.value.length > 15 || nameInput.value.length === 0) {
      alert('El nom no pot ser més llarg de 15 caràcters i no pot estar buit.');
      return;
    }

    if (imageInput.value.length > 0) {
      if (!/^\d+$/.test(imageInput.value)) {
        alert('El nom de la imatge ha de ser un número.');
        return;
      }
    }

    if (descriptionInput.value.length > 80 || descriptionInput.value.length === 0) {
      alert('La descripció no pot ser més llarga de 80 caràcters i no pot estar buida.');
      return;
    }

    const updatedCarData = {
      name: newName,
      image: newImage,
      description: newDescription,
      seriesId: newSeriesId,
      pack_m: newPackM
    };

    try {
      const putResponse = await fetch(`https://664cbd3fede9a2b556516ae6.mockapi.io/api/series/${newSeriesId}/cars/${this.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedCarData)
      });

      if (putResponse.ok) {
        const updatedCar = await putResponse.json();
        const updatedCarModel = new CarModelComponent(updatedCar);
        alert('Dades del cotxe actualitzades correctament!');
        dataContainer.replaceChild(updatedCarModel.render(), form);
      } else {
        console.error('Error actualitzant les dades del cotxe:', putResponse.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });

  // Afegeix un gestor d'esdeveniments al botó "Cancel·lar"
  form.querySelector('.cancel-btn').addEventListener('click', () => {
    dataContainer.replaceChild(updatedCarModel.render(), form);
  });

  return form;
}
}
