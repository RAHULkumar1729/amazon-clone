import { cart } from "../../data/cart.js";
import { getdeliveryOption } from "../../data/deliveryOptions.js";
import { getProduct} from "../../data/products.js";


export function renderPaymentSummary(){
    let productPriceCents = 0;
    let shippingPriceCents = 0;
    let totalPaymentBeforeTax = 0;
    let totalItems = 0;
    cart.forEach((cartItem)=>{
        const product=getProduct(cartItem.productId);
        const deliveryOption = getdeliveryOption(cartItem.deliveryOptionId);
        productPriceCents+=product.priceCents * cartItem.quantity;
        shippingPriceCents+=deliveryOption.priceCents;
        totalItems += cartItem.quantity;
      })
    totalPaymentBeforeTax = productPriceCents+shippingPriceCents
    totalPaymentBeforeTax = (totalPaymentBeforeTax/100).toFixed(2);
    productPriceCents = (productPriceCents/100).toFixed(2);
    shippingPriceCents = (shippingPriceCents/100).toFixed(2);
    console.log(totalPaymentBeforeTax)
    let tax = (totalPaymentBeforeTax * 0.1).toFixed(2);
    const total = (parseFloat(totalPaymentBeforeTax) + parseFloat(tax)).toFixed(2);
    let html=`
          <div class="payment-summary-row">
            <div>Items (${totalItems}):</div>
            <div class="payment-summary-money">$${productPriceCents}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${shippingPriceCents}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${totalPaymentBeforeTax}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${tax}</div>
          </div>
          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${total}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
            `
        document.querySelector('.payment-summary').innerHTML = html;
}