const all_rows = document.querySelectorAll(".today-attendance-table tbody tr");
const all_shiftDisplay = document.querySelectorAll(".currentShift");

let shiftSelect = document.getElementById("shift");

shiftSelect.addEventListener("change",()=>{
    let shift = shiftSelect.value;
    if (shift == "" || shift.lenght <= 0) {
        let currentShift = getCurrentShift();
        filter(currentShift)
    }else{
        filter(shift.toLowerCase());
    }
    

})

function filter(currentShift){
    all_rows.forEach(row => {

        if ((currentShift) == (row.getAttribute("data-shift").toLowerCase())) {
            row.style.display = "";
        }else{
            row.style.display = "none";
        }
    });

    all_shiftDisplay.forEach(display => {
        display.children[0].innerHTML = currentShift.toUpperCase();
    });
}

function getCurrentShift() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    if (currentHour >= 6 && currentHour < 14) {
        return 'a';
    } else if (currentHour >= 14 && currentHour < 22) {
        return 'b';
    } else {
        return 'c';
    }
}


const currentShift = getCurrentShift();
filter(currentShift);

all_rows.forEach(row => {
    let intime = (row.querySelector(".intime"));
    let outtime = (row.querySelector(".outtime"));
    if ((intime && (intime.innerHTML == "-" || intime.innerHTML =="")) || (outtime && (outtime.innerHTML == "-" || outtime.innerHTML ==""))) {
      row.classList.add("mis-pinch");
      if (intime.innerHTML =="-") {
        intime.innerHTML = `<div class="table-tag">Punch in</div>`;
      }else{
        outtime.innerHTML = `<div class="table-tag">Punch out</div>`;
      }

      row.querySelector(".action").innerHTML = (`
        <div class="btns-container">
            <button type="button" class="table-btn cancel">Cancel</button>
            <button type="button" class="table-btn continue">Continue</button>
        </div>
      `)

    }else{
      row.classList.remove("mis-pinch");
    }
  
  });

  function getCurrentShiftTime() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    // Function to convert 24-hour format to 12-hour format
    const convertTo12HourFormat = (hour) => {
        return hour % 12 || 12; // If the hour is 0, it should be 12 in 12-hour format
    };

    let shift = '';
    let minutesBeforeChange = 0;

    if (currentHour >= 6 && currentHour < 14) {
        shift = 'a';
        if (currentHour === 14) {
            minutesBeforeChange = 60 - currentMinute;
        } else {
            minutesBeforeChange = currentHour < 14 ? (14 - currentHour - 1) * 60 + (60 - currentMinute) : 0;
        }
    } else if (currentHour >= 14 && currentHour < 22) {
        shift = 'b';
        if (currentHour === 22) {
            minutesBeforeChange = 60 - currentMinute;
        } else {
            minutesBeforeChange = currentHour < 22 ? (22 - currentHour - 1) * 60 + (60 - currentMinute) : 0;
        }
    } else {
        shift = 'c';
        if (currentHour === 6) {
            minutesBeforeChange = 60 - currentMinute;
        } else {
            minutesBeforeChange = currentHour < 6 ? (6 - currentHour - 1) * 60 + (60 - currentMinute) : 0;
        }
    }

    const currentShiftStartTime = convertTo12HourFormat(currentHour) + ':' +
                                   (currentMinute < 10 ? '0' : '') + currentMinute +
                                   (currentHour < 12 ? ' AM' : ' PM');

    return { shift, minutesBeforeChange, currentShiftStartTime };
}

const result = getCurrentShiftTime();
console.log(`Current Shift: ${result.shift}`);
console.log(`Current Shift Start Time: ${result.currentShiftStartTime}`);
console.log(`Shift changed ${result.minutesBeforeChange} minutes ago.`);
