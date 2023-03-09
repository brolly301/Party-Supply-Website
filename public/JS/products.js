
const decreaseQuantity = document.getElementById('decreaseQuantity')
decreaseQuantity.addEventListener('click', (e) => {
e.preventDefault();
const button = document.getElementById('productQuantity')
if (button.innerText <=1) {
    button.innerText = 1
} else {
    button.innerText--
}
})

const increaseQuantity = document.getElementById('increaseQuantity')
increaseQuantity.addEventListener('click', (e) => {
e.preventDefault();
const button = document.getElementById('productQuantity')
button.innerText++
})