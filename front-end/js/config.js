function loadConfig(){
    let result = fetch("../../config.json");
    return result.json();
}