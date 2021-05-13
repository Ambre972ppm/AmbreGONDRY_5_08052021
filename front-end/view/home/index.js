let cameraPicture = "imageUrl";
let cameraId = "_id";
let cameraName = "name";
let cameraPrice = "price";
let cameraDescription = "description";
let cameraLenses = "lenses";


loadingConfig()
    .then(data =>{
        fetch (config.host +"/api/cameras")
        .then( data => data.json())
        .then( jsonListCamera => {
        for(let jsonCamera of jsonListCamera){
            let camera = new Camera(jsonCamera);
            
        };     
    })
});