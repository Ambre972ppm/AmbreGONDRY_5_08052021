//_________________________________récuperation de l'id de la commande dans l'URL_________________________________
const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get('orderId');
console.log(orderId);  

//________________________________________récupération des données contact________________________________________
let contact = JSON.parse(localStorage.getItem("contact"));

//_______________________________________récupération du prix de la commande_______________________________________
let totalPrice = JSON.parse(localStorage.getItem("totalPrice"));
console.log(totalPrice)

//_____________________________________affichage de la confirmation de commande_____________________________________
function displayOrderConfirmation (){
    const formatter = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });
    document.getElementById("confirmation")
            .innerHTML += `
        <h1>Votre commande est confirmée</h1>
        <h2>Bonjour <b>${contact.firstName} ${contact.lastName}</b>
        </h2>
        <p>
        Nous vous remercions pour votre achat et la confiance que vous nous accordez.
        <br/>
        Votre commande <b>${orderId}</b> d'un montant de <b>${formatter.format(totalPrice)}</b>
        est confirmée nous la préparons avec beaucoup d’attention.
        </p>
        <p>
        Lors de son expédition, vous recevrez un mail de confirmation de prise en charge par le transporteur
        à l'adresse suivante <b>${contact.email}</b>.
        </p>
        <p>
        Nous espérons vous revoir très bientôt et que votre nouveau matériel vous apportera toute la satisfaction que vous recherchez.
        <br/>
        <br/>
        <i><b>l'équipe d'Orinocam reste à votre écoute</b></i>
        </p>
    `
};

displayOrderConfirmation()//appel de la fonction pour afficher la confirmation de commande
localStorage.clear()//suppression du contenu du localStorage une fois la commande validée