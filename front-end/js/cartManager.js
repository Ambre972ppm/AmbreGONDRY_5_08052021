/**
 * Gestion des produits du panier, enregistrement d'un produit en favoris, retrait d'un article des favoris et récupération de la liste des favoris
 */

function addToCart(cameraId){
    let cartList = getToCart();
    cartList.push(camerasId);
    saveToCart(cartList);
}

function getToCart(){
    let cartList = localStorage.getItem("cartList");
    if(cartList == null){
        return[];
    }else{
        return JSON.parse(cartList);
    }
}

function saveToCart(cartList){
    localStorage.setItem("cartList", JSON.stringify(cartList));
}