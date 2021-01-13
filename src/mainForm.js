"use strict";
function forma() {


// JQUERY ------- Phone validation  -------------------
$(function($) {
    $('input[name="phone"]').mask("+7 (999) 999-99-99");
});
//-----------------------------------------------------

let form = document.querySelector('form'),
    btnSubmit = document.querySelector('.button-submit');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    fetch("/backend/contestForm.php", {
        method: "POST",
        body: new FormData(form)
    })
    .then((response) => {
        if (response.ok) {
            return response.text();
        } else {
            console.error("Что-то пошло не так" + response.status)
        }
    })
    .then((result) => {
        if (result == 'ok') {
            successMessage();
        } else {
            failureMessage();
        }
    });
    form.reset();
});    

function successMessage() {
    let modalSuccess = document.querySelector('.modal-success')
    modalSuccess.classList.add('show-modal--success');
};

function failureMessage() {
    let modalFailure = document.querySelector('.modal-failure');
    modalFailure.classList.add('show-modal--failure');
};

let btnCloseModal = document.querySelectorAll('.modal-button');

btnCloseModal.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.target.parentElement.parentElement.classList.remove('show-modal--success', 'show-modal--failure')
    });
});
};

export default forma;