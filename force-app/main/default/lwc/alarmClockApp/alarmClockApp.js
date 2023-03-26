import { LightningElement } from 'lwc';
import AlarmClockAssests from '@salesforce/resourceUrl/AlarmClockAssests';

export default class AlarmClockApp extends LightningElement {

    clockImage = AlarmClockAssests+'/AlarmClockAssets/clock.png';
    ringtone = new Audio(AlarmClockAssests+'/AlarmClockAssets/Clocksound.mp3');
    currentTime = '';
    hours = [];
    minutes = [];
    meridiems = ['AM', 'PM'];
    alarmTime
    isAlarmSet = false;
    isAlarmTriggered = false;

    hourSelected
    minSelected
    meridiemSelected

    get isFieldNotSelected(){
        return !(this.hourSelected && this.minSelected && this.meridiemSelected);
    }

    get shakeImage(){
        return this.isAlarmTriggered ? 'shake':'';
    }

    connectedCallback(){
        this.createHoursOptions();
        this. createMinutesOptions();
        this.currentTimeHandler();
    }

    currentTimeHandler(){
        setInterval(()=>{

            let dateTime = new Date();
            let hour = dateTime.getHours();
            let min = dateTime.getMinutes();
            let sec = dateTime.getSeconds();
            let ampm = "AM";
            if(hour == 0){
                hour = 12
            }
            else if(hour >= 12){
                hour = hour - 12
                ampm = "PM"
            }

            hour = hour < 10 ? "0"+hour : hour;
            min  = min < 10 ? "0"+min : min;
            sec = sec < 10 ? "0"+sec : sec;

            this.currentTime = `${hour}:${min}:${sec} ${ampm}`
            if(this.alarmTime === `${hour}:${min} ${ampm}`){
                console.log("Alarm Triggered!!!");
                this.isAlarmTriggered = true;
                this.ringtone.play();
                this.ringtone.loop = true;
            }

        }, 1000);
        console.log("currentTime=== ", this.currentTime);
    }   

    createHoursOptions(){
        for(let i = 1; i<=12; i++){
            let val = i<10 ? "0"+i : i;
            this.hours.push(val);
        }
        console.log("hours===", this.hours);
    }

    createMinutesOptions(){
        for(let i = 0; i<=59; i++){
            let val = i<10 ? "0"+i : i;
            this.minutes.push(val);
        }
        console.log("minutes===", this.minutes);
    }

    optionhandler(event){
        const{label, value} = event.detail
        if(label === "Hour(s)"){
            this.hourSelected = value;
        }
        else if(label === "Minute(s)"){
            this.minSelected = value;
        }
        else if(label === "AM/PM"){
            this.meridiemSelected = value;
        }
        else {}

        console.log("hourSelected=== ", this.hourSelected);
        console.log("minSelected=== ", this.minSelected);
        console.log("meridiemSelected=== ", this.meridiemSelected);
    }

    setAlarmHandler(){
        this.alarmTime = `${this.hourSelected}:${this.minSelected} ${this.meridiemSelected}`;
        this.isAlarmSet = true;
    }

    clearAlarmHandler(){
        this.alarmTime = '';
        this.isAlarmSet = false;
        this.isAlarmTriggered = false;
        this.ringtone.pause();

        // this is reset or make select option visible again after clear alarm
        const elements = this.template.querySelectorAll('c-clock-dropdown');
        Array.from(elements).forEach(element => {
            element.reset("");
        });
    }
}