//__________________________________Recuperation des données de l'API__________________________________

async function fetchCamerasInfo(url) {
  //la réponse attend le retour du fetch de l'URL de l'API camera
  const res = await fetch(url);
  //les données attendent la réponse au format JSON
  const data = await res.json();
  //on retrouve dans les données les différents objets camera
  data.map((camera) => displayAllCameras(camera));
}

//______________________________________Appel des données de l'API______________________________________

fetchCamerasInfo("http://localhost:3000/api/cameras");

//______________________Affichage des produits lorsque les données sont récupérées______________________

function displayAllCameras(camera) {
  //on formate le nombre sélectionné afin de le transformer en devise, ici Euros
  const formatter = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  });
  document.getElementById("main")
          .innerHTML +=  `<aside id=${camera._id} class="item product-cards">
                              <figure class="product-cards__prev">
                                 <img src="${camera.imageUrl}" alt="${camera.name}">
                                 <figcaption class="product-cards__details">
                                    <h2>  ${camera.name} </h2>
                                    <p class="price">Prix : <b>${formatter.format(camera.price / 100)}</b>
                                    </p>
                                    <a class="details" href="../product/product.html?id=${camera._id}">
                                    <button>
                                    En savoir plus sur cet appareil
                                    </button>
                                    </a>
                                 </figcaption>
                              </figure>
                           </aside>`;
  console.log(camera);
  console.log(`Id : ${camera._id} - Nom : ${camera.name}`);
}
