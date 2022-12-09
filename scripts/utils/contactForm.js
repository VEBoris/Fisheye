const closeForm = document.querySelector(".close");
const openForm = document.querySelector('.contact_button');
const modal = document.querySelector("#contact_modal");
const main = document.querySelector("#main");

function displayModal() {
    modal.setAttribute("aria-hidden", "false");
    modal.setAttribute("role", "dialog");
	modal.style.display = "block";
}

function closeModal() {
    modal.setAttribute("aria-hidden", "true");
    modal.style.display = "none";
}

openForm.addEventListener('click', displayModal);

closeForm.addEventListener('click', closeModal);

main.addEventListener('keydown', function(e){
    if (e.keyCode === 27){
        closeModal();
    }
})
modal.addEventListener('keydown', function(e){
    if (e.keyCode === 27){
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