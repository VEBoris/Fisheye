const next = document.querySelector(".controls-right");
const prev = document.querySelector(".controls-left");
let medias;
let media;
let currentMedias = [];

prev.addEventListener("click", function(){
    let current_img = document.getElementById('current_img');
    let lastId = current_img.getAttribute('data-id');
    let index = currentMedias.findIndex((e) => e.id === parseInt(lastId));
    if(index > 0){
        let currentMedia = currentMedias[index - 1];
        const lightbox = new Lightbox(currentMedia);
        if (currentMedia.hasOwnProperty('image')){
            lightbox.createImgLightbox();
        }else if(currentMedia.hasOwnProperty('video')){
            lightbox.createVidLightbox();
        }
    }
})
next.addEventListener("click", function(){
    let current_img = document.getElementById('current_img');
    let lastId = current_img.getAttribute('data-id');
    let index = currentMedias.findIndex((e) => e.id === parseInt(lastId));
    if(index < currentMedias.length){
        let currentMedia = currentMedias[index + 1];
        const lightbox = new Lightbox(currentMedia);
        if (currentMedia.hasOwnProperty('image')){
            lightbox.createImgLightbox();
        }else if(currentMedia.hasOwnProperty('video')){
            lightbox.createVidLightbox();
        }
    }
})

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
        medias = data.media;
        const mediaSection = document.querySelector(".photograph-body");
        const Params = (new URL(document.location).searchParams);
        const Id = Number(Params.get("id"));

        let sum = 0;

        medias.forEach((element) => {
            if(element.photographerId === Id){
                currentMedias.push(element);
                sum += element.likes;
                const likesBlock = document.querySelector(".photograph-likes");
                likesBlock.textContent = sum;
                function nextLightbox(){
                }
                next.addEventListener("click", nextLightbox);
                const mediaModel = mediasFactory(element);
                let mediaCardDOM;
                if(element.hasOwnProperty('image')){
                    mediaCardDOM = mediaModel.imgTemplate();
                }else if(element.hasOwnProperty('video')){
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