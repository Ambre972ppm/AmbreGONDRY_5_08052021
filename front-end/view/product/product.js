//récuperation de l'id du produit sélectionné
const urlParams = new URLSearchParams(window.location.search);
const cameraId = urlParams.get('id');
console.log(cameraId)


//affichage de l'appareil selectionné
const displayOneCamera = () => {
     fetch(`http://localhost:3000/api/cameras/${cameraId}`)//on appelle les données correspondant à l'appareil selectionné
        .then(function(res) {//si la requête a fonctionné elle nous retourne le résultat au format JSON
            if (res.ok) {
            return res.json();
            }
        })
        .then(function(value) {//nous recupérons la valeur de la requête précedente et l'affichons dans le container "product"
            console.log(value);
            document
                .getElementById('product')
                .innerHTML += `<aside id=${value._id} class="camera">
                                    <figure>
                                        <img src="${value.imageUrl}" alt="${value.name}">
                                        <figcaption>
                                            <h1>  ${value.name} </h1>
                                            <p class="description"> ${value.description} </p>
                                            <select class="lenses"> 
                                                    <option>Choisissez votre Lentille.. ${value.lenses.map((lenses) => `<option>${lenses}</option>`)} </option>
                                            </select>
                                            <p class="price">Prix unitaire :<b> ${value.price/100} €</b></p>
                                            <button>
                                                <a id="addToCart" href ="../cart/cart.html">
                                                    Ajouter au Panier
                                                </a>
                                            </button>
                                        </figcaption>
                                    </figure>
                                </aside>`;
        })
        .catch(function(err) {
            document
                .getElementById('product')
                .innerHTML += `<aside class="error">
                                    <h2>
                                        Une erreur s'est produite, Veuillez nous en excuser et recharger la page ultérieurement
                                    </h2>
                                </aside>`;
        
        
        const addToCart = document.getElementById("addToCart");

                addToCart.addEventListener("click", () => {
                const cartContent = JSON.parse(localStorage.getItem("cartContent")) || []; 
                    
                    cartContent.push(cameraId);
                    localStorage.setItem("cartContent", JSON.stringify(cartContent)); 
  
  });
})

}

displayOneCamera()