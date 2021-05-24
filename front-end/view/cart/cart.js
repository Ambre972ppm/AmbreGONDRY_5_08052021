const url = "http://localhost:3000/api/cameras/"; // URL de l'API
const urlPost = "http://localhost:3000/api/cameras/order"; // URL API request POST

const cart = document.getElementById("cart");

cart.innerHTML += 
`<form class="row g-3">
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
      <input type="text" class="form-control" id="inputAddress" placeholder="12 rue des Lilas" required>
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
      <input type="text" class="form-control" id="inputZip" placeholder="69000" pattern="[0-9]{5}"required>
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
      <button type="submit" class="btn btn-primary">
      <a id="orderConfirm" href ="../orderconfirmation/orderconfirm.html">
        Commander
      </a></button>
    </div>
                    
  </form>`;

                            