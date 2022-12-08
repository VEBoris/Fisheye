//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json
    fetch("./data/photographers.json")
    .then(function(res){
        if(res.ok){
            return res.json();
        }
    })
    .then(function(data){
        const photographers = data.photographers;
        const photographersSection = document.querySelector(".photograph-header");
        const Params = (new URL(document.location).searchParams);
        const Id = Number(Params.get("id"));        
        photographers.forEach((photographer) => {
            if (photographer.id === Id) {
                const photographerModel = photographerFactory(photographer);
                const userCardDOM = photographerModel.user();
                photographersSection.append(userCardDOM);   
            }
        });
    })  
    .catch(function(err){
    })
    // et bien retourner le tableau photographers seulement une fois
}    
async function init() {
    // Récupère les datas des photographes
    await getPhotographers();
};
init();