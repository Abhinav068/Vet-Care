const slottimes = {
    1: "T11:00",
    2: "T11:30",
    3: "T12:00",
    4: "T12:30",
    5: "T13:00",
}

function getTime(date, slotno) {
    return date+slottimes[slotno]
}

module.exports={getTime}