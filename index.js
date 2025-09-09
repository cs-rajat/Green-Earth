const categoryContainer = document.getElementById("categoryContainer");
const cardContainer = document.getElementById("cardContainer");
const addToCard = document.getElementById("addToCard");
let cardCon = [];

const loader = document.createElement("div");
loader.innerHTML = `
  <div class="flex justify-center items-center w-full h-40">
    <div class="w-10 h-10 border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
  </div>
`;

const showLoader = (container) => {
  container.innerHTML = "";
  container.appendChild(loader);
};
const hideLoader = (container) => {
  loader.remove();
};

const loadCategory = () => {
  showLoader(categoryContainer);
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => {
      categoryContainer.innerHTML = "";
      showCategory(data.categories);
    })
    .catch((err) => {
      console.log(err);
      categoryContainer.innerHTML = `<p class="text-red-500">Failed to load categories.</p>`;
    });
};

const showCategory = (categories) => {
  categories.forEach((cat) => {
    categoryContainer.innerHTML += `
      <li id="${cat.id}" class="hover:bg-[rgba(21,128,61,1)] hover:text-white p-2 rounded-md cursor-pointer">${cat.category_name}</li>
    `;
  });
  categoryContainer.addEventListener("click", (e) => {
    const allLI = document.querySelectorAll("li");
    allLI.forEach((li) => {
      li.classList.remove("bg-[rgba(21,128,61,1)]", "text-white");
    });

    if (e.target.localName === "li") {
      e.target.classList.add("bg-[rgba(21,128,61,1)]", "text-white");
      loadPlantsByCategory(e.target.id);
    }
  });
};

const loadPlantsByCategory = (id) => {
  showLoader(cardContainer);
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      hideLoader(cardContainer);
      showPlantsByCategory(data.plants);
    })
    .catch((err) => {
      console.log(err);
      cardContainer.innerHTML = `<p class="text-red-500">Failed to load plants.</p>`;
    });
};

const loadAllPlants = () => {
  showLoader(cardContainer);
  fetch(`https://openapi.programming-hero.com/api/plants`)
    .then((res) => res.json())
    .then((data) => {
      hideLoader(cardContainer);
      showPlantsByCategory(data.plants);
    })
    .catch((err) => {
      console.log(err);
      cardContainer.innerHTML = `<p class="text-red-500">Failed to load plants.</p>`;
    });
};

const showPlantsByCategory = (plants) => {
  console.log(plants)
  cardContainer.innerHTML = "";
  plants.forEach((plant) => {
    cardContainer.innerHTML += `
      <div class="bg-white rounded-2xl shadow-lg p-3 hover:shadow-2xl flex flex-col">
        <div class="w-full h-48 overflow-hidden rounded-xl">
          <img class="w-full h-full object-cover" 
               src="${plant.image}" alt="">
        </div>
        <div class="flex flex-col flex-grow justify-between mt-3">
          <div id="${plant.id}">
            <h1 onclick="handleViewDetails('${plant.id}')" class="text-xl font-semibold text-gray-800">${plant.name}</h1>
            <p class="text-gray-600 text-sm mt-1 min-h-[60px]">
              ${plant.description}
            </p>
          </div>
          <div class="flex justify-between items-center mt-3">
            <p class="bg-green-100 px-3 py-1 text-sm font-medium text-[#00742b] rounded-3xl">${plant.category}</p>
            <p class="text-lg font-semibold text-green-500 flex items-center gap-1">
              <i class="fa-solid fa-bangladeshi-taka-sign text-xs"></i>
              <span id="price">${plant.price}</span>
            </p>
          </div>
        </div>
        <button class="w-full btn bg-[#17a14a] hover:bg-[#15803d] border-none shadow-none mt-4 rounded-3xl text-white font-medium py-2">
          Add to Cart
        </button>
      </div>
    `;
  });
};

cardContainer.addEventListener("click", (e) => {
  if (e.target.innerText === "Add to Cart") {
    handleCardCon(e);
  }
});

const handleCardCon = (e) => {
  const card = e.target.parentNode;
  const title = card.querySelector("h1").innerText;
  const idDiv = card.querySelector("div[id]");
  const id = idDiv.id;
  const price = parseFloat(card.querySelector("#price").innerText);

  let exist = cardCon.find((item) => item.id === id);
  if (exist) {
    exist.quantity += 1;
  } else {
    cardCon.push({
      title: title,
      price: price,
      id: id,
      quantity: 1,
    });
  }
  showCardCon(cardCon);
};

const showCardCon = (cards) => {
  addToCard.innerHTML = "";
  let total = 0;

  cards.forEach((card) => {
    total += card.price * card.quantity;

    addToCard.innerHTML += `
      <div class="flex justify-between items-center rounded-lg bg-green-50 p-2 mt-2">
        <div class="space-y-1">
          <h2 class="font-semibold">${card.title}</h2>
          <p class="text-gray-400"> 
            <i class="fa-solid fa-bangladeshi-taka-sign text-xs"></i>
            <span>${card.price}</span> x <span>${card.quantity}</span>
          </p>
        </div>
        <p onclick="handleDeleteCard('${card.id}')" class="text-gray-500 cursor-pointer">X</p>
      </div>
    `;
  });

  addToCard.innerHTML += `
    <div class="flex justify-between items-center border-t mt-3 pt-2">
      <h2 class="font-semibold">Total:</h2>
      <p class="font-semibold text-green-600 flex items-center gap-1">
        <i class="fa-solid fa-bangladeshi-taka-sign text-xs"></i>${total}
      </p>
    </div>
  `;
};

const handleDeleteCard = (cardId) => {
  let item = cardCon.find((card) => card.id === cardId);

  if (item) {
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      cardCon = cardCon.filter((card) => card.id !== cardId);
    }
  }

  showCardCon(cardCon);
};

const handleViewDetails = (id) => {
  fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then((res) => res.json())
    .then((data) => {
      const plant = data.plants;
      if (!plant) return console.log("No plant data found!");
      showModal(plant);
    })
    .catch((err) => {
      console.log(err);
    });
};


const showModal = (plant) => {
  const modalContent = document.getElementById("modalContent");

  modalContent.innerHTML = `
    <div class="space-y-3">
      <h2 class="text-xl font-bold text-gray-800">${plant.name}</h2>
      <img src="${plant.image}" alt="${plant.name}" class="w-full h-70 object-cover rounded-lg"/>   
      <p class="text-green-600 font-medium">Category: ${plant.category}</p>
      <p class="text-lg font-semibold text-green-500 flex items-center gap-1">Price:
        <i class="fa-solid fa-bangladeshi-taka-sign text-xs"></i>${plant.price}
      </p>   
      <p class="text-gray-600"><span class="font-bold text-black">Description:</span>${plant.description}</p>         
    </div>
  `;
  document.getElementById("my_modal_1").checked = true;
};
  
  


loadCategory();
loadAllPlants();
