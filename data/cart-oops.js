function Cart(localStorageKey){
    const cart = {
        cartItem:undefined,
        loadFromStorage(){
            this.cartItem=JSON.parse(localStorage.getItem(localStorageKey));
            if(!this.cartItem){
                this.cartItem=[
                    {
                        productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
                        quantity:2,
                        deliveryOptionId:'1'
                    }
                ];
            };
        },
        saveToStorage:function (){
            localStorage.setItem(localStorageKey,JSON.stringify(this.cartItem));
        },
        addToCart:function(productId){
            let matchingitem;
                this.cartItem.forEach((item)=>{
                    if(item.productId === productId){
                        matchingitem=item;
                    }
                })
                if(matchingitem){
                    matchingitem.quantity += 1;
                }
                else{
                    this.cartItem.push({
                        productId : productId,
                        quantity:1
                    })
                }
            this.saveToStorage();
        },
        removeFromCart:function(deleteItem){
            let newArray = [];
            this.cartItem.forEach((items)=>{
                if(items.productId !== deleteItem){
                    newArray.push(items)
                }
            });
            console.log(newArray)
            cart = newArray;
            this.saveToStorage();
        },
        updateDeliveryOption:function(productId,deliveryOptionId){
            let matchingitem;
            cart.forEach((item)=>{
                if(item.productId === productId){
                    matchingitem=item;
                }
            });
            matchingitem.deliveryOptionId = deliveryOptionId;
            this.saveToStorage();
        }
    
    }
    return cart;
}
const cart = Cart('cart-oop');
const bussinessCart = Cart('cart-bussiness')
cart.loadFromStorage();
bussinessCart.loadFromStorage();
console.log(cart);
console.log(bussinessCart);
