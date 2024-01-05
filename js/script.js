let date = new Date()

let currentDate = date.getDate();
let currentMonth = date.getMonth();
let currentYear = date.getFullYear();

let displayDate = (currentDate+"/"+currentMonth+"/"+currentYear);

document.querySelector(".date").innerHTML = `Date : ${displayDate}`;

setInterval(() => {
    document.querySelector(".time").innerHTML = `Time : ${new Date().toLocaleTimeString()}`;
}, 1000);


// const notification_icon = document.querySelector(".notification-icon");

// notification_icon.addEventListener("click", ()=> {
//     document.querySelector(".notification-list").classList.toggle("active");
// });

const toggle = document.querySelector(".toogle-sidebar");

toggle.addEventListener("click", ()=>{
    document.querySelector(".sidebar").classList.toggle("active");
    document.querySelector(".main").classList.toggle("active");
})


document.querySelector('.download-btn').addEventListener('click', function() {
    let confirmation = confirm("are you sure..?");

    if (confirmation) {
        document.querySelector(".model-footer").style.display = 'none';
        html2canvas(document.querySelector('.notification-model')).then(canvas => {
            // Create an image and set its source to the canvas data
            var image = canvas.toDataURL("image/png");
            // Create a temporary link to trigger the download
            var tmpLink = document.createElement('a');
            tmpLink.download = 'username.png'; // Set the download name
            tmpLink.href = image;
            
            // Temporarily add the link to the document and trigger the download
            document.body.appendChild(tmpLink);
            tmpLink.click();
            document.body.removeChild(tmpLink);
            document.querySelector(".model-footer").style.display = 'flex';
        });
    }
});

document.querySelector('.print-btn').addEventListener('click', function() {
    window.print();
});

const bell_btn = document.querySelector(".notification-btn");
const notifications = document.querySelector(".notifications");
const add = document.querySelector(".add");

bell_btn.addEventListener("click", ()=>{
    notifications.classList.toggle("active");
});

add.addEventListener("click", ()=> {
    let li = document.createElement("li");

    li.innerHTML = `
        <li class="notification-box">
                <div class="profile">
                    <img src="asset/images/default.png" alt="default user">
                </div>
                <div class="notification-details">
                    <div class="notification-user-name">
                        User name 1
                    </div>
                    <div class="notification-message">
                        requesting leave regarding late for today bla bla bla
                        requesting leave regarding late for today bla bla bla
                    </div>
                </div>
            </li>

    `;
    notifications.appendChild(li);

    let count = notifications.childElementCount;
    if (count > 9) {
        count = "9+";
    }

    document.querySelector(".count").innerHTML = count;
    
});

document.addEventListener("DOMContentLoaded", function () {
    let all_downloads = document.querySelectorAll(".download");

    all_downloads.forEach(download => {
        download.addEventListener("click", () => {
            let parent = download.parentElement.parentElement.parentElement;
            let table = parent.querySelector('table');

            // Convert the table to a worksheet
            let ws = XLSX.utils.table_to_sheet(table);

            // Create a workbook with a single worksheet
            let wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

            // Convert the workbook to an array buffer
            var wbArrayBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

            // Create a Blob from the array buffer
            var blob = new Blob([wbArrayBuffer], { type: 'application/octet-stream' });

            // Trigger download using FileSaver.js
            let fileName = parent.querySelector(".frame-details").textContent.trim();
            saveAs(blob, `${fileName}.xlsx`);
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    var dropArea = document.getElementById('drop-area');
    var fileInput = document.getElementById('file');
    var actions = document.getElementById('file-actions');
    var cancelBtn = document.getElementById('cancel-btn');
    var fileNameDisplay = document.createElement('p');
    fileNameDisplay.id = 'file-name-display';
    dropArea.appendChild(fileNameDisplay); // Add the file name display to the drop area

    // Function to update UI with file name
    function updateFileNameDisplay(file) {
        fileNameDisplay.innerHTML = file ? `Selected file: <strong>${file.name}</strong>` : '';
    }

    // Open file selector when clicked on the drop area
    dropArea.addEventListener('click', function() {
        fileInput.click();
    });

    fileInput.addEventListener('change', function() {
        handleFileSelection(this.files);
    });

    dropArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        dropArea.classList.add('drag-over');
    });

    dropArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        dropArea.classList.remove('drag-over');
    });

    dropArea.addEventListener('drop', function(e) {
        e.preventDefault(); // Prevent the default action (open as link)
        dropArea.classList.remove('drag-over');
        handleFileSelection(e.dataTransfer.files);
    });
    

    cancelBtn.addEventListener('click', function() {
        clearFileInput();
    });

    function handleFileSelection(files) {
        if (files && files.length > 0) {
            var allowedFileTypes = ['xlsx', 'xls', 'csv'];
            var file = files[0];
            var fileExtension = file.name.split('.').pop().toLowerCase();
    
            if (allowedFileTypes.indexOf(fileExtension) === -1) {
                alert('Invalid file type. Please select a valid file.');
                clearFileInput();
                return;
            }
    
            // Manually set the files for the file input
            fileInput.files = files;
    
            updateFileNameDisplay(file);
            actions.style.display = 'block';
        }
    }
    

    function clearFileInput() {
        fileInput.value = ''; // Clear the file input
        updateFileNameDisplay(null);
        actions.style.display = 'none';
    }
});



let all_radios = document.querySelectorAll('input[type="radio"]');

all_radios.forEach(radio => {
    radio.addEventListener("click",()=>{
        all_radios.forEach(rad =>{
            rad.parentElement.classList.remove("active");
        });
        if (radio.checked == true) {
            radio.parentElement.classList.add('active');
        }
    })
});

const upload_model = document.querySelector(".upload-model");
const uploadClose = document.querySelectorAll(".close-btn");

uploadClose.forEach(element => {
    element.addEventListener("click",()=>{
        element.parentElement.parentElement.style.display = "none";
    });
});

const upload_button = document.querySelector(".upload-option");

upload_button.addEventListener("click", ()=>{
    upload_model.style.display = "flex";
});

const delete_option = document.querySelector(".delete-option");

delete_option.addEventListener("click",()=>{
    document.querySelector(".delete-model").style.display = "flex";
});

const edit_option = document.querySelector(".edit-option");

edit_option.addEventListener("click",()=>{
    document.querySelector(".edit-model").style.display = "flex";
});




let empArray = [];



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
        empArray.push(input.value);
    }else{
        alert("empty input to delete user");
    }
})

selectDelete.addEventListener("click", ()=>{

    if (empArray.length <=0) {
        alert("Select Atleast one Employee to delete..")
    }
});