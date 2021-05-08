main ()

 async function main () {
    const cameras = await getAllCameras();
    for (camera of cameras){
        displayCamera(cameras)
    }   
}

function getAllCameras () {
 fetch ("http://localhost:3000/api/cameras")
    .then(function(httpBodyResponse) {
        return httpBodyResponse.json();
    })
    .then(function(cameras){
    return cameras;
    })
    .catch(function(error) {
        alert(error);
    })

}

function displayCamera() {
    document.getElementById("main").innerHTML +=
    'coucou les zouzous'
}