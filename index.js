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
    categories.forEach(category => {
        categoryContainer.innerHTML+=`
          <li id="${category.id}" class="hover:bg-[rgba(21,128,61,1)] hover:text-white hover:p-2 hover:rounded-md">${category.category_name}</li>
        `
    });
}
categoryContainer.addEventListener('click', (e)=>{
    console.log(e.target)
    const allLi = document.querySelectorAll('li')
    allLi.forEach(li=>{
       li.classList.remove(
        "hover:bg-[rgba(21,128,61,1)]",
        "hover:text-white",
        "hover:p-2",
        "hover:rounded-md"
    
        );
    });
  if(e.target.localName === 'li'){
    console.log(e.target.id);

    e.target.classList.add(
        "bg-[rgba(21,128,61,1)]",
        "text-white",
        "p-2",
        "rounded-md"
    );
}
   
})

loadCategory();