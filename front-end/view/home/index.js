
//Affichage des produits dans l'HTML
const displayItem = item => {
    let main = document.getElementById('main');
    main.innerHTML += `<aside id=${item._id} class="item product-cards">
                            <figure class="product-cards__prev">
                                <img src="${item.imageUrl}" alt="${item.name}">
                                <figcaption class="product-cards__details">
                                    <h2>  ${item.name} </h2>
                                    <p class="price">Prix : <b>${item.price/100} €</b></p>
                                    <button>
                                        <a class="details" href="../product/product.html?id=${item._id}">
                                            En savoir plus sur cet appareil
                                        </a>
                                    </button>
                                </figcaption>
                            </figure>
                        </aside>`;

    console.log(item);
    console.log(`Id : ${item._id} - Nom : ${item.name}`);
}

//Recuperer les données de l'API
const getInfo = async() =>{
    let response = await fetch('http://localhost:3000/api/cameras');
    let data = await response.json();
    data.map(item => displayItem(item))
}

//Appel des données
getInfo();



