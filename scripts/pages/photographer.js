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

async function getMedias(){
    fetch('./data/photographers.json')
    .then(function(res){
        if(res.ok){
            return res.json()
        }
    })
    .then(function(data){
        const medias = data.media;
        const mediaSection = document.querySelector(".photograph-body");
        const Params = (new URL(document.location).searchParams);
        const Id = Number(Params.get("id"));

        let sum = 0;

        medias.forEach((media) => {
            if(media.photographerId === Id){
                sum += media.likes;
                const likesBlock = document.querySelector(".photograph-likes");
                likesBlock.textContent = sum;
                // function nextLightbox(){
                //     console.log(media);
                // }
                // next.addEventListener("click", nextLightbox);
                const mediaModel = mediasFactory(media);
                let mediaCardDOM;
                if(media.hasOwnProperty('image')){
                    mediaCardDOM = mediaModel.imgTemplate();
                }else if(media.hasOwnProperty('video')){
                    mediaCardDOM = mediaModel.videoTemplate();
                }
                mediaSection.append(mediaCardDOM);
            }   
        });
    })
}

async function init() {
    // Récupère les datas des photographes
    await getPhotographers();
    await getMedias();
};
init();