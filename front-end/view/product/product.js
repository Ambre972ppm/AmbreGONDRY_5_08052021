



const getInfoCamera = async() =>{
    let id = ;
    let response = await fetch(`http://localhost:3000/api/cameras/${id}`);
    let data = await response.json();
    console.log(data);
}

getInfoCamera();
