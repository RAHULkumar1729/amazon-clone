class Cart{
    cartItem;
    #localStorageKey;
    constructor(localStorageKey){
        this.#localStorageKey=localStorageKey;
        this.#loadFromStorage();
    }
    #loadFromStorage(){
        this.cartItem=JSON.parse(localStorage.getItem(this.#localStorageKey));
        if(!this.cartItem){
            this.cartItem=[
                {
                    productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
                    quantity:2,
                    deliveryOptionId:'1'
                }
            ];
        };
    }
    saveToStorage(){
        localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItem));
    }
    addToCart(productId){
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
    }
    removeFromCart(deleteItem){
        let newArray = [];
        this.cartItem.forEach((items)=>{
            if(items.productId !== deleteItem){
                newArray.push(items)
            }
        });
        console.log(newArray)
        cart = newArray;
        this.saveToStorage();
    }
    updateDeliveryOption(productId,deliveryOptionId){
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

const cart = new Cart('cart-oops');
console.log(cart);

