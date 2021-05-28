//affichage de l'appareil selectionné
function displayOneCamera() {
    const urlParams = new URLSearchParams(window.location.search);//récuperation de l'id du produit sélectionné dans l'URL
    const cameraId = urlParams.get('id');
    console.log(cameraId)//Affichage de l'Id dans la console

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
                        <select id="lensesSelect"> 
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

            
            const addToCart = document.getElementById("addCart");//on recupère le bouton ajouter au panier 
        
            addToCart.addEventListener("click", function(e){//on ecoute le bouton et on envoi au panier
                 e.preventDefault();//on empèche le bouton de nous renvoyer sur la page panier

                 //on met le choix de l'utilisateur dans une variable
                 const lensesSelect = document.getElementById("lensesSelect");
                 const lensesSelected = lensesSelect.value;

                 //on crée l'objet qu'on veux recuperer
                 let camera = {
                    picture : value.imageUrl,
                    name : value.name,
                    lense : lensesSelected,
                    quantity : 1,
                    price : value.price/100
                }

                 localStorage.setItem("cartContent", JSON.stringify(camera));
                 alert(`${value.name} a été ajouté au panier`); //on previent le client que le produit a été ajouté au panier
             })
        })
    
     }

displayOneCamera()
