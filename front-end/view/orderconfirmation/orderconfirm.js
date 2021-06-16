//_________________________________récuperation de l'id de la commande dans l'URL_________________________________
const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get('orderId');
console.log(orderId);  

//________________________________________récupération des données contact________________________________________
let contact = JSON.parse(localStorage.getItem("contact")).map;

//_______________________________________récupération du prix de la commande_______________________________________
let totalPrice = JSON.parse(localStorage.getItem("totalPrice"));
console.log(totalPrice)

//_____________________________________affichage de la confirmation de commande_____________________________________
function displayOrderConfirmation (){
    confirmation.innerHTML += `
        <h2>Bonjour <b>${contact.firstName } ${contact.lastName}</b>
        </h2>
        <p>
        Nous vous remercions pour votre confiance
        Et vous confirmons la bonne réception de votre commande N° <b>${orderId}</b>
        d'un montant de <b>${totalPrice}</b>  
        nous la préparons avec beaucoup d’attention ! 
        </p>
        <p>
        Lors de son expédition, vous recevrez un mail de confirmation de prise en charge par le transporteur
        à l'adresse suivante ${contact.email}.
        </p>
        <p>
        Nous espérons vous revoir bientôt.
        l'équipe d'Orinocam reste à votre écoute
        </p>
    `
};

displayOrderConfirmation();