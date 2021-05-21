//récuperation de l'id du produit sélectionné
const urlParams = new URLSearchParams(window.location.search);
const cameraId = urlParams.get('id');
console.log(cameraId)


//affichage de l'appareil selectionné
const displayCamera = camera => {
    let id = cameraId ;
     fetch(`http://localhost:3000/api/cameras/${id}`)
        .then(function(res) {
            if (res.ok) {
            return res.json();
            }
        })
        .then(function(value) {
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
                                                    <option> ${value.lenses[0]} </option>
                                                    <option> ${value.lenses[1]} </option>
                                                    <option> ${value.lenses[2]} </option>
                                            </select>
                                            <p class="price">Prix unitaire :<b> ${value.price/100} €</b></p>
                                            <button>
                                                <a id="addToCart">
                                                    Ajouter au Panier
                                                </a>
                                            </button>
                                        </figcaption>
                                    </figure>
                                </aside>`;
        })
        .catch(function(err) {
            alert("une erreur s'est produite")
  });
}
displayCamera()