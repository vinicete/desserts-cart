const grid = document.querySelector('#desserts_content')

cart = []

fetch("../data.json").then((response)=>{
    response.json().then((dados)=>{
        //console.log(dados)
        dados.map(element => {
            grid.innerHTML += `  
        <div class="dessert-item">
          <div class="dessert-img">
            <img src="${element.image.desktop}" alt="">
          </div>
          
          <button class="dessert-btn">
            <i class="fa-solid fa-cart-plus"></i>
            <span>Add to Cart</span>
          </button>


          <div class="dessert-info">
            <span class="dessert-title">${element.category}</span>
            <p class="dessert-name">${element.name}</p>
            <p class="dessert-price">${element.price}</p>
          </div>

        </div>`
        });
    })

})






