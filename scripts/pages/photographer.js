const next = document.querySelector('.controls-right');
const prev = document.querySelector('.controls-left');
let medias;
let currentMedias = [];
let filterItem = document.querySelectorAll('.filter-item');
const mediaSection = document.querySelector('.photograph-body');


for(let item of filterItem){
    item.addEventListener('click', filterAction, false);
}
function filterAction(e){
    let name = e.target.innerText;
    filterData(name, currentMedias);
}

function filterData(type, medias){
    const selectedFilter = document.querySelector('.selected');
    switch (type){
        case 'Popularité':
            medias.sort((a, b) => {
                return b.likes - a.likes;
            });
            break;
        case 'Date':
            medias.sort((a, b) => {
                return new Date(b.date) - new Date(a.date);
            });
            break;
        case 'Titre':
            medias.sort((a, b) => {
                return a.title.localeCompare(b.title);
            });
            break;
        default:
            return medias;
        }  
        mediaSection.innerHTML = '';
        medias.forEach(media => displayData(media, mediaSection));
    }
    function displayData(media, section){
        const mediaModel = mediasFactory(media);
        let mediaCardDOM;
        if(media.hasOwnProperty('image')){
            //new AdaptedFilter(media);
            mediaCardDOM = mediaModel.imgTemplate();
        }else if(media.hasOwnProperty('video')){
            //new AdaptedFilter(media);
            mediaCardDOM = mediaModel.videoTemplate(); 
        }
          mediaSection.append(mediaCardDOM);
}

prev.addEventListener('click', prevImage)
next.addEventListener('click', nextImage)


function prevImage(){
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
}
function nextImage(){
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
}

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
        const Params = (new URL(document.location).searchParams);
        const Id = Number(Params.get("id"));

        let sum = 0;

        medias.forEach((media) => {
            if(media.photographerId === Id){
                currentMedias.push(media);
                sum += media.likes;
                const likesBlock = document.querySelector(".photograph-likes");
                likesBlock.textContent = sum;
                function nextLightbox(){
                }
                next.addEventListener("click", nextLightbox);
                const icon = document.createElement('i');
                icon.classList.add('tot-likes-icon' ,'fa-solid', 'fa-heart');
                likesBlock.append(icon)
                displayData(media, mediaSection);
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