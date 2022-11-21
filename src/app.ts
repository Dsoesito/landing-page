const time: HTMLElement | null = document.getElementById("time");
const greeting: HTMLElement | null = document.getElementById("greeting");
const user: HTMLElement | null = document.getElementById("name");
const activity: HTMLElement | null = document.getElementById("focus");

const showAmPm = true;

function showTime() {
  // let today = new Date(2019, 06, 10, 19, 33, 30);
  let today = new Date(),
    hour: number = today.getHours(),
    min: number  = today.getMinutes(),
    sec: number  = today.getSeconds();

  const amPm = hour >= 12 ? "PM" : "AM";

  hour = hour % 12 || 12;

  if (time) {
    time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
      sec
    )} ${showAmPm ? amPm : ""}`;
  }

  setTimeout(showTime, 1000);
}

function addZero(n: number) {
  return (parseInt(n.toString(), 10) < 10 ? "0" : "") + n;
}

function setBgGreet() {
  // let today = new Date(2019, 06, 10, 19, 33, 30);
  let today: Date = new Date(),
    hour = today.getHours();
  
  if (greeting) {
    if (hour < 12) {
      document.body.style.backgroundImage = "url('img/morning.jpg')";
      greeting.textContent = "Good Morning";
    } else if (hour < 18) {
      document.body.style.backgroundImage = "url('img/afternoon.png')";
      greeting.textContent = "Good Afternoon";
    } else {
      document.body.style.backgroundImage = "url('img/night.jpg')";
      greeting.textContent = "Good Evening";
    }
  }

}

function getName() {
  if (user) {
    if (localStorage.getItem("name") === null) {
      user.textContent = "[Enter Name]";
    } else {
      user.textContent = localStorage.getItem("name");
    }
  }
}

function setName(e: Event) {
  if (e.type === "keypress" && user && e.target) {
    if ((<any>e).which == 13 || (<any>e).keyCode == 13) {
      localStorage.setItem("name", (<any>e).target.innerText);
      user.blur();
    }
  } else {
    if (e.target){
      localStorage.setItem("name", (<any>e).target.innerText);
    }
  }
}

function getFocus() {
  if (activity) {
    if (localStorage.getItem("focus") === null) {
      activity.textContent = "[Enter Focus]";
    } else {
      activity.textContent = localStorage.getItem("focus");
    }
  }
}

function setFocus(e: Event) {
  if (e.type === "keypress" && activity && e.target) {
    if ((<any>e).which == 13 || (<any>e).keyCode == 13) {
      localStorage.setItem("focus", (<any>e).target.innerText);
      activity.blur();
    }
  } else {
    if (e.target) {
      localStorage.setItem("focus", (<any>e).target.innerText);
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

// https://www.w3schools.com/jsref/met_storage_removeitem.asp
