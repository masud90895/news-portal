// loadCategory 
const loadCategory =async() =>{
    const url ="https://openapi.programming-hero.com/api/news/categories"
   try{
    const res =await fetch (url)
    const data = await res.json()
    displayCategory(data.data.news_category)
   }
   catch(error){
    console.log(error);
   }   
}


const displayCategory= async (data)=>{
    data.forEach(category => {
        const {category_name} =category;
        const categoryContainer =document.getElementById('catagory-container');
        const categoriesDiv =document.createElement('li');
        categoriesDiv.classList.add("font-semibold");
        categoriesDiv.innerHTML=`
        <a>${category_name}</a>
        `;
        categoryContainer.appendChild(categoriesDiv)
        
    });
}


// loadCategory call 
loadCategory()