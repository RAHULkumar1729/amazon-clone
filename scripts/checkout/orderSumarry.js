import { cart, updateDeliveryOption } from "../../data/cart.js";
import { getProduct} from "../../data/products.js";
import { removeFromCart } from "../../data/cart.js";
import { deliveryOption, getdeliveryOption } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";

export function renderOrderSummary(){
    let html = ``;
    const orderhtml = document.querySelector(".order-summary");
    cart.forEach((cartItem) => {
      let matchingProduct = getProduct(cartItem.productId);
      const deliveryOptionId= cartItem.deliveryOptionId;
      let deliveryOptions = getdeliveryOption(deliveryOptionId);
      console.log(deliveryOptions);
      const today = dayjs();
      const deliverydate = today.add(
        deliveryOptions.deliveryDays,
        'days'
      )
      const dateString = deliverydate.format('dddd, MMMM, D')

      html += `<div class="cart-item-container js-cart-item-continer-${matchingProduct.id}">
                <div class="delivery-date">
                  Delivery date: ${dateString}
                </div>

                <div class="cart-item-details-grid">
                  <img class="product-image"
                    src="${matchingProduct.image}">

                  <div class="cart-item-details">
                    <div class="product-name">
                    ${matchingProduct.name}  
                    </div>
                    <div class="product-price">
                      ${matchingProduct.getPrice()}
                    </div>
                    <div class="product-quantity">
                      <span>
                        Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                      </span>
                      <span class="update-quantity-link link-primary">
                        Update
                      </span>
                      <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                        Delete
                      </span>
                    </div>
                  </div>

                  <div class="delivery-options">
                    <div class="delivery-options-title">
                      Choose a delivery option:
                    </div>
                    ${deliveryOptionsHTML(matchingProduct,cartItem)}
                </div>
              </div>`;
    });
    orderhtml.innerHTML = html;
    document.querySelectorAll(".js-delete-link").forEach((link) => {
      link.addEventListener("click", () => {
        const productsIds = link.dataset.productId;
        removeFromCart(productsIds);
        const container = document.querySelector(
          `.js-cart-item-continer-${productsIds}`
        );
        container.remove();
        renderPaymentSummary();
        renderOrderSummary();
      });
    });

    function deliveryOptionsHTML(matchingProduct,cartItem){
      let html=``
    deliveryOption.forEach((deliveryOption) => {
      const today = dayjs();
      const deliverydate = today.add(
        deliveryOption.deliveryDays,
        'days'
      )
      const dateString = deliverydate.format('dddd, MMMM, D')
      const priceString = deliveryOption.priceCents === 0?'FREE':`$${(deliveryOption.priceCents/100).toFixed(2)}`;
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    html+= `
        <div class="delivery-option js-delivery-option" data-product-id=${matchingProduct.id} data-delivery-option-id=${deliveryOption.id}>
          <input type="radio"
            ${isChecked?'checked':''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                ${dateString}
              </div>
              <div class="delivery-option-price">
                ${priceString}- Shipping
              </div>
            </div>
          </div>
      `;
    });
    return html;
    }
    document.querySelectorAll('.js-delivery-option')
    .forEach((element)=>{
      const {productId,deliveryOptionId} = element.dataset;
      element.addEventListener('click',()=>{
        updateDeliveryOption(productId,deliveryOptionId)
        renderOrderSummary();
        renderPaymentSummary();
      })
    })
}

