let shiftDetails = [
    {
        shiftName: "A",
        shiftIntime: "06:00",
        shiftOuttime: "14:00"
    },
    {
        shiftName: "B",
        shiftIntime: "14:00",
        shiftOuttime: "22:00"
    },
    {
        shiftName: "C",
        shiftIntime: "22:00",
        shiftOuttime: "06:00"
    }
];

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
                shiftStartTime: shiftStartTime
            };
        }
    }

    return {
        currentShift: "No shift found",
        timeRemaining: 0,
        shiftStartTime: "N/A"
    };
}

function getTimeSinceShiftStarted(shiftStartTime, currentTime) {
    const [startHours, startMinutes] = shiftStartTime.split(":").map(Number);
    const [currentHours, currentMinutes] = currentTime.split(":").map(Number);

    const startTotalMinutes = startHours * 60 + startMinutes;
    const currentTotalMinutes = currentHours * 60 + currentMinutes;

    const elapsedMinutes = currentTotalMinutes - startTotalMinutes;
    return elapsedMinutes;
}

const currentTime = new Date();
const currentHours = currentTime.getHours();
const currentMinutes = currentTime.getMinutes();
const currentSeconds = currentTime.getSeconds();
const formattedCurrentTime = `${currentHours}:${currentMinutes}:${currentSeconds}`;

console.log(`Current Time: ${formattedCurrentTime}`);

const shiftInfo = getCurrentShiftInfo(formattedCurrentTime);
console.log(`Current Shift: ${shiftInfo.currentShift}`);
console.log(`Time Remaining for Next Shift: ${Math.floor(shiftInfo.timeRemaining / 60)} hours and ${shiftInfo.timeRemaining % 60} minutes`);

// Calculate time elapsed since the shift started
if (shiftInfo.currentShift !== "No shift found") {
    const elapsedMinutes = getTimeSinceShiftStarted(shiftInfo.shiftStartTime, formattedCurrentTime);
    console.log(`Time Elapsed Since Shift Started: ${Math.floor(elapsedMinutes / 60)} hours and ${elapsedMinutes % 60} minutes`);
} else {
    console.log("No shift found. Unable to calculate elapsed time.");
}
