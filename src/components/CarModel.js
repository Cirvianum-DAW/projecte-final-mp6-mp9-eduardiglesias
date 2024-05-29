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

    // Afegim el text 'PACKM' si packM és true
    if (this.packM) {
      const packMText = document.createElement("p");
      packMText.textContent = "Aquest model té el pack M!";
      packMText.className = "text-lg p-4 hidden md:block text-red-500 font-semibold";
      itemElement.appendChild(packMText);
    }

    const editButton = document.createElement("button");
    editButton.textContent = "Editar";
    editButton.className = "bg-blue-500 text-white px-4 py-2 rounded-lg mr-2 ml-4 mb-4";
    // Assignem un identificador únic a cada botó d'editar
    editButton.id = `edit-${this.id}`;
    itemElement.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.className = "delete-btn bg-red-500 text-white px-4 py-2 rounded-lg ml-4 mb-4";
    // Assignem un identificador únic a cada botó d'eliminar
    deleteButton.id = `${this.id}`;
    deleteButton.dataset.seriesId = this.seriesId; // Afegim l'atribut dataset amb l'ID de la sèrie
    itemElement.appendChild(deleteButton);


    return itemElement;
}
}
