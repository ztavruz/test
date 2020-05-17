window.onload = function(){

    let pathToImageFolder = "../../assets/img/basket/";
    let deleteProductApi = "";

    let basket = [
        {
            "id": 1,
            "image": "cart-3.jpg",
            "name" :  "Dry Dog Food",
            "price": 110,
            "quantity": 2,
        },
        {
            "id": 2,
            "image": "cart-4.jpg",
            "name" :  "Cat Buffalo Food",
            "price": 150,
            "quantity": 2,
        },
        {
            "id": 3,
            "image": "cart-5.jpg",
            "name" :  "Legacy Dog Food",
            "price": 170,
            "quantity": 2,
        },

    ];

    let storageBasketExist = localStorage.getItem('basket');
    storageBasketExist = JSON.parse(storageBasketExist);


    if(storageBasketExist == null || storageBasketExist.length <= 0 ){
        let jsonBasket = JSON.stringify(basket);
        localStorage.setItem('basket', jsonBasket);
    }

    let storageBasket =  localStorage.getItem('basket');
    storageBasket = JSON.parse(storageBasket);

    let tbody             = document.querySelector('.tbody');
    let wrapper           = document.createElement("slot");

    storageBasket.forEach(element => {


        if(element != null)
        {
            let tr = document.createElement("tr");
            tr.setAttribute("id", element.id);

            let product_thumbnail = document.createElement("td");
            product_thumbnail.classList.add("product-thumbnail");
            let product_thumbnail__a = document.createElement("a");
            let product_thumbnail__img = document.createElement("img");
            product_thumbnail__img.setAttribute("src",pathToImageFolder + element.image);

            let product_name = document.createElement("td");
            product_name.classList.add("product-name");
            let product_name__a = document.createElement("a");
            product_name__a.setAttribute("href", "#");
            product_name__a.innerHTML = element.name;

            let product_price_cart = document.createElement("td");
            product_price_cart.classList.add("product-price-cart");
            let product_price_cart__span = document.createElement("span");
            product_price_cart__span.classList.add("amount");
            product_price_cart__span.innerHTML = "$"+element.price+".00";

            let product_quantity = document.createElement("td");
            product_quantity.classList.add("product-quantity");
            let cart_plus_minus = document.createElement("div");
            cart_plus_minus.classList.add("cart-plus-minus");
            let dec = document.createElement("div");
            dec.classList.add("dec");
            dec.classList.add("qtybutton");
            dec.innerHTML = "-";
            let cart_plus_minus_box = document.createElement("input");
            cart_plus_minus_box.classList.add("cart-plus-minus-box");
            cart_plus_minus_box.setAttribute("type", "text");
            cart_plus_minus_box.name = "qtybutton"
            cart_plus_minus_box.setAttribute("value", element.quantity);
            let inc = document.createElement("div");
            inc.classList.add("inc");
            inc.classList.add("qtybutton");
            inc.innerHTML = "+";

            dec.onclick = function(){
                element.quantity --;
                cart_plus_minus_box.setAttribute("value", element.quantity);
                let stringBasket = localStorage.getItem('basket');
                let basket = JSON.parse(stringBasket);
                basket[element.id - 1].quantity = element.quantity;
                let jsonBasket = JSON.stringify(basket);
                localStorage.setItem('basket', jsonBasket);
            }
            inc.onclick = function(){
                element.quantity ++;
                cart_plus_minus_box.setAttribute("value", element.quantity);
                let stringBasket = localStorage.getItem('basket');
                let basket = JSON.parse(stringBasket);
                basket[element.id - 1].quantity = element.quantity;
                let jsonBasket = JSON.stringify(basket);
                localStorage.setItem('basket', jsonBasket);
            }

            cart_plus_minus_box.setAttribute("readonly", "readonly");

            let product_subtotal = document.createElement("td");
            product_subtotal.classList.add("product-subtotal");
            product_subtotal.innerHTML = `${element.quantity * element.price}`;

            let product_remove = document.createElement("td");
            product_remove.classList.add("product-remove");
            let product_remove__a = document.createElement("a");
            product_remove__a.setAttribute("href", deleteProductApi);
            let product_remove__i = document.createElement("i");
            product_remove__i.classList.add("ti-trash");

            product_thumbnail.appendChild(product_thumbnail__a);
            product_thumbnail__a.appendChild(product_thumbnail__img);

            product_name.appendChild(product_name__a);

            product_price_cart.appendChild(product_price_cart__span);

            product_quantity.appendChild(cart_plus_minus);
            cart_plus_minus.appendChild(dec);
            cart_plus_minus.appendChild(cart_plus_minus_box);
            cart_plus_minus.appendChild(inc);

            product_remove.appendChild(product_remove__a);
            product_remove__a.appendChild(product_remove__i);

            tr.appendChild(product_thumbnail);
            tr.appendChild(product_name);
            tr.appendChild(product_price_cart);
            tr.appendChild(product_quantity);
            tr.appendChild(product_subtotal);
            tr.appendChild(product_remove);

            wrapper.appendChild(tr);
            tbody.appendChild(tr);

            product_remove__a.onclick = function(e)
            {
                e.preventDefault();

                let stringBasket = localStorage.getItem('basket');
                let basket = JSON.parse(stringBasket);
                delete basket[element.id - 1];

                // if(basket.length != 1)
                // {
                //     basket.splice(element.id - 1, 1);
                // }else{
                //     basket.splice(0, 1);
                // }
                let jsonBasket = JSON.stringify(basket);
                localStorage.setItem('basket', jsonBasket);

                let elem = document.getElementById(element.id);
                elem.parentNode.removeChild(elem);
            }

        }
        let stringBasket = localStorage.getItem('basket');
        let basket = JSON.parse(stringBasket);
        let empty = 0;
        basket.forEach(elem => {
            if(elem == null){
                empty ++;
            }
        })
        if(empty == basket.length){
            localStorage.setItem('basket', null);
            // document.location.href = "/basket";
        }

    });







}

