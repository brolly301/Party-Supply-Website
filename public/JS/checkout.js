window.addEventListener('DOMContentLoaded', async() => {
    const {publishableKey} = await fetch("/checkout/config").then(r => r.json() )
    const stripe = Stripe(publishableKey)
    

    const {clientSecret} = await fetch("/checkout", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(r => r.json())
    
    const elements = stripe.elements({ clientSecret})
    const paymentElement = elements.create('payment')
    paymentElement.mount('#payment-element')

    const form = document.getElementById("payment-form")
    form.addEventListener('submit', async (e) => {
        e.preventDefault()
        const {error} = await stripe.confirmPayment({
            elements,
            confirmParams: {
               return_url: window.location.href.split("?")[0] + "/" + "checkoutComplete"
            }
        })
        if (error) {
            const messages = document.getElementById("error-message")
            messages.innerText = error.message
        }
     })
})