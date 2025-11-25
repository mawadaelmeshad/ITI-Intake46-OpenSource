class Clock { 
    #intervalId;
    constructor(time){
        this.hours =Number(time.slice(0,2));
        this.minutes =Number(time.slice(3,5));
        this.seconds = Number(time.slice(6,8));
    }

    static formatTime(hours, minutes, seconds){
        let formattedTime = `${hours}:${minutes}:${seconds}`;
        return formattedTime;
    }
    // private method
    #tick(){
        if(this.seconds<60){
            this.seconds++;
        }
        else if(this.seconds==60 ){
            this.seconds=0;
            this.minutes++;
        }
        else if(this.minutes==60){
            this.minutes=0;
            this.seconds=0;
            this.hours++;

        }
        else if(this.hours==24){
            this.hours=0;
            this.minutes=0;
            this.seconds=0;
        }
        console.log(this.getTime());
    }
    start(){
        this.#intervalId= setInterval(()=>{
            this.#tick();
        },1000);
    }
    stop(){
        clearInterval(this.#intervalId);
    }
    getTime(){
        return Clock.formatTime(this.hours, this.minutes , this.seconds);
    }

}

class AlarmClock extends Clock { 
    #alarmTime;
    #childIntervalId;

    constructor(time, alarmTime){
        super(time);
        this.#alarmTime = alarmTime;
    }
    #checkAlarm(){
        let currentTime = this.getTime();
        return currentTime == this.#alarmTime;
    }
    start(){
        super.start();
        this.#childIntervalId= setInterval(()=>{
            
            console.log(`alarm time`, this.#alarmTime);
            console.log(`time : `,this.getTime());

        
            console.log(this.#checkAlarm());
            if(this.#checkAlarm()){


                console.log("Alarm! Wake up !");
                this.stop();
                super.stop();
            }
        }, 1000);
    }
    stop(){
        clearInterval(this.#childIntervalId);
    }
    set alarmTime(newAlarmTime){
        this.#alarmTime = newAlarmTime;
    }

}
let c = new Clock("13:04:50");
console.log(c);
console.log(Clock.formatTime(10,20,40));
// c.start();
console.log(c.getTime());

let alarm2 = new AlarmClock("20:20:30", "20:10:30");
console.log(alarm2);
console.log(alarm2.alarmTime="10:20:30");
// console.log(alarm2.start());

