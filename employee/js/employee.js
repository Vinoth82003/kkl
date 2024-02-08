const sidemenu = document.querySelector(".sidemenu");
const toggle_sidemenu = document.querySelector(".toggle_sidemenu");
const main = document.querySelector(".main");
const all_sections = document.querySelectorAll(".section");
const all_click = document.querySelectorAll(".click");

const user = {

}

let uId = document.querySelector(".uid").textContent.trim();
user.empId = uId;

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
        showSection(index)
        localStorage.setItem("lastClick",index);
    // click.classList.add("active");
    });
});

function showSection(index) {
    all_sections.forEach(section => {
        let sectionIndex = section.getAttribute("index");
        if (index == sectionIndex) {
            section.style.display = "block";
        }else{
            section.style.display = "none";
        }
    });
    all_click.forEach(btn => {
        if (index == btn.getAttribute("index")) {
            btn.classList.add("active");
        }else{
            btn.classList.remove("active");
        }
    });
}

let lastClick = localStorage.getItem("lastClick");
if (lastClick != null) {
    showSection(lastClick);
}

const all_input = document.querySelectorAll(".input");
const all_btn = document.querySelectorAll(".submit");
const all_cancel = document.querySelectorAll(".cancel");
const all_field = document.querySelectorAll(".input_field");

all_input.forEach(input => {
    input.addEventListener("click", () => {
        input.removeAttribute("readonly");
        let type = (input.getAttribute("name"));
        user.type = type;
        user.old = input.value;
        input.parentElement.classList.add("active")
    });
});

all_btn.forEach(btn => {
    btn.addEventListener("click", ()=>{
        let newvalue = btn.previousElementSibling.value
        if (newvalue.length > 0) {
            user.new = (newvalue);
        }else{
            user.new = user.old;
        }
        btn.previousElementSibling.value = user.new;
        // send data to backend
        console.log(user);
    })
});

all_cancel.forEach(btn => {
    btn.addEventListener("click", ()=>{
        btn.previousElementSibling.setAttribute("readonly",true);
        btn.parentElement.classList.remove("active");

        let input = btn.previousElementSibling.previousElementSibling;
        input.value = user.old;
    });
});

all_field.forEach(field => {
    field.addEventListener("blur", ()=>{
        field.querySelector("input").setAttribute("readonly",true);
        field.classList.remove("active")
    });
});
