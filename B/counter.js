let seconds = 0;

function updateTimer() {
    seconds++;
    if (seconds === 1)
        document.getElementById("timer").innerHTML = `Na této stránce jste: ${seconds} sekundu`;
    else if (seconds < 5)
        document.getElementById("timer").innerHTML = `Na této stránce jste: ${seconds} sekundy`;
    else
        document.getElementById("timer").innerHTML = `Na této stránce jste: ${seconds} sekund`;
}

setInterval(updateTimer, 1000);