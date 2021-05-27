//récuperation de l'id du produit sélectionné dans l'URL
const urlParams = new URLSearchParams(window.location.search);
const cameraId = urlParams.get('id');
console.log(cameraId)//Affichage de l'Id dans la console


//affichage de l'appareil selectionné
function displayOneCamera() {
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
                .innerHTML += 
            `<aside id=${value._id} class="camera">
                    <figure>
                        <img src="${value.imageUrl}" alt="${value.name}">
                    <figcaption>
                        <h1>  ${value.name} </h1>
                        <p class="description"> ${value.description} </p>
                        <select class="lenses"> 
                                <option>Choisissez votre Lentille.. ${value.lenses.map(lenses => `<option>${lenses}</option>`)} </option>
                        </select>
                        <p class="price">Prix unitaire :<b> ${value.price/100} €</b></p>
                        <button>
                            <a id="addCart" href ="../cart/cart.html">
                                Ajouter au Panier
                            </a>
                        </button>
                    </figcaption>
                </figure>
             </aside>`;

             addCart.onclick = () =>{
                const camera = {
                    picture : value.imageUrl,
                    name : value.name,
                    lenseSelected : value.lenses,
                    quantity : value._id.lenght,
                    price : value.price/100
                }

                 localStorage.setItem("cartContent", JSON.stringify(camera));
                 alert(`${value.name} à été ajouté au panier`); //on previent le client que le produit a été ajouté au panier
             }
    })

}
displayOneCamera()
