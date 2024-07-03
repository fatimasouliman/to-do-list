let products = []
const cards = document.querySelector(".cards")
console.log(cards)
let item = ""

async function fetchData() {
    await fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then(res => res.products.map(ele => {

            item += `
                 <div  id=${ele.id} class="item" >
                    <img  src=${ele.images[0]} />
                    <p >${ele.title} </p>
                </div>
            `

            cards.innerHTML = item


        }));
    const elements = document.querySelectorAll(".item")
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener("click", () => {
            console.log(elements[i].getAttribute("id"))
            /* updating title of product with id 1 */
            // fetch(`https://dummyjson.com/products/${elements[i].getAttribute("id")}`, {
            //     method: 'PUT', /* or PATCH */
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({
            //         title: 'iPhone'
            //     })
            // })
            //     .then(res => res.json())
            //     .then(console.log);

            // fetch(`https://dummyjson.com/products/${elements[i].getAttribute("id")}`)
            //     .then(res => res.json())
            //     .then(console.log);

            fetch(`https://dummyjson.com/products/${elements[i].getAttribute("id")}`, {
                method: 'DELETE',
              })
              .then(res => res.json())
              .then(console.log);
        })

    }
}

fetchData()

const search = document.querySelector(".search")

async function searchData(value) {
    cards.innerHTML = ""
    await fetch(`https://dummyjson.com/products/search?q=${value}`)
        .then(res => res.json())
        .then(res => res.products.map(ele => {

            item += `
                 <div  id=${ele.id} class="item" >
                    <img  src=${ele.images[0]} />
                    <p >${ele.title} </p>
                </div>
            `

            cards.innerHTML = item


        }));
}

const btn = document.querySelector(".btn")

btn.addEventListener("click", () => {
    fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: search.value,
            /* other product data */
        })
    })
        .then(res => res.json())
        .then(console.log);
})