//--------------Main Navigation burger----------------------------     
function openMenu() {

let navMain = document.querySelector(".main-nav"),
    navToggle = document.querySelector(".main-nav__toggle"),
    header = document.querySelector('.page-header');

navToggle.addEventListener('click', function(){
    navMain.classList.toggle('main-nav--closed');
    navMain.classList.toggle('main-nav--opened');
    header.classList.toggle('back');
});

};

export default openMenu;

