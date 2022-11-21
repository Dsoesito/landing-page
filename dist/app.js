"use strict";
const time = document.getElementById("time");
const greeting = document.getElementById("greeting");
const user = document.getElementById("name");
const activity = document.getElementById("focus");
const showAmPm = true;
function showTime() {
    let today = new Date(), hour = today.getHours(), min = today.getMinutes(), sec = today.getSeconds();
    const amPm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    if (time) {
        time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)} ${showAmPm ? amPm : ""}`;
    }
    setTimeout(showTime, 1000);
}
function addZero(n) {
    return (parseInt(n.toString(), 10) < 10 ? "0" : "") + n;
}
function setBgGreet() {
    let today = new Date(), hour = today.getHours();
    if (greeting) {
        if (hour < 12) {
            document.body.style.backgroundImage = "url('img/morning.jpg')";
            greeting.textContent = "Good Morning";
        }
        else if (hour < 18) {
            document.body.style.backgroundImage = "url('img/afternoon.png')";
            greeting.textContent = "Good Afternoon";
        }
        else {
            document.body.style.backgroundImage = "url('img/night.jpg')";
            greeting.textContent = "Good Evening";
        }
    }
}
function getName() {
    if (user) {
        if (localStorage.getItem("name") === null) {
            user.textContent = "[Enter Name]";
        }
        else {
            user.textContent = localStorage.getItem("name");
        }
    }
}
function setName(e) {
    if (e.type === "keypress" && user && e.target) {
        if (e.which == 13 || e.keyCode == 13) {
            localStorage.setItem("name", e.target.innerText);
            user.blur();
        }
    }
    else {
        if (e.target) {
            localStorage.setItem("name", e.target.innerText);
        }
    }
}
function getFocus() {
    if (activity) {
        if (localStorage.getItem("focus") === null) {
            activity.textContent = "[Enter Focus]";
        }
        else {
            activity.textContent = localStorage.getItem("focus");
        }
    }
}
function setFocus(e) {
    if (e.type === "keypress" && activity && e.target) {
        if (e.which == 13 || e.keyCode == 13) {
            localStorage.setItem("focus", e.target.innerText);
            activity.blur();
        }
    }
    else {
        if (e.target) {
            localStorage.setItem("focus", e.target.innerText);
        }
    }
}
if (user && activity) {
    user.addEventListener("keypress", setName);
    user.addEventListener("blur", setName);
    activity.addEventListener("keypress", setFocus);
    activity.addEventListener("blur", setFocus);
}
showTime();
setBgGreet();
getName();
getFocus();
//# sourceMappingURL=app.js.map