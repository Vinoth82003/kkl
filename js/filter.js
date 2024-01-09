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

  console.log("filter.js");
  console.log("filter.js");

  let shiftDetails = [
      {
          shiftName: "8A",
          shiftIntime: "06:00",
          shiftOuttime: "14:00"
      },
      {
          shiftName: "8B",
          shiftIntime: "14:00",
          shiftOuttime: "22:00"
      },
      {
          shiftName: "8C",
          shiftIntime: "22:00",
          shiftOuttime: "06:00"
      }
  ];
  
  let alertSent = false;
  let elapsedMinutes = 0; // Declare elapsedMinutes outside the functions
  
  function getCurrentShiftInfo(currentTime) {
      const [currentHours, currentMinutes] = currentTime.split(":").map(Number);
  
      for (const shift of shiftDetails) {
          const shiftIntime = shift.shiftIntime.split(":").map(Number);
          const shiftOuttime = shift.shiftOuttime.split(":").map(Number);
  
          if (
              (currentHours > shiftIntime[0] || (currentHours === shiftIntime[0] && currentMinutes >= shiftIntime[1])) &&
              (currentHours < shiftOuttime[0] || (currentHours === shiftOuttime[0] && currentMinutes < shiftOuttime[1]))
          ) {
              const remainingMinutes = (shiftOuttime[0] * 60 + shiftOuttime[1]) - (currentHours * 60 + currentMinutes);
              const shiftStartTime = `${shiftIntime[0]}:${shiftIntime[1]}`;
              
              return {
                  currentShift: shift.shiftName,
                  timeRemaining: remainingMinutes,
                  shiftStartTime: shiftStartTime,
                  totalShiftTime: (shiftOuttime[0] * 60 + shiftOuttime[1])
              };
          }
      }
  
      return {
          currentShift: "No shift found",
          timeRemaining: 0,
          shiftStartTime: "N/A",
          totalShiftTime: 0
      };
  }
  
  function convertMinutesToHoursAndMinutes(minutes) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return { hours, minutes: remainingMinutes };
  }
  
  function getTimeSinceShiftStarted(shiftStartTime, currentTime) {
      const [startHours, startMinutes] = shiftStartTime.split(":").map(Number);
      const [currentHours, currentMinutes] = currentTime.split(":").map(Number);
  
      const startTotalMinutes = startHours * 60 + startMinutes;
      const currentTotalMinutes = currentHours * 60 + currentMinutes;
  
      return currentTotalMinutes - startTotalMinutes;
  }
  
  function calculatePercentage(timeTaken, totalShiftTime) {
      return (timeTaken / totalShiftTime) * 100;
  }
  
  function calculateShiftProgress(elapsedMinutes, totalShiftTime) {
      const progressPercentage = (elapsedMinutes / totalShiftTime) * 100;
      return progressPercentage.toFixed(2);
  }
  
  function calculateCompletionPercentage(elapsedMinutes, totalShiftTime) {
      const completionPercentage = calculatePercentage(elapsedMinutes, totalShiftTime);
      console.log(`Percentage of Completion: ${completionPercentage.toFixed(2)}%`);
  }
  
  function sendAlert() {
      // Implement the logic to send an alert
      console.log("Alert sent!");
  }
  
  function logElapsedTime() {
      const currentTime = new Date();
      const currentHours = currentTime.getHours();
      const currentMinutes = currentTime.getMinutes();
      const formattedCurrentTime = `${currentHours}:${currentMinutes}`;
  
      const shiftInfo = getCurrentShiftInfo(formattedCurrentTime);
      // Calculate time elapsed since the shift started
      if (shiftInfo.currentShift !== "No shift found") {
          elapsedMinutes = getTimeSinceShiftStarted(shiftInfo.shiftStartTime, formattedCurrentTime);
          const elapsedHoursAndMinutes = convertMinutesToHoursAndMinutes(elapsedMinutes);
        //   console.log(`Time Elapsed Since Shift Started: ${elapsedHoursAndMinutes.hours} hours ${elapsedHoursAndMinutes.minutes} minutes`);
  
          // Log the "Time Remaining for Next Shift" message
        //   console.log(`Time Remaining for Next Shift: ${convertMinutesToHoursAndMinutes(shiftInfo.timeRemaining).hours} hours ${convertMinutesToHoursAndMinutes(shiftInfo.timeRemaining).minutes} minutes`);
      } else {
          console.log("No shift found. Unable to calculate elapsed time.");
      }
  }
  
  function checkElapsedTime() {
      logElapsedTime();
  
      // Check if 17 minutes have elapsed and alert has not been sent
      if (elapsedMinutes >= 10 && !alertSent) {
          console.log("Alert: 10 minutes have elapsed since the shift started!");
          sendAlert();
          alertSent = true; // Set flag to true to indicate that the alert has been sent
      }
  }
  
  setInterval(checkElapsedTime, 1000); // Check every 1000 milliseconds (1 second)
  setInterval(logElapsedTime, 10000); // Log every 10 seconds
  