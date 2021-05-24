//Url de l'API des produit selectionnés(ici les appareils photos)
const url = 'http://localhost:3000/api/cameras';

//Affichage des produits dans l'HTML
const displayAllCameras = camera => {
        document.getElementById('main')
                .innerHTML += `<aside id=${camera._id} class="item product-cards">
                                <figure class="product-cards__prev">
                                    <img src="${camera.imageUrl}" alt="${camera.name}">
                                <figcaption class="product-cards__details">
                                    <h2>  ${camera.name} </h2>
                                    <p class="price">Prix : <b>${camera.price/100} €</b></p>
                                    <button>
                                        <a class="details" href="../product/product.html?id=${camera._id}">
                                            En savoir plus sur cet appareil
                                        </a>
                                    </button>
                                </figcaption>
                                </figure>
                              </aside>`;
                        

    console.log(camera);
    console.log(`Id : ${camera._id} - Nom : ${camera.name}`);
}

//Recuperer les données de l'API
const getCameraInfo = async() =>{
    let res = await fetch(url);
    let data = await res.json();
    data.map(camera => displayAllCameras(camera))
}

//Appel des données
getCameraInfo();

