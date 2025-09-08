const categoryContainer = document.getElementById('categoryContainer')

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
      console.log(e.target)
      e.target.classList.add("bg-[rgba(21,128,61,1)]", "text-white")
     }
  })

};

loadCategory();