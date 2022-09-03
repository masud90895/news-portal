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
        categoriesDiv.classList.add("font-semibold","mx-auto");
        categoriesDiv.innerHTML=`
        <a onclick="loadCard(${category_id})">${category_name}</a>
        `;
        categoryContainer.appendChild(categoriesDiv)
        
    });
}

// card section 
const loadCard =async(id) =>{
    // speener 
    const speenerContainer = document.getElementById('speener-container');
    speenerContainer.classList.remove('hidden');

    
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
 
    if(cards.length === 0){
        const speenerContainer = document.getElementById('speener-container');
        speenerContainer.classList.add('hidden');
 }

  
    // sort 

    const sortFind = cards.sort((x,y)=>{
        if(x.total_view < y.total_view){
            return 1;
        }
        else{
            return -1;
        }
    })
    // console.log(sortFind);

    cards.forEach(card => {
        
        const {image_url,thumbnail_url,title,details,author,total_view,} = card;
        const {name,published_date,img} =author; 
        // card section html 

        const cardSectionDiv =document.createElement("div");

            // speener 
        const speenerContainer = document.getElementById('speener-container');
    speenerContainer.classList.add('hidden');
         
   

        cardSectionDiv.classList.add("card", "lg:card-side", "bg-base-100", "shadow-xl", "lg:p-4", "mb-5" ,"w-11/12","lg:w-full","mx-auto")
        cardSectionDiv.innerHTML =`
                    <img src="${thumbnail_url}" alt="Movie">
                    <div class="card-body lg:w-3/4">
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
                         <label for="my-modal-4" class="btn bg-blue-600 modal-button" onclick="modal('${card._id}')"><i class="fa-solid fa-arrow-right"></i></label>
                       </div>
                                        
                      </div>
                    </div>
                  
        `
        cardSection.appendChild(cardSectionDiv)
        
    });
    
}

const modal =async id =>{
    const url =`https://openapi.programming-hero.com/api/news/${id}`
    let data ={};
   try{
    const res =await fetch (url)
    data = await res.json()
    // displayCard(data.data)
   }
   catch(error){
    console.log(error);
   }  

   const {author,title,details,image_url,total_view} = data.data[0];
 
    const modalBody =document.getElementById('modal-body');
    modalBody.textContent = "";
    modalBody.innerHTML =`
    <img src="${image_url}" alt="">
    <h2 class="mb-3 text-2xl font-bold">${title? title  : "data not found"}</h2>
    <p class="mb-3">${details ? details : 'details not found'}</p>
    <div class="card-actions justify-between items-center">                   
    <div class="flex">
        <div class="mr-3">
            <img class="w-[40px] rounded-full" src="${author.img ? author.img : "img not found"}" alt="">
        </div>
        <div >
            <h4 class="font-bold text-xl">${author.name ? author.name : "name not found"}</h4>
        <h5>${author.published_date ? author.published_date : "published date not found"}</h5>
        </div>
    </div>

    <div class="flex" >
       <div>
        <img src="img/icons8-eye-24.png" alt="">
       </div>
            <div class="flex ml-3 items-center">
                <h1><span>${total_view ?total_view : "no views"}</span> M</h1> 
            </div>                                                      
    </div>
  </div>
    
    `
} 

// card section call 
loadCard("1")


// loadCategory call 
loadCategory()