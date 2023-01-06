const next = document.querySelector('.controls-right');
const prev = document.querySelector('.controls-left');
let medias;
let currentMedias = [];
let filterItem = document.querySelectorAll('.filter-item');
document.querySelector('.selected').innerHTML = 'Popularité';
const mediaSection = document.querySelector('.photograph-body');

for(let item of filterItem){
    item.addEventListener('click', filterAction, false);
    item.addEventListener('keypress', filterAction, false);
}
function filterAction(e){
    console.log("test filtre")
    let name = e.target.innerText;
    filterItem.forEach(filter => {
        filter.style.display = 'block';
    });
    e.target.style.display = 'none';
    filterData(name, currentMedias);
}

function filterData(type, medias){
    const selectedFilter = document.querySelector('.selected').innerHTML = type;
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
    if(Object.prototype.hasOwnProperty.call(media, 'image')){
        mediaCardDOM = mediaModel.imgTemplate();
    }else if(Object.prototype.hasOwnProperty.call(media, 'video')){
        mediaCardDOM = mediaModel.videoTemplate(); 
    }
    section.append(mediaCardDOM);
}

prev.addEventListener('click', prevImage);
next.addEventListener('click', nextImage);


function prevImage(){
    let current_img = document.getElementById('current_img');
    let lastId = current_img.getAttribute('data-id');
    let index = currentMedias.findIndex((e) => e.id === parseInt(lastId));
    if(index > 0){
        let currentMedia = currentMedias[index - 1];
        const lightbox = new Lightbox(currentMedia);
        if (Object.prototype.hasOwnProperty.call(currentMedia, 'image')){
            lightbox.createImgLightbox();
        }else if(Object.prototype.hasOwnProperty.call(currentMedia, 'video')){
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
        if (Object.prototype.hasOwnProperty.call(currentMedia, 'image')){
            lightbox.createImgLightbox();
        }else if(Object.prototype.hasOwnProperty.call(currentMedia, 'video')){
            lightbox.createVidLightbox();
        }
    }
}

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
            const photographersSection = document.querySelector('.photograph-header');
            const Params = (new URL(document.location).searchParams);
            const Id = Number(Params.get('id'));
            photographers.forEach((photographer) => {
                if (photographer.id === Id) {
                    const photographerModel = photographerFactory(photographer);
                    const userCardDOM = photographerModel.user();
                    photographersSection.append(userCardDOM);   
                }
            });
        })
}

async function getMedias(){
    fetch('./data/photographers.json')
        .then(function(res){
            if(res.ok){
                return res.json();
            }
        })
        .then(function(data){
            //
            medias = data.media;
            const Params = (new URL(document.location).searchParams);
            const Id = Number(Params.get('id'));

            // sommes des likes
            let sum = 0;
            medias.forEach((media) => {
                    // verification d'une correspondence des medias avec l'ID des photographes
                
                    if(media.photographerId === Id){
                        // somme des likes au total
                        currentMedias.push(media);
                        sum += media.likes;
                        const likesBlock = document.querySelector('.photograph-likes');
                        likesBlock.textContent = sum;
                        
                        const icon = document.createElement('i');
                        icon.classList.add('tot-likes-icon' ,'fa-solid', 'fa-heart');
                        likesBlock.append(icon);
                        // vérication image/vidéo
                        displayData(media, mediaSection);
                    }   
                });
        })
        .catch(function(err){
            console.log(err);
        });
}


async function init() {
    // Récupère les datas des photographes
    await getPhotographers();
    await getMedias();
}
init();