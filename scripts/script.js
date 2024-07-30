const grid = document.querySelector('#desserts_content')
const confirmBtn = document.querySelector('#cart_confirm_btn')
const modal = document.querySelector('#modal')
const newOrder = document.querySelector('#new_order_btn')
const cartResume = document.querySelector('.cart-resume')
const cartContent = document.querySelector('#empty_warn')

cart = []

fetch("../data.json").then((response)=>{
    response.json().then((dados)=>{
        //console.log(dados)
        dados.forEach(element => {
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


grid.addEventListener('click', function(event){

  if(event.target.closest('.dessert-btn')){

    const dessertItem =  event.target.closest('.dessert-item');

    const image = dessertItem.querySelector('.dessert-img img').src
    const title = dessertItem.querySelector('.dessert-title').innerText
    const name = dessertItem.querySelector('.dessert-name').innerText
    const price = dessertItem.querySelector('.dessert-price').innerText


    addToCart(image,title,name,price)

    


  }

})

function addToCart(image, title, name, price) {

  const existingItem = cart.find(element=> element.name === name)

  if(existingItem!=null){
    existingItem.quantity++


  }else{

    const item = {

      image: image,
      title: title,
      name: name,
      price: price,
      quantity: 1
    }

    cart.push(item)
  }

  updateCart()
}


function updateCart(){

  updateCartCount()

  
  
  const total = document.querySelector('.cart-total p')
  let auxTotal = 0

    cartContent.innerHTML = ''

    cart.forEach(item=>{

      auxTotal+= item.price*item.quantity

      cartContent.innerHTML += `
      
        <div class="cart-item">

            <div class="cart-item-info">
              <p class="cart-item-title">${item.title}</p>
              <div class="cart-item-info-values">
                <span>${item.quantity}x</span>
                <span class="sp-middle">@${item.price}</span>
                <span>R$${item.price*item.quantity}</span>
              </div>
            </div>

            <button class="remove-cart-btn">
              <img src="assets/images/icon-remove-item.svg" alt="">
            </button>

          </div>` 
    })

    
    cartResume.classList.remove('inactive')

    
    
    
    total.innerHTML = `${auxTotal.toLocaleString("pt-BR",{
      style: "currency",
      currency: "BRL"
    })}`
    
}


function updateCartCount(){
  const cartCont = document.querySelector('.cart-cont')


  let cont = 0

  cart.forEach(item => {
    cont += item.quantity
  })

  cartCont.innerHTML = `(${cont})`
  

}


confirmBtn.addEventListener('click', function(){

  const modal = document.querySelector('#modal')

  modal.classList.remove('inactive')

  updateModal()
})


function updateModal(){

  const modalItems = document.querySelector('.modal-cart-items')
  const modalTotal = document.querySelector('.modal-resume p')
  let total = 0
  modalItems.innerHTML = ''

  cart.forEach(item=>{
    total += item.price*item.quantity
    modalItems.innerHTML += `

          <div class="modal-cart-item">

            <div class="modal-cart-item-info">
              <img src="${item.image}" alt="">
              <div class="modal-cart-item-txt">
                <p class="cart-item-title">${item.name}</p>
                <div class="modal-cart-item-values">
                  <span>${item.quantity}</span>
                  <span>@R$${item.price}</span>
                </div>
              </div>
            </div>

            <div class="modal-cart-item-price">
              <span>R$${item.price*item.quantity}</span>
            </div>

          </div>`

    
  })

  
  modalTotal.innerHTML = `${total.toLocaleString("pt-BR",{
    style: "currency",
    currency: "BRL"
  })}`
}

modal.addEventListener('click', function(event){

  if(event.target == modal){
    modal.classList.add('inactive')
  }

  console.log
})


newOrder.addEventListener('click', function(event){

  if(event.target == newOrder){
    modal.classList.add('inactive')

    cart = []
    updateCart()

    cartResume.classList.add('inactive')

    cartContent.innerHTML = `
     <img src="assets/images/illustration-empty-cart.svg" alt="">
      <p class="empty-message">Your added items will appear here</p>
    `
  }
})








