const sidemenu = document.querySelector(".sidemenu");
const toggle_sidemenu = document.querySelector(".toggle_sidemenu");
const main = document.querySelector(".main");
const all_sections = document.querySelectorAll(".section");
const all_click = document.querySelectorAll(".click");

const user = {

}

const oldData = {
    
}

oldData.oldname = document.querySelector(".uname").textContent.trim();
oldData.oldgender = document.querySelector(".ugender").textContent.trim();
oldData.oldemail = document.querySelector(".uemail").textContent.trim();
oldData.oldcontact = document.querySelector(".ucontact").textContent.trim();
oldData.oldaddress = document.querySelector(".uaddress").textContent.trim();
oldData.olddoj = document.querySelector(".udoj").textContent.trim();


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
            document.querySelector(".current_path_name").innerHTML = btn.textContent.trim();
        }else{
            btn.classList.remove("active");
        }
    });
}

let lastClick = localStorage.getItem("lastClick");
if (lastClick != null) {
    showSection(lastClick);
}

const all_btn = document.querySelectorAll(".submit");
const all_cancel = document.querySelectorAll(".cancel");
const all_field = document.querySelectorAll(".input_field");
const all_input = document.querySelectorAll(".input");

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

let response ={
    status : true,
    message : "Your request is submitted to the admin successfully",
}

function message(){
    let model = document.querySelector(".message_model");
    model.classList.add("active");
    if (response.status == true) {
        model.classList.add("success");
        model.querySelector(".title").innerHTML = `
            <i class="fas fa-check-circle"></i>
            Success
        `
    }else{
        model.classList.add("error");
        model.querySelector(".title").innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            Error
        `
    }

    model.querySelector(".message").innerHTML = response.message;

    setTimeout(() => {
        model.classList.remove("active");
    }, 5005);
}

document.querySelector(".model_close").addEventListener("click", ()=>{
    document.querySelector(".message_model").classList.remove("active");
});

message()


all_field.forEach(field => {
    field.addEventListener("click", ()=>{
        all_field.forEach(fld => {
            let input = fld.querySelector(".input");
            if (input) {
                input.setAttribute("readonly",true)
            }
            fld.classList.remove("active")
        });
        field.querySelector(".input").removeAttribute("readonly");
        field.classList.add("active")
    });

});


all_cancel.forEach(btn => {
    btn.addEventListener("click", ()=>{
        let input = btn.previousElementSibling.previousElementSibling;
        
        input.value = user.old;

        btn.previousElementSibling.setAttribute("readonly",true);
        btn.parentElement.classList.remove("active");
        setTimeout(() => {
            btn.parentElement.classList.remove("active");
        }, 50);
    });
});

all_input.forEach(input => {
    input.addEventListener("click", ()=>{
        user.old = input.value;
        user.type = input.getAttribute("name");
        console.log(user);
    });
});