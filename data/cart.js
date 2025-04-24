export let cart=JSON.parse(localStorage.getItem('cart'));
if(!cart){
    cart=[
        {
            productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity:2,
            deliveryOptionId:'1'
        }
    ]
}

function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}
export function addToCart(productId){
    let matchingitem;
        cart.forEach((item)=>{
            if(item.productId === productId){
                matchingitem=item;
            }
        })
        if(matchingitem){
            matchingitem.quantity += 1;
        }
        else{
            cart.push({
                productId : productId,
                quantity:1
            })
        }
    saveToStorage();
}
export function removeFromCart(deleteItem){
    let newArray = [];
    cart.forEach((items)=>{
        if(items.productId !== deleteItem){
            newArray.push(items)
        }
    });
    console.log(newArray)
    cart = newArray;
    saveToStorage();
}

 export function updateDeliveryOption(productId,deliveryOptionId){
    let matchingitem;
    cart.forEach((item)=>{
        if(item.productId === productId){
            matchingitem=item;
        }
    });
    matchingitem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
}