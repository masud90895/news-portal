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
        const {category_name,category_id} =category;
        const categoriesDiv =document.createElement('li');
        categoriesDiv.classList.add("font-semibold");
        categoriesDiv.innerHTML=`
        <a onclick="loadCard(${category_id})">${category_name}</a>
        `;
        categoryContainer.appendChild(categoriesDiv)
        
    });
}

// card section 
const loadCard =async(id) =>{

    const url =`https://openapi.programming-hero.com/api/news/category/0${id}`
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
     
    const cardSection = document.getElementById('card-section');
    cardSection.textContent =""
    // founded msg 
    const foundedMessege = document.getElementById('founded-msg');
    foundedMessege.classList.remove('hidden')

    
    // founded-text
    const fountText = document.getElementById('founded-text')
    fountText.innerText = cards.length;


    // speener 
    const speenerContainer = document.getElementById('speener-container');
    speenerContainer.classList.remove('hidden');
    // console.log(speenerContainer);
    cards.forEach(card => {


        const {image_url,thumbnail_url,title,details,author,total_view,} = card;
        const {name,published_date,img} =author;

        // card section html 

        const cardSectionDiv =document.createElement("div");

            // speener 
        const speenerContainer = document.getElementById('speener-container');
    speenerContainer.classList.add('hidden');


        cardSectionDiv.classList.add("card", "card-side", "bg-base-100", "shadow-xl", "p-4", "mb-5")
        cardSectionDiv.innerHTML =`
                    <figure class="w-1/4"><img src="${thumbnail_url}" alt="Movie"></figure>
                    <div class="card-body w-3/4">
                      <h2 class="card-title">${title}</h2>
                      <p>${details.length > 400 ? details.slice(0,400) + " ....." : details}</p>
                      <div class="card-actions justify-between items-center">                   
                        <div class="flex">
                            <div class="mr-3">
                                <img class="w-[40px] rounded-full" src="${img ? img : "img not found"}" alt="">
                            </div>
                            <div >
                                <h4 class="font-bold text-xl">${name ? name : "name not found"}</h4>
                            <h5>${published_date ? published_date : "published date not found"}</h5>
                            </div>
                        </div>
                
                        <div class="flex" >
                           <div>
                            <img src="img/icons8-eye-24.png" alt="">
                           </div>
                                <div class="flex ml-3 items-center">
                                    <h1><span>${total_view ? total_view : "no views"}</span> M</h1> 
                                </div>                                                      
                        </div>

                         <div class="text-yellow-500">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star-half-stroke"></i>
                         </div>

                         <div class="card-actions justify-end">
                         <label for="my-modal-4" class="btn btn-primary modal-button" onclick="modal('${card.image_url}', '${card.author.name}')"><i class="fa-solid fa-arrow-right"></i></label>
                       </div>
                                        
                      </div>
                    </div>
                  
        `
        cardSection.appendChild(cardSectionDiv)
        
    });
}

const modal =(image,author) =>{
    console.log(image);
    console.log(author);
    const modalBody =document.getElementById('modal-body');
    modalBody.textContent = "";
    modalBody.innerHTML =`
    <p>${author}</p>
    <img src="${image}"/>
    
    `
}




// card section call 
// loadCard("1")


// loadCategory call 
loadCategory()