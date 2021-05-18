const displayItem = item => {
    let main = document.getElementById('main');
    main.innerHTML += `<div id=${item._id} class="item">
                            <h2>  ${item.name} </h2>
                            <img src="${item.imageUrl}" alt="${item.name}">
                            <p class="prix">Prix unitaire : ${item.price/100} €</p>
                            <a class="details" href="../product/product.html?id=${item._id}">Plus de détails sur l'article</a>
                        </div>`;
    console.log(item);
    console.log(`Id : ${item._id} - Nom : ${item.name}`);
}

const getInfo = async() =>{
    let response = await fetch('http://localhost:3000/api/cameras');
    let data = await response.json();
    data.map(item => displayItem(item))
}

getInfo();
