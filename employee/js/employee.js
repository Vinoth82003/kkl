const sidemenu = document.querySelector(".sidemenu");
const toggle_sidemenu = document.querySelector(".toggle_sidemenu");
const main = document.querySelector(".main");
const all_sections = document.querySelectorAll(".section");
const all_click = document.querySelectorAll(".click");

// toggle sidemenu
toggle_sidemenu.addEventListener("click",()=>{
    sidemenu.classList.toggle("active");
    toggle_sidemenu.classList.toggle("active");
    main.classList.toggle("active");
});

// display respective sections
all_click.forEach(click => {
    click.addEventListener("click", ()=>{
        let index = click.getAttribute("index");
        document.querySelector(".current_path_name").innerHTML = click.textContent.trim();
    all_sections.forEach(section => {
        let sectionIndex = section.getAttribute("index");
        if (index == sectionIndex) {
            section.style.display = "block";
        }else{
            section.style.display = "none";
        }
    });
    all_click.forEach(btn => {
        btn.classList.remove("active");
    });
    click.classList.add("active");
    });
});