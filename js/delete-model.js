
const currentShift = getCurrentShift();
filter(currentShift);

// let empArray = [1,2,3,4,5];
let empArray = [];
let parseData = {

}


function showSingleEmp(){
    document.querySelector(".single-form").style.display = "flex";
    document.querySelector(".table-container").style.display = "none";
    parseData.type = "single employee";
    
    all_checkbox.forEach(checkbox => {
        checkbox.checked = false;
     });
    empArray = [];
    handleInfoHeader();
}

function showMultiEmp(){
    document.getElementById("empid").value = "";
    document.querySelector(".single-form").style.display = "none";
    document.querySelector(".table-container").style.display = "block";
    parseData.type = "multiple employee";
}

function handleInfoHeader(){
    let selectedCount = empArray.length;
    document.querySelector(".counter .tag").innerHTML = selectedCount;
}

function submitToBackend(){
    parseData.empId = empArray;

    console.log(parseData);
}

function handleCheckbox(checkbox){
    checkbox.click();
    empArray = [];
    all_checkbox.forEach(checkbox => {
      if (checkbox.checked == true) {
       let value = (checkbox.value);
        empArray.push(value);
      }
    });
    handleInfoHeader();
}

console.log(parseData);

const deleteRows = document.querySelectorAll(".delete-table .delete-table-body tr");
const all_checkbox = document.querySelectorAll(".delete-table .delete-table-body tr input[type='checkbox']")
deleteRows.forEach(row => {
    row.addEventListener("click",()=>{
       let checkbox = row.querySelector("input[type='checkbox']");
      handleCheckbox(checkbox);
    });
});

all_checkbox.forEach(checkbox => {
    checkbox.addEventListener("click",function(){
        handleCheckbox(checkbox);
    })
 });

let selectCancel = document.querySelector(".delete-btns.cancel");

selectCancel.addEventListener("click",()=>{
    all_checkbox.forEach(checkbox => {
       checkbox.checked = false;
    });
    empArray = [];
    handleInfoHeader();
});

let inputDelete = document.querySelector(".delete-btns.submit");
let selectDelete = document.querySelector(".delete-btns.confirm");

inputDelete.addEventListener("click", ()=>{
    let input = document.getElementById("empid");
    if (input.value >0) {
        parseData.type = "single employee";
        empArray.push(input.value);
        submitToBackend();
    }else{
        alert("empty input to delete user");
    }
})

selectDelete.addEventListener("click", ()=>{

    if (empArray.length <=0) {
        alert("Select Atleast one Employee to delete..")
    }else{
        parseData.type = "multiple employee";
        submitToBackend();
    }

});