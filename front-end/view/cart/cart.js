//formateur du prix pour passer le nombre concernant le prix en devise
const formatter = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });
//on defini le conteneur
const cartContainer = document.getElementById("cart");
//emplacement du tableau du panier
let tableContainer = document.getElementById("tableContainer");
// initialisation du prix du panier
let cartPrice = 0;
//tableau pour récuperer les ids des produits selectionnés
let camerasOnCart = [];


//_________________________________on retrouve et récupère le contenu du localStorage_________________________________

let cartContent = JSON.parse(localStorage.getItem("cart")) || [];

//_________________Boucle pour generer l'affichage de chacun des articles stockés dans le locaStorage_________________

cartContent.forEach((camera, i) => {
  let subtotal = camera.quantity * camera.price/100;//calcul du sous total par ligne
  tableContainer.innerHTML += `
    <tr scope="row">
        <td class="picture"><a href="../product/product.html?id=${camera._id}"><img src=${camera.imageUrl} class = "photo" alt="appareil photo" /></a></td>
        <td>${camera.name}</td>
        <td>${camera.lense}</td>
        <td>${formatter.format(camera.price/100)}</td>
        <td>${camera.quantity}</td>
        <td>${formatter.format(subtotal)}</td>
        <td class="deleteCamera"><a class="deleteCamera" data-id="${i}"><i class="fas fa-trash-alt"></i></a></td>
    </tr>
  
  `;
  cartTotalPrice(camera, subtotal)
//pour chaque article présent au panier on envoi l'id dans le tableau camerasOnCart
  for (let i = 0; i < camera.quantity; i++) {
    camerasOnCart.push(camera._id);
  }
});
//___________________________________________calcul du prix total du panier___________________________________________

function cartTotalPrice(camera, subtotal){
  cartPrice += subtotal;// on ajoute le sous total de chacunes des lignes du panier 
  //affiche le prix total et l'envoi au local Storage
  document.getElementById('totalPrice').textContent = formatter.format(cartPrice);
  localStorage.setItem('totalPrice', JSON.stringify(cartPrice));
};
//_____________________________________Supprimer le produit selectionné du panier_____________________________________

function deleteCamera(id) {
  let camera = cartContent[id];
  if (camera.quantity > 1) {//si la quantité de produit est superieur à 1 la quantité diminue de 1
    camera.quantity--;
  } else {
    cartContent.splice(id, 1);//s'il ne reste qu'un produit il est vidé
  }
  localStorage.setItem('cart', JSON.stringify(cartContent));//on met à jour le contenu du LocalStorage
  window.location.reload();//on recharge la page
}

document.querySelectorAll(".deleteCamera").forEach(deleteButton => {// appel de la fonction au clic
  deleteButton.addEventListener('click', () => deleteCamera(deleteButton.dataset.id))
});
//___________________________________________________Vider le panier___________________________________________________

document.getElementById('clearCart')
        .addEventListener('click', function() {// au clic sur le bouton vider le panier
          localStorage.clear();//on vide le localStorage
          window.location.reload();//on recharge la page
        });
//__________________________________________Création du formulaire de contact___________________________________________

const cartForm =  document.createElement("aside");
                  cartForm.classList.add("cart-form");
