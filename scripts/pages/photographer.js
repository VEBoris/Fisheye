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
        medias.forEach((media) => {
            if(media.photographerId === Id){
                if(media.hasOwnProperty('image')){
                    medias.map(media => new MediaFactory(media, 'img'))
                    const mediaModel = mediasFactory(media);
                    const userCardDOM = mediaModel.imgTemplate(); 
                    mediaSection.append(userCardDOM);
                }else if(media.hasOwnProperty('video')){
                    medias.map(media => new MediaFactory(media, 'video'))
                    const mediaModel = mediasFactory(media);
                    const userCardDOM = mediaModel.videoTemplate();
                    mediaSection.append(userCardDOM);
                }
            }   
        });
    })
}

async function init() {
    // Récupère les datas des photographes
    await getPhotographers();
    const medias = await getMedias();
};
init();