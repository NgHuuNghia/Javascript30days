
let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('.timer__button');

function timer(seconds){
    //clear timer
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds*1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown =  setInterval(()=>{

        const secondLeft = Math.round((then - Date.now())/1000);
        
        if(secondLeft < 0) {
            clearInterval(countdown);
            return ;
        }

        //display seconds
        displayTimeLeft(secondLeft);

    },1000);
}

function displayTimeLeft(seconds){
    
    const minutes = Math.round(seconds/60);
    const remainderSeconds = seconds % 60;

    const display = `${minutes} : ${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;


}


function displayEndTime(timestamp){

    const end = new Date(timestamp);
    const hour = end.getHours();
    const adjustedHour = hour > 12 ? hour - 12 : hour;
    const minutes = end.getMinutes();
    endTime.textContent=`Be back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;


}

function startTimer(){
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}


buttons.forEach(button => button.addEventListener('click',startTimer));

document.customForm.addEventListener('submit',function(e){
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins*60);
    this.reset();
});