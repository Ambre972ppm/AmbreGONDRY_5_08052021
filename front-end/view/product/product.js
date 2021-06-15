//_______________________________________________On nomme la page produit_______________________________________________
function pageName(value){
    document.title = ` Appareil ${value.name}`;
}
//______________________________On génère notre code HTML contenant l'appareil selectionné______________________________
function printProductContainer(value, formatter){
    document
            .getElementById('product')
            .innerHTML +=`<aside id=${value._id} class="camera">
                    <figure>
                        <img src="${value.imageUrl}" alt="${value.name}">
                    <figcaption>
                        <h1>  ${value.name} </h1>
                        <p class="description"> ${value.description} </p>
                        <p><b> Choisissez votre objectif : </b></p>
                        <select id="lensesSelect" required></select>
                        <p><b>Selectionnez la quantité : </b></p>
                        <select id="quantity" required>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <p class="price">Prix unitaire :<b> ${formatter.format(value.price/100)}</b></p>

                        
                            <a id="addCart" href ="../cart/cart.html">
                            <button>
                                Ajouter au Panier
                            </button>
                            </a>
                        
                    </figcaption>
                </figure>
             </aside>`;
}
//____________________________________création de la boucle des options de lentilles____________________________________
function createLenseOption(value){
    let selectALense = [];
    const lensesSelect = document.getElementById("lensesSelect");
   
    for(lense of value.lenses){
       selectALense +=
       `<option value ="${lense}">${lense}</option>`
    }
    lensesSelect.innerHTML = selectALense;
}
//_________________________________________________choix de la quantité_________________________________________________
function chooseProductQuantity(){
    let cameraQuantity = document.getElementById("quantity")
             .addEventListener("change", function(e){
                cameraQuantity = e.target.value
                quantityChoose = parseInt(cameraQuantity)
             })
}
//____________________________________________________Ajout au panier____________________________________________________
function sendToCart(value){
    document.getElementById("addCart")//on recupère le bouton ajouter au panier 
            .addEventListener("click", function(e){
                e.preventDefault();
                const lenseSelected = lensesSelect.value;//on définit l'objectif sélectionné
                quantityChoose = quantity.value;//on défini la quantité choisie
                //on ajoute ces valeurs selectionnées à value
                value["quantity"] = quantityChoose;
                value["lense"] = lenseSelected;
    let cartContent = JSON.parse(localStorage.getItem("cart")) || [];//on retrouve le contenu du localStorage et on crée un tableau pour stocker les produits sélectionnés
    cartContent.push(value);//ajout du produit dans le tableau cartContent
    
    //on envoie le produit et l'option selectionné dans le localStorage
     localStorage.setItem("cart", JSON.stringify(cartContent));
     alert(`Vous venez d'ajouter ${quantityChoose} ${value.name} objectif : ${lenseSelected} a votre panier`); //on previent le client que le produit a été ajouté au panier
   console.log(value) 
})
}
//___________________________________________On affiche l'appareil selectionné___________________________________________
function displayOneCamera(){
//------récuperation de l'id du produit sélectionné dans l'URL----------------------------------------
    const urlParams = new URLSearchParams(window.location.search);
    const cameraId = urlParams.get('id');
    console.log(cameraId);    
//------on appelle les données correspondant à l'appareil selectionné---------------------------------
    fetch(`http://localhost:3000/api/cameras/${cameraId}`)
//------Une fois la reponse du fetch reçue on la retourne au format json------------------------------
        .then(function(res) {
            if (res.ok) {
            return res.json();
            }
        })
//------nous recupérons la valeur de la requête précedente et l'affichons dans le container "product"-
        .then(function(value) {
            const formatter = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });
             pageName(value);                        //1 - on nomme la page produit
             printProductContainer(value, formatter);//2 - on affiche notre carte dans notre page
             createLenseOption(value);               //3 - on crée la boucle pour permettre le choix de l'objectif
             chooseProductQuantity(value);           //4 - on permet le choix de la quantité
             sendToCart(value);                      //5 - on envoi le produit dans le localStorage pour le récuperer dans le panier
             console.log(value);
    })
//------En cas d'erreur -------------------------------------------------------------------------------
        .catch(function(err){
            document
                .getElementById('product')
                .innerHTML += `<aside class="error">
                                    <h2>
                                        Une erreur s'est produite, Veuillez nous en excuser et réiterer votre demande ulterieurement
                                    </h2>
                                </aside>`;
                                return console.log(err);
        })
}
//_________________________Appel de la fonction pour afficher la carte de l'appareil selectionné_________________________

displayOneCamera()