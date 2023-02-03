const selectTime = document.querySelectorAll('select');
const currentTime = document.querySelector('h3');
let content = document.querySelector(".content");
const setAlarmBtn = document.querySelector(".Alarmbutton");

let alarmTime = "", isAlarmSet = false,
 ringtone = new Audio("alarmtone.mp3");

//adding hours, minutes, and seconds value.
for (let i = 12; i > 0; i--) {
  i = i<10 ? "0" + i: i;
  let option = `<option value = ${i}>${i}</option>`;
  selectTime[0].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 59; i >= 0; i--) {
  i = i<10 ? "0" + i: i;
  let option = `<option value = ${i}>${i}</option>`;
  selectTime[1].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 2; i > 0; i--) {
  ampm = i==1 ? "AM" : "PM";
  let option = `<option value = ${ampm}>${ampm}</option>`;
  selectTime[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

//showing the currentTime and updating the clock in every second.
setInterval(()=>{
  let date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  let ampm = "AM";

  //changing the clock into 12 Hours clock.
  if(h>12){
    h = h -12;
    ampm = "PM";
  }

  //if hours is 0 then setting it to 12.
  h = h== 0? h = 12: h;

  //adding 0 to hours, minutes, and seconds if it is smaller than 10.
  h = h< 10? "0"+ h: h;
  m = m< 10? "0"+ m: m;
  s = s< 10? "0"+ s: s;

  currentTime.innerText = `${h}:${m}:${s}:${ampm}`;
  if(alarmTime == `${h}:${m}:${ampm}`){
    console.log("Alarm ringing...");
    ringtone.play();
    ringtone.loop();
  }
},1000);

function setAlarm(){
  if(isAlarmSet){
    alarmTime = "";
    ringtone.pause();
    content.classList.remove("disable");
    setAlarmBtn.innerText = "Set Alarm";
    return isAlarmSet = false;
  }
  console.log("Button is clicked...");

  time = `${selectTime[0].value}:${selectTime[1].value}:${selectTime[2].value}`;
  if(time.includes("Hours") || time.includes("Minutes") || time.includes("AM/PM") ){
    return alert("Oops! You have not selected valid time for alarm.");
  }
  isAlarmSet = true;
  alarmTime = time;
  content.classList.add("disable");
  setAlarmBtn.innerText = "Clear Alarm";
}
//Setting the alarm and Clearing the alarm.
setAlarmBtn.addEventListener("click", setAlarm);
