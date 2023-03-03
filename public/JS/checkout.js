// const button = document.getElementById('checkoutButton')
// button.addEventListener("click", () => {
//     fetch('/checkout', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(req.session.basket.products)
//     }).then(res => {
//         if (res.ok) return res.json()
//         return res.json().then(json => Promise.reject(json))
//     }).then(({url}) => {
//         window.location = url
//     }).catch(e => {
//         console.error(e.error)
//     })
// })