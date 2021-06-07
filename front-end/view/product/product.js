//---------------------------------récuperation de l'id du produit sélectionné dans l'URL----------------------------------
    const urlParams = new URLSearchParams(window.location.search);
    const cameraId = urlParams.get('id');
    console.log(cameraId)
//------------------------------on appelle les données correspondant à l'appareil selectionné------------------------------
    fetch(`http://localhost:3000/api/cameras/${cameraId}`)
//-----------------------------Une fois la reponse du fetch reçue on la retourne au format json-----------------------------
        .then(function(res) {
            if (res.ok) {
            return res.json();
            }
        })
//--------------nous recupérons la valeur de la requête précedente et l'affichons dans le container "product"---------------
        .then(function(value) {
            console.log(value);
            const formatter = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });
            document
                .getElementById('product')
                .innerHTML += 
            `<aside id=${value._id} class="camera">
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

                        <button>
                            <a id="addCart" href ="../cart/cart.html">
                                Ajouter au Panier
                            </a>
                        </button>
                    </figcaption>
                </figure>
             </aside>`;

//----------------------------------création de la boucle des options de lentilles-----------------------------------
             let selectALense = [];
             const lensesSelect = document.getElementById("lensesSelect");
            
             for(lense of value.lenses){
                selectALense +=
                `<option value ="${lense}">${lense}</option>`
             }
             lensesSelect.innerHTML = selectALense;
//--------------------------------------------choix de la quantité----------------------------------------------------
             let cameraQuantity = document.getElementById("quantity")
             .addEventListener("change", function(e){
                cameraQuantity = e.target.value
                quantityChoose = parseInt(cameraQuantity)
             })
//---------------------------------------------------Ajout au panier---------------------------------------------------
             const addToCart = document.getElementById("addCart");//on recupère le bouton ajouter au panier 
        
             addToCart.addEventListener("click", function(e){
                  e.preventDefault();
                  
                  //on met le choix de lentille de l'utilisateur dans une variable
                  const lenseSelected = lensesSelect.value;
                  //si la quantité n'a pas été defini par defaut elle est égal à 1
                  quantityChoose = quantity.value;

                value["quantity"] = quantityChoose;
                value["lense"] = lenseSelected;

                let cartContent = JSON.parse(localStorage.getItem("cart")) || [];//on retrouve le contenu du localStorage
                
                cartContent.push(value);//ajout du produit dans le localStorage

                //on envoie le produit et l'option selectionné dans le localStorage
                  localStorage.setItem("cart", JSON.stringify(cartContent));
                  alert(`l'Appareil ${value.name} objectif : ${lenseSelected} a été ajouté au panier`); //on previent le client que le produit a été ajouté au panier
                console.log(value) 
        })
    })
//---------------------------------------------------En cas d'erreur ---------------------------------------------------
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