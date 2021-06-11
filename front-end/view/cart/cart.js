//Url pour la requête POST
const urlPost = "http://localhost:3000/api/cameras/order";
//emplacement du contenu de la page
const cartContainer = document.getElementById("cart");//on defini le conteneur
//emplacement ou intégrer le contenu du panier
let tableContainer = document.getElementById("tableContainer");
//formateur du prix pour passer le nombre concernant le prix en devise
const formatter = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });
// initialise le prix du panier
let cartPrice = 0;
//récupération ID
let cameraId = [];

//_________________________________on retrouve et récupère le contenu du localStorage_________________________________

let cartContent = JSON.parse(localStorage.getItem("cart")) || [];

//________________Boucle pour generer l'affichage de chacun des articles stockés dans le local storage________________

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

  // for (let i = 0; i < camera.quantity; i++) {
  //   cameraId.push(camera.id);
  // }
 
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

let clearCart = document.getElementById('clearCart')
                        .addEventListener('click', deleteCart);

function deleteCart() {
  if (cartContent !== null){
    tableContainer.remove();
    localStorage.clear();
    window.location.reload();
  }
};
//________________________________________________formulaire de contact________________________________________________
const cartForm =  document.createElement("aside");
                  cartForm.classList.add("cart-form");
cartContainer.appendChild(cartForm)
             .innerHTML += `<form class="row g-3">
                          <div class="row g-3">
                              <div class="col">
                                  <input type="text" class="form-control" placeholder="Nom" aria-label="Last name" pattern="^[-'a-zA-ZÀ-ÖØ-öø-ÿ ]{3,30}$" required>
                              </div>
                              <div class="col">
                                  <input type="text" class="form-control" placeholder="Prénom" aria-label="First name" pattern="^[-'a-zA-ZÀ-ÖØ-öø-ÿ ]{3,20}$" required>
                              </div>
                          </div>
                          <div class="col-12">
                            <label for="inputAddress" class="form-label">Adresse</label>
                            <input type="text" class="form-control" id="inputAddress" placeholder="12 rue des Lilas" pattern="^[-'a-zA-ZÀ-ÖØ-öø-ÿ ]{2,30}$" required>
                          </div>
                          <div class="col-12">
                            <label for="inputAddress2" class="form-label">Complément d'adresse</label>
                            <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, Maison, Lieu dit">
                          </div>
                          <div class="col-md-6">
                            <label for="inputCity" class="form-label">Ville</label>
                            <input type="text" class="form-control" id="inputCity" placeholder="Lyon" pattern="^[-'a-zA-ZÀ-ÖØ-öø-ÿ ]{2,30}$" required>
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
                            <input type="text" class="form-control" id="inputZip" placeholder="69000"required>
                          </div>
                          <div class="col-md-6">
                            <label for="inputEmail4" class="form-label">Email</label>
                            <input type="email" class="form-control" id="inputEmail4" placeholder="jeanpaul.berthod@mail.com" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required>
                          </div>
                          <div class="col-md-6">
                            <label for="inputTel4" class="form-label">Téléphone</label>
                            <input type="tel" class="form-control" id="inputTel4" placeholder="0790123456" pattern="[0-9]{10}">
                          </div>
                          <div class="col-12">
                            
                            <a  id="sendForm" href ="../orderconfirmation/orderconfirm.html">
                            <button type="submit" class="btn btn-primary order-validation">
                              Commander
                            </button>
                            </a>
                            
                          </div>
                          
                        </form>`;


