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
    const categoryContainer =document.getElementById('catagory-container');
    data.forEach(category => {
        const {category_name} =category;
        const categoriesDiv =document.createElement('li');
        categoriesDiv.classList.add("font-semibold");
        categoriesDiv.innerHTML=`
        <a>${category_name}</a>
        `;
        categoryContainer.appendChild(categoriesDiv)
        
    });
}

// card section 

const loadCard =async() =>{
    const url ="https://openapi.programming-hero.com/api/news/category/01"
   try{
    const res =await fetch (url)
    const data = await res.json()
    displayCard(data.data)
   }
   catch(error){
    console.log(error);
   }   
}


const displayCard =(cards) =>{
    console.log(cards);
    const cardSection = document.getElementById('card-section');
    cards.forEach(card => {
        const {image_url,thumbnail_url,title,details,author,total_view,} = card;
        const {name,published_date,img} =author;

        // card section html 

        const cardSectionDiv =document.createElement("div");
        cardSectionDiv.classList.add("card", "card-side", "bg-base-100", "shadow-xl", "p-4", "mb-5")
        cardSectionDiv.innerHTML =`
                    <figure class="w-1/4"><img src="${thumbnail_url}" alt="Movie"></figure>
                    <div class="card-body w-3/4">
                      <h2 class="card-title">${title}</h2>
                      <p>${details.length > 400 ? details.slice(0,400) + " ....." : details}</p>
                      <div class="card-actions justify-end">
                        <button class="btn btn-primary">Watch</button>
                      </div>
                    </div>
                  
        `
        cardSection.appendChild(cardSectionDiv)
        
    });
}


// card section call 
loadCard()


// loadCategory call 
loadCategory()