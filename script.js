const search = document.querySelector("#search-box");
const searchButton = document.querySelector("#search-btn");
const clearButton = document.querySelector("#clr");
const searchResult = document.querySelector("#search-result");


clearButton.addEventListener("click",function(){
    searchResult.innerHTML = "";
})

search.addEventListener("input",function(event){
    const searchText = event.target.value;
    getSearchResultFromApi(searchText);
})

async function getSearchResultFromApi(search){
    try{
        const rawApiData = await fetch("https://dummyjson.com/products/search?q="+search);
        const finalApiData = await rawApiData.json();
        console.log(finalApiData.products);
        searchResult.innerHTML = "";
        finalApiData.products.forEach(function(product){
            searchResult.innerHTML += addSearchResultsToDom(product.images[0], product.title);
        });
    }
    catch(err){
        console.log("API giving problem");
    }
    
}


function addSearchResultsToDom(images,title){
    return `
    <div class="col-6 col-sm-12 col-md-6 col-lg-3 mb-3">
        <div class="card products-card mt-3">
            <img class="card-img-top" src=${images}>
            <div class="card-body d-md-flex justify-content-between text-center">
                <h5 class="card-text">${title}</h5>
            </div>
        </div>
    </div>
    `;
}