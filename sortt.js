function sort() {
    let price = document.getElementById("price")
    let title = document.getElementById("title")
    document.getElementById('node_for_insert').innerHTML = '';
    if (price.checked) {
        getResponceByPrice()
    }
    if (title.checked) {
        getResponceByTitle()
    }
}

function search() {
    document.getElementById('node_for_insert').innerHTML = '';
    if (price.checked) {
        getResponceByPrice()
    }

    if (title.checked) {
        getResponceByTitle()
    }
}



async function getResponceByPrice() {

    let responce = await fetch("shop.json")

    let content = await responce.text()
    content = JSON.parse(content)
    content = content.splice(0, 6)

    let key

    content_price = content.sort((a, b) => a.price - b.price);


    content_filter = []
    let word = document.getElementById('search').value.toLowerCase();

    content_filter = content_price.filter((product) => {
        return (
            product.title.toLowerCase().includes(word) ||
            product.description.toLowerCase().includes(word) ||
            product.price.toString().includes(word)
        );

    });

    let node_for_insert = document.getElementById("node_for_insert")

    for (key in content_filter) {
        node_for_insert.innerHTML += `
                <li style="width: 310px" class="d-flex flex-column m-1 p-1 border bg-body">
                <img style="width: 180px" class="align-self-center" src=${content_filter[key].img}>
                <h5 class="card-title">${content_filter[key].title}</h5>
                <p class="card-text">${content_filter[key].description}.</p>
                <p class="card-text"> Цена ${content_filter[key].price} р.</p>
                <input type="hidden" name= "vendor_code" value=${content_filter[key].vendor_code}>
                <p class="card-text" >Заказать <input class="w-25" type="text" value="0" name="check"></p>
                </li>
                        `
    }

}
async function getResponceByTitle() {

    let responce = await fetch("shop.json")

    let content = await responce.text()
    console.log(content)
    content = JSON.parse(content)
    content = content.splice(0, 6)

    console.log(content)
    let key

    content_title = content.sort((a, b) => {
        const nameA = a.title.toUpperCase();
        const nameB = b.title.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        return 0;
    });


    content_filter = []
    let word = document.getElementById('search').value.toLowerCase();

    content_filter = content_title.filter((product) => {
        return (
            product.title.toLowerCase().includes(word) ||
            product.description.toLowerCase().includes(word) ||
            product.price.toString().includes(word)
        );

    });

    let node_for_insert = document.getElementById("node_for_insert")
    for (key in content_filter) {
        node_for_insert.innerHTML += `
                <li style="width: 310px" class="d-flex flex-column m-1 p-1 border bg-body">
                <img style="width: 180px" class="align-self-center" src=${content_filter[key].img}>
                <h5 class="card-title">${content_filter[key].title}</h5>
                <p class="card-text">${content_filter[key].description}.</p>
                <p class="card-text"> Цена ${content_filter[key].price} р.</p>
                <input type="hidden" name= "vendor_code" value=${content_filter[key].vendor_code}>
                <p class="card-text" >Заказать <input class="w-25" type="checkbox" name="check" value="0" onClick='this.value = this.checked ? 1 : 0'></p>
                </li>
                        `
    }

}

sort()