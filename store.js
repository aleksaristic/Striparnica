if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready(){



    var removeCartButtons = document.getElementsByClassName('danger-btn')

    for(var i = 0; i<removeCartButtons.length; i++){
        var button = removeCartButtons[i]
        button.addEventListener('click', function(event){
            var buttonClicked = event.target
            buttonClicked.parentElement.parentElement.remove()
            updateTotalMoney()
        })
    }

    var quantityChange = document.getElementsByClassName('input-kolicina')

    for(var i = 0; i<quantityChange.length; i++){
        var input = quantityChange[i]
        input.addEventListener('change', function(event){
            var quantityChanged = event.target
            updateTotalMoney()
        })
    }

    var addToCartButtons = document.getElementsByClassName('buy-btn')

    for(var i=0; i<addToCartButtons.length; i++){
        var adder = addToCartButtons[i]
        adder.addEventListener('click', function(event){
            var addBtn = event.target
            var shopItem = addBtn.parentElement.parentElement
            var title = shopItem.getElementsByClassName('comic-title')[0].innerText
            var price = shopItem.getElementsByClassName('comic-price')[0].innerText
            var imgSrc = shopItem.getElementsByClassName('comic-img')[0].src
            console.log(title)
            addItemToCart(title, price, imgSrc)
            updateTotalMoney()
        })
    }

    document.getElementsByClassName('purchase-btn')[0].addEventListener('click', function(){
        alert('Hvala na kupovini!')
        var cartItems = document.getElementsByClassName('cart-items')[0]
        while(cartItems.hasChildNodes()){
            cartItems.removeChild(cartItems.firstChild)
        }
        updateTotalMoney()
    })

    function addItemToCart(title, price, imgSrc){
        var cartRow = document.createElement('div')
        cartRow.classList.add('cart-item')
        var cartItems = document.getElementsByClassName('cart-items')[0]
        var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
        for(var i=0; i<cartItemNames.length; i++){
            if(cartItemNames[i].innerText == title){
                alert('Ovaj proizvod je vec dodat u korpu.')
                return
            }
        }
        var cartRowContent = `
        <div class="proizvod">
            <img src="${imgSrc}">
            <span>${title}</span>
        </div>
        <div class="cijena">
            <span class="price">${price}</span>
        </div>

        <div class="kolicina">
            <input class="input-kolicina" type="number" value="1" min="1">
            <button class="danger-btn" type="button">Ukloni</button>
        </div>`
        cartRow.innerHTML = cartRowContent
        cartItems.appendChild(cartRow)
        cartRow.getElementsByClassName('danger-btn')[0].addEventListener('click', function(event){
            var buttonClicked = event.target
            buttonClicked.parentElement.parentElement.remove()
            updateTotalMoney()
        })
        cartRow.getElementsByClassName('input-kolicina')[0].addEventListener('change', function(event){
            var quantityChanged = event.target
            updateTotalMoney()
        })
    }

    function updateTotalMoney(){
        var container = document.getElementsByClassName('cart-items')[0]
        var cartItems = container.getElementsByClassName('cart-item')
        var total = 0
        for(var i=0; i<cartItems.length; i++){
            var cartItem = cartItems[i]
            var priceElement = cartItem.getElementsByClassName('price')[0]
            var quantityElement = cartItem.getElementsByClassName('input-kolicina')[0]
            var price = parseFloat(priceElement.innerText.replace('KM',''))
            var quantity = quantityElement.value;
            total = total + (price * quantity)
        }
        total = Math.round(total * 100) / 100
        document.getElementsByClassName('ukupna-cijena')[0].innerText = total + ' KM'
        document.getElementsByClassName('ukupna-cijena')[1].innerText = total + ' KM'
        document.getElementsByClassName('ukupna-cijena')[3].innerText = total + ' KM'
        document.getElementsByClassName('ukupna-cijena')[4].innerText = total + ' KM'
    }
}