cartContainer.appendChild(cartForm)
             .innerHTML += `<form id="form" class="row g-3">
                            <div class="row g-3">
                              <div class="col">
                                  <input type="text" class="form-control" id="firstName" placeholder="Prénom" aria-label="First name" pattern="[-'a-zA-ZÀ-ÖØ-öø-ÿ ]{2,20}$" required>
                              </div>
                              <div class="col">
                                  <input type="text" class="form-control" id="lastName" placeholder="Nom" aria-label="Last name" pattern="[-'a-zA-ZÀ-ÖØ-öø-ÿ ]{2,30}$" required>
                              </div>
                              </div>
                              <div class="col-12">
                                <label for="inputAddress" class="form-label">Adresse</label>
                                <input type="text" class="form-control" id="address" placeholder="12 rue des Lilas" pattern="[-'0-9a-zA-ZÀ-ÖØ-öø-ÿ ]{2,30}$" required>
                              </div>
                              <div class="col-12">
                                <label for="inputAddress2" class="form-label">Complément d'adresse</label>
                                <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, Maison, Lieu dit">
                              </div>
                              <div class="col-md-4">
                                <label for="inputState" class="form-label">Région</label>
                                <select id="inputState" class="form-select" required>
                                  <option selected>Selectionnez votre Région...</option>
                                  <option>Auvergne-Rhône-Alpes</option>
                                  <option>Bourgogne-Franche-Comté</option>
                                  <option>Bretagne</option>
                                  <option>Centre-Val de Loire</option>
                                  <option>Corse</option>
                                  <option>Grand Est</option>
                                  <option>Haut-de-France</option>
                                  <option>Ile-de-France</option>
                                  <option>Normandie</option>
                                  <option>Nouvelle-Aquitaine</option>
                                  <option>Occitanie</option>
                                  <option>Pays de la Loire</option>
                                  <option>Provençe-Alpes-Côte d'Azur</option>
                                </select>
                              </div>
                              <div class="col-md-2">
                                <label for="inputZip" class="form-label">Code Postal</label>
                                <input type="text" class="form-control" id="inputZip" placeholder="69000" pattern="[0-9]{5}" required>
                              </div>
                              <div class="col-md-6">
                                <label for="inputCity" class="form-label" >Ville</label>
                                <input type="text" class="form-control" id="city" placeholder="Lyon" pattern="[-'a-zA-ZÀ-ÖØ-öø-ÿ ]{2,30}$" required>
                              </div>
                              <div class="col-md-6">
                                <label for="inputEmail4" class="form-label">Email</label>
                                <input type="email" class="form-control" id="email" placeholder="jeanpaul.berthod@mail.com" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required>
                              </div>
                              <div class="col-md-6">
                                <label for="inputTel4" class="form-label">Téléphone</label>
                                <input type="tel" class="form-control" id="inputTel4" placeholder="0790123456" pattern="[0-9]{10}">
                              </div>
                              <div class="col-12">
                                <button type="submit" value="order" id="sendForm" class="btn btn-primary order-validation">
                                  Commander
                                </button>
                              </div>
                            </form>`;
//_______________________________________envoi des données avec la methode Post_______________________________________

let form = document.querySelector("form");//on récupère notre formulaire

form.addEventListener('submit', function(e) {//lorsqu'on soumet notre formulaire
  e.preventDefault();
//on envoi les données au serveur avec la requête post
  fetch(`http://localhost:3000/api/cameras/order`, {
  method: 'POST',
  headers: {
    'accept': "application/json",
    'content-type': "application/json"
  },
  mode: "cors",
  body: JSON.stringify({//on assigne à la requête les données attendues par le serveur
    contact : {
                'firstName' : document.getElementById("firstName").value,
                'lastName'  : document.getElementById("lastName").value,
                'address'   : document.getElementById("address").value,
                'city'      : document.getElementById("city").value,
                'email'     : document.getElementById("email").value
          },
    products : camerasOnCart
    })
})
  .then(function (res) {
    return res.json()
  })
  .then(function(r) {//on envoi l'OrderId renvoyé par le serveur dans l'url de notre page de confirmation
    window.location.assign("../orderconfirmation/orderconfirm.html?orderId=" + r.orderId);
    localStorage.setItem("contact", JSON.stringify(r.contact));//on envoi le contact au localStorage
  })
  .catch(function (err) {
    alert ("Une erreur s'est produite, vous n'avez pas correctement renseigné les champs ou votre panier est peut être vide, veuillez rééssayer merci")
    console.log(err);
  });
})