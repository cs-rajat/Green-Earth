const categoryContainer = document.getElementById('categoryContainer')
const cardContainer = document.getElementById('cardContainer')

const loadCategory=()=>{
fetch('https://openapi.programming-hero.com/api/categories')
.then(res=>res.json())
.then(data=>showCategory(data.categories))

.catch((err) => {
      console.log(err);
    });
}
const showCategory =(categories)=>{
    // console.log(categories)
    categories.forEach(cat => {
        categoryContainer.innerHTML+=`
          <li id="${cat.id}" class="hover:bg-[rgba(21,128,61,1)] hover:text-white p-2 rounded-md cursor-pointer">${cat.category_name}</li>
        `
    });
  categoryContainer.addEventListener('click', (e)=>{
     
    const allLI= document.querySelectorAll('li')
    // console.log(allLI)
    allLI.forEach(li=>{
      li.classList.remove("bg-[rgba(21,128,61,1)]", "text-white")
    })

     if(e.target.localName==='li'){
      // console.log(e.target.id)
      e.target.classList.add("bg-[rgba(21,128,61,1)]", "text-white")
      loadPlantsByCategory(e.target.id)
     }
  })

};


const loadPlantsByCategory = (id) =>{
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
  
  .then(res=>res.json())
  .then(data=> showPlantsByCategory(data.plants))

  .catch((err) => {
      console.log(err);
    });

}
const loadAllPlants = () => {
  fetch(`https://openapi.programming-hero.com/api/plants`)
    .then(res => res.json())
    .then(data => showPlantsByCategory(data.plants))
    .catch((err) => {
      console.log(err);
    });
}



const showPlantsByCategory = (plants) =>{
    console.log(plants)
    cardContainer.innerHTML=""
    plants.forEach(plant=> {
      cardContainer.innerHTML+=`

      <div class="bg-white rounded-2xl shadow-lg p-3 hover:shadow-2xl flex flex-col">

           <div class="w-full h-48 overflow-hidden rounded-xl">
             <img class="w-full h-full object-cover" 
                  src="${plant.image}" alt="">
           </div>
         
           <div class="flex flex-col flex-grow justify-between mt-3">
             <div>
               <h1 class="text-xl font-semibold text-gray-800">${plant.name}</h1>
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
      
   `
    })

}


loadCategory();
loadAllPlants();
