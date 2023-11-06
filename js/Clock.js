// < ==================== Watch ======================= >
let Watch_H1 = document.querySelectorAll('#Watch h1');
function time(){
    let TimeNow = new Date(),
        sec = TimeNow.getSeconds(),
        min = TimeNow.getMinutes(),
        hou = TimeNow.getHours();
    // push the time in the boxs
    Watch_H1[2].innerHTML = sec.toString().padStart(2, '0');
    Watch_H1[1].innerHTML = min.toString().padStart(2, '0');
    Watch_H1[0].innerHTML = hou.toString().padStart(2, '0');
}
time();
setInterval(time, 1000); 
// < ========================== Stopwatch ======================= >
let Stopwatch_H1 = document.querySelectorAll('#stopwatch h1'),
    reset = document.getElementById('reset'),
    start = document.getElementById('start'),
    mood = 'Start',
    TIME = 0,
    intervalId ;
// start and pause function
start.onclick = () => {
    if (mood === 'Start') {
        intervalId = setInterval(() => {
            TIME++
            let H = TIME / 360000,
                dc =   TIME % 360000,
                M = dc / 6000,
                S = (dc % 6000) / 100,
                MS = ((dc % 6000) % 100);
            Stopwatch_H1[0].innerHTML = Math.floor(H).toString().padStart(2, '0');
            Stopwatch_H1[1].innerHTML = Math.floor(M).toString().padStart(2, '0');
            Stopwatch_H1[2].innerHTML = Math.floor(S).toString().padStart(2, '0');
            Stopwatch_H1[3].innerHTML = Math.floor(MS).toString().padStart(2, '0');
            mood = 'Stop'
            start.innerText = 'Pause'
        }, 10);
    }else{   
        clearInterval(intervalId)
        mood = 'Start'
        start.innerText = 'Resume'
    }
    reset.classList.remove('d-none');
};
// Reset function
reset.onclick = () => {
    TIME = 0
    mood = 'Start'
    clearInterval(intervalId)
    Stopwatch_H1.forEach(h1 => h1.innerHTML = '00');
    start.innerText = mood
    reset.classList.add('d-none');
}
// < ======================== Timer ======================== >
let inputs = document.querySelectorAll('#Timer input'),
    BtnCancelTimer = document.getElementById('BtnCancelTimer'),
    BtnStartTimer = document.getElementById('BtnStartTimer'),
    moodTimer = 'startTimer',
    intervalTimer;
// started and pause and Resume function
BtnStartTimer.onclick = ()=> {
    let AllSecondsTimer = (+inputs[0].value * 3600) + (+inputs[1].value * 60) + (+inputs[2].value);
    if (moodTimer === 'startTimer') {
            if (typeof AllSecondsTimer === 'number' && AllSecondsTimer > 0) {
                intervalTimer = setInterval(() => {                                
                    AllSecondsTimer--
                        let HT =  Math.floor(AllSecondsTimer / 3600),
                            DC = AllSecondsTimer % 3600,
                            MT = Math.floor(DC / 60),
                            ST = DC % 60;
                        inputs[0].value = HT.toString().padStart(2, '0');
                        inputs[1].value = Math.floor(MT).toString().padStart(2, '0');
                        inputs[2].value = Math.floor(ST).toString().padStart(2, '0');
                        if (AllSecondsTimer <= 0) {
                            moodTimer = 'startTimer'
                            clearInterval(intervalTimer)
                            inputs.forEach(inpt => {
                                inpt.value = ''
                                inpt.classList.remove('pe-none')
                            });
                            BtnCancelTimer.classList.add('d-none');
                            BtnStartTimer.innerHTML = 'Started';
                            document.getElementById('btnModal').click()
                        }
                }, 1000);
                moodTimer = 'pauseTimer'
                BtnCancelTimer.classList.remove('d-none');
                BtnStartTimer.innerHTML = 'Pause';
                inputs.forEach(inpt =>inpt.classList.add('pe-none'));
                document.querySelector('#Timer p').classList.add('opacity-0');
            }else{
                document.querySelector('#Timer p').classList.remove('opacity-0');
                inputs.forEach(inpt => inpt.value = '' );
            }
        }else{
            moodTimer = 'startTimer'
            clearInterval(intervalTimer)
            BtnStartTimer.innerHTML = 'Resume';
            inputs.forEach(inpt =>inpt.classList.add('pe-none'));
        }
}
// Cancel function
BtnCancelTimer.onclick = ()=>{
    moodTimer = 'startTimer'
    clearInterval(intervalTimer)
    BtnCancelTimer.classList.add('d-none');
    BtnStartTimer.innerHTML = 'Started';
    inputs.forEach(inpt => {
        inpt.value = ''
        inpt.classList.remove('pe-none')
    });
}

