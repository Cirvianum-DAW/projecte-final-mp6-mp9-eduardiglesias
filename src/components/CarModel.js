class CarModelComponent {
  constructor(data) {
    this.name = data.name;
    this.image = data.image;
    this.description = data.description;
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

    return itemElement;
  }
}
