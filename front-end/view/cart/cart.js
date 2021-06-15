//emplacement du contenu de la page
const cartContainer = document.getElementById("cart");//on defini le conteneur
//emplacement ou intégrer le contenu du panier
let tableContainer = document.getElementById("tableContainer");
//formateur du prix pour passer le nombre concernant le prix en devise
const formatter = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });
// initialise le prix du panier
let cartPrice = 0;
//récupération ID
let camerasOnCart = [];

//_________________________________on retrouve et récupère le contenu du localStorage_________________________________

let cartContent = JSON.parse(localStorage.getItem("cart")) || [];

//_________________Boucle pour generer l'affichage de chacun des articles stockés dans le locaStorage_________________

cartContent.forEach((camera, i) => {
  let subtotal = camera.quantity * camera.price/100;
  tableContainer.innerHTML += `
    <tr>
        <td class="picture"><a href="../product/product.html?id=${camera._id}"><img src=${camera.imageUrl} alt="appareil photo" /></a></td>
        <td>${camera.name}</td>
        <td>${camera.lense}</td>
        <td>${formatter.format(camera.price/100)}</td>
        <td>${camera.quantity}</td>
        <td>${formatter.format(subtotal)}</td>
        <td class="deleteCamera"><a class="deleteCamera" data-id="${i}"> <i class="fas fa-trash-alt"></i></a></td>
    </tr>
  
  `;
  cartTotalPrice(camera, subtotal)

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
  if (camera.quantity > 1) {
    camera.quantity--;
  } else {
    cartContent.splice(id, 1);
  }
  localStorage.setItem('cart', JSON.stringify(cartContent));
  window.location.reload();
}

document.querySelectorAll(".deleteCamera").forEach(deleteButton => {
  deleteButton.addEventListener('click', () => deleteCamera(deleteButton.dataset.id))
});
//___________________________________________________Vider le panier___________________________________________________

document.getElementById('clearCart')
        .addEventListener('click', function() {
          localStorage.clear();
          window.location.reload();
        });
//________________________________________________formulaire de contact_________________________________________________

const cartForm =  document.createElement("aside");
                  cartForm.classList.add("cart-form");
cartContainer.appendChild(cartForm)
             .innerHTML += `<form id="form" action="../orderconfirmation/orderconfirm.html/" method="POST" class="row g-3">
                            <div class="row g-3">
                              <div class="col">
                                  <input type="text" class="form-control" id="firstName" placeholder="Prénom" aria-label="First name" pattern="[-'a-zA-ZÀ-ÖØ-öø-ÿ ]{2,20}$" required>
                              </div>
                              <div class="col">
                                  <input type="text" class="form-control" id="lastName" placeholder="Nom" aria-label="Last name" pattern="[-'a-zA-ZÀ-ÖØ-öø-ÿ ]{2,30}$" required>
                              </div>
                              </div>
                              <div class="col-12">
                                <label for="inputAddress" class="form-label" id="address">Adresse</label>
                                <input type="text" class="form-control" id="inputAddress" placeholder="12 rue des Lilas" pattern="[-'0-9a-zA-ZÀ-ÖØ-öø-ÿ ]{2,30}$" required>
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
                                <label for="inputCity" class="form-label" id="city">Ville</label>
                                <input type="text" class="form-control" id="inputCity" placeholder="Lyon" pattern="[-'a-zA-ZÀ-ÖØ-öø-ÿ ]{2,30}$" required>
                              </div>
                              <div class="col-md-6">
                                <label for="inputEmail4" class="form-label" id="email">Email</label>
                                <input type="email" class="form-control" id="inputEmail4" placeholder="jeanpaul.berthod@mail.com" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required>
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

//________________________________________Récupération des données du formulaire_________________________________________

function sendOrder() {
  let form = document.getElementById("form");
  if (form.reportValidity() == true && camerasOnCart.length > 0) {
    let contact = {
      'firstName' : document.getElementById("firstName").value,
      'lastName'  : document.getElementById("lastName").value,
      'address'   : document.getElementById("address").value,
      'city'      : document.getElementById("city").value,
      'email'     : document.getElementById("email").value
    };
 
    let products = camerasOnCart; 

//_______________________________________envoi des données avec la methode Post_______________________________________

const urlPost = "http://localhost:3000/api/cameras/order";

let orderData = JSON.stringify({
  contact,
  products,
});

let fetchOrderData = {
  method : 'POST',
  headers :{
    'accept' : 'application/json',
    'Content-Type': 'application/json',
},
  body : orderData,
}

fetch(urlPost, fetchOrderData)
  .then(function (res) {
        return res.json()
      })
      .then(function(r) {
        localStorage.setItem("contact", JSON.stringify(r.contact));
        window.location.href = `../orderconfirmation/orderconfirm.html/${r.orderId}`;
      })
      .catch(function (err) {
        alert(" Une erreur s'est produite veuillez verifier que tout les champs sont correctement renseignés ")
        console.log("fetch Error");
      });
  }
}

let sendForm = document.getElementById("sendForm");

sendForm.addEventListener('click', function (e) {
e.preventDefault();
sendOrder();
});
