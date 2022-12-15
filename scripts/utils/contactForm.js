const closeForm = document.querySelectorAll(".close");
const body = document.querySelector('body');
const openForm = document.querySelector('.contact_button');
const modal = document.querySelector("#contact_modal");
const lightbox = document.querySelector("#lightbox");
const main = document.querySelector("#main");

function displayModal() {
    modal.setAttribute("aria-hidden", "false");
    modal.setAttribute("role", "dialog");
    modal.style.display = "flex";
}

function closeModal() {
    modal.setAttribute("aria-hidden", "true");
    modal.style.display = "none";
    lightbox.style.display = "none";
}

const filter = document.querySelector('#filter-select');
const options = document.querySelector('.filter-container');

filter.addEventListener("click", function(e){
    e.preventDefault();
    if(options.classList.contains('hide')){
        options.classList.remove('hide');
    }else{
        options.classList.add('hide');
    }
})

openForm.addEventListener('click', displayModal);

closeForm.forEach((close) => close.addEventListener('click', closeModal));

body.addEventListener('keydown', function(e){
    if (e.key === "Escape"){
        closeModal();
    }
})

const modalbg = document.querySelector(".modal");
const firstName = document.querySelector("#first");
const lastName = document.querySelector("#last");
const emailName = document.querySelector("#email");
const message = document.querySelector("#message");

function checkForm(){
    const elements = document.getElementsByName('modal-input');
    const array = Array.from(elements);
    for(let element of array){
        console.log(element.value);
    }
}

function validateModal(){
    modal.addEventListener('submit', function(e){
        e.preventDefault();
        checkForm();
    })
}