products = [];

if (window.localStorage.getItem('products')) {
    products = JSON.parse(window.localStorage.getItem('products'));
}
if (products.length > 0) {
    let items = products.length
    for (let i = 0; i < products.length; i++) {
        let image = $('<img>').attr("src", products[i].photo).addClass("productimage");
        let name = $('<p>').text('Name: ' + products[i].name);
        let description = $('<p>').text('Description: ' + products[i].description);
        let quantity = $('<p>').text('Quantity: ' + 1);
        let price = $('<p>').text('Price: ' + products[i].price + "BDT");
        let details = $('<button>').text('details').attr("id", "d" + i).addClass("productviewbtn");
        let addcart = $('<button>').text('Add to cart').attr("id", "p" + i).addClass("productviewbtn");
        //let addcart = $('<button>').text('Add to cart').attr("id", "p" + i).addClass("productviewbtn cart");
        let remove = $('<button>').text('Remove').attr("id", "r1" + i).addClass("productviewbtn");
        let div1 = $('<div>').append(name, price, details, addcart).css("text-align", "left").addClass("productview");
        let product = $('<div>').append(image, div1).addClass('eachproduct');
        $('#products').append(product)
        items++;

    }
}

//line 16 click function with classname for dynamicaaly created button
// $('.cart').click(function(event) {
//     console.log(event.target.id);
// })

//submit button on click
$('#submit').click(function() {
    let id = products.length
    let name = $('#name').val();
    let description = $('#description').val();
    let photo = $('#photoURL').val();
    let qty = 1;
    let price = $('#price').val();
    if (name && description && photo && qty && price) {
        let newproduct = {
            name: name,
            description: description,
            photo: photo,
            quantity: qty,
            price: price,
            p_id: id
        }
        products.push(newproduct);
        window.localStorage.setItem('products', JSON.stringify(products))
        alert(name + " added to home")
    } else {
        alert("All field must be filled")
    }
})


//cancel button on click
$('#cancel').click(function() {
    window.location.href = "add_products.html"
})



cart = [];

if (window.localStorage.getItem('cart')) {
    cart = JSON.parse(window.localStorage.getItem('cart'));
}
if (cart.length == 0) {
    $('#emptycart').show();
    $('#cartpage').hide();
} else {
    $('#cartpage').show();
    $('#emptycart').hide();
}


// if (cart.length == 0) { $('#itemno').hide() } else { $('#itemno').show() }
$('#itemno').text(cart.length)


if (cart.length > 0) {
    let total_price = 0;
    for (let i = 0; i < cart.length; i++) {
        let im = $('<img>').attr("src", cart[i].photo).addClass("im");
        let n = $('<p>').text('Name: ' + cart[i].name);
        let q = $('<input>').attr("type", "number").attr("id", "qq" + i);
        q.val(cart[i].quantity)
        let p = $('<p>').text('Price: ' + cart[i].price + "BDT");
        let r = $('<button>').text('Remove').attr("id", "r" + i).addClass("removebtn");
        let div1 = $('<div>').append(n, q, p, r).addClass("div1");
        let product1 = $('<div>').append(im, div1).addClass("eachcartproduct");
        $('.cart').append(product1);
    }
}

//add to cart button on click
let posi = 0;
$('#products').on("click", "button", function() {
    let c_items = cart.length;
    let cart_id = $(this).attr('id');
    //console.log(cart_id)
    var kw = new RegExp("p");
    if (kw.test(cart_id)) {
        let k = cart_id.split("")
        let check = false
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].p_id == products[k[1]].p_id) {
                check = true;
                posi = i;
                break;
            }
        }
        if (check == false) {
            cart[c_items] = products[k[1]];
            window.localStorage.setItem('cart', JSON.stringify(cart))
            c_items++;
        } else {
            let quantity = Number(cart[posi].quantity);
            quantity++;
            cart[posi].quantity = quantity;
            window.localStorage.setItem('cart', JSON.stringify(cart))
        }
        $('#itemno').text(cart.length)
    }
})

//remove button of cart
$('.cart').on("click", "button", function() {
    let p_id = $(this).attr('id');
    var kw = new RegExp("r");
    if (kw.test("r")) {
        let k = p_id.split("")
        console.log(p_id)
        console.log(k[1])
        cart.splice(k[1], 1)
        window.localStorage.setItem('cart', JSON.stringify(cart))
        window.location.href = "cart.html"
        $('#itemno').text(cart.length)
    }

})

//total price
$('.totalprice').click(function() {
    $('#tp').empty()
    let total_price = 0
    for (let i = 0; i < cart.length; i++) {
        total_price = total_price + (cart[i].price * $('#qq' + i).val())
    }
    console.log(total_price);
    let p = $('<p>').text(": " + total_price + " BDT")
    $('#tp').append(p)

})

//details button
let details = new Array(1);

if (window.localStorage.getItem('details')) {
    details = JSON.parse(window.localStorage.getItem('details'));
}

$('#products').on("click", "button", function() {
    //$('.details').empty();
    let detail_id = $(this).attr('id');
    //console.log(detail_id)
    var kw1 = new RegExp("d");
    if (kw1.test(detail_id)) {
        $('.details').show();
        //console.log("true")
        let l = detail_id.split("")
        details[0] = products[l[1]];
        window.localStorage.setItem('details', JSON.stringify(details))
        let d_image = $('<img>').attr("src", details[0].photo).addClass("detailsimage");
        let d_name = $('<p>').text('Name: ' + details[0].name);
        let d_description = $('<p>').text(details[0].description);
        let d_price = $('<p>').text('Price: ' + details[0].price + ' BDT');
        let d_cart = $('<button>').text("Add To Cart").attr("id", "d_cart." + details[0].p_id).addClass("d_backbutton")
        let back = $('<button>').text("Back").attr("id", "back").addClass("d_backbutton")
        let d_div = $('<div>').append(d_name, d_description, d_price, d_cart, back).addClass("d_div");
        // $('.details').append(d_image, d_div)
        $('.eachdetail').append(d_image, d_div);
        window.location.href = "index.html#d"
        console.log(details[0].p_id)
    }
    // window.location.href = "index.html#d"

})

//add to cart in details
$('.details').on("click", "button", function() {
    let c_items = cart.length
    let d_cart = $(this).attr('id');
    console.log(d_cart);
    var kw1 = new RegExp("d_cart");
    if (kw1.test(d_cart)) {
        console.log("hao")
        let k = d_cart.split(".")
        console.log(k[1])
        let check = false
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].p_id == products[k[1]].p_id) {
                check = true;
                posi = i;
                break;
            }
        }
        if (check == false) {
            cart[c_items] = products[k[1]];
            window.localStorage.setItem('cart', JSON.stringify(cart))
            c_items++;
        } else {
            let quantity = Number(cart[posi].quantity);
            quantity++;
            cart[posi].quantity = quantity;
            window.localStorage.setItem('cart', JSON.stringify(cart))
        }
        $('#itemno').text(cart.length)
    }

})

//back button on click
$('.details').on("click", "#back", function() {
    //$('.details').empty();
    window.location.href = "index.html"
        // $('.details').hide();
})