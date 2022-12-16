const photographersSection = document.querySelector('.photographer_section');
async function getPhotographers() {
// Penser à remplacer par les données récupérées dans le json
    fetch('./data/photographers.json')
        .then(function(res){
            if(res.ok){
                return res.json();
            }
        })
        .then(function(data){
            const photographers = data.photographers;
            photographers.forEach((photographer) => {
                displayPhotographers(photographer, photographersSection);
            });
        })
    // et bien retourner le tableau photographers seulement une fois
}    
async function init() {
    // Récupère les datas des photographes
    await getPhotographers();
}

function displayPhotographers(photographer, Section){
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    Section.appendChild(userCardDOM);
}
    
    init();