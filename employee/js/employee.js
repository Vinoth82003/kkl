const sidemenu = document.querySelector(".sidemenu");
const toggle_sidemenu = document.querySelector(".toggle_sidemenu");
const main = document.querySelector(".main");

toggle_sidemenu.addEventListener("click",()=>{
    sidemenu.classList.toggle("active");
    toggle_sidemenu.classList.toggle("active");
    main.classList.toggle("active");
});

