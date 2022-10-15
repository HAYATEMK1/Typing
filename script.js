const RAMDOM_SENTENCE_URL_API = "https://api.quotable.io/random";
const typeDisplay = document.getElementById("typedisplay");
const typeInput = document.getElementById("typeInput");
const timer = document.getElementById("timer");
const typeSound = new Audio("./typing-sound.mp3");
const typeSound2 = new Audio("./wrong.mp3");
const typeSound3 = new Audio("./correct.mp3");



// inputテキスト入力、あっているか判定
typeInput.addEventListener("input", () =>{
    //タイプ音をつける
    typeSound.volume = 0.5;
    typeSound.play();
    typeSound.currentTime = 0;




    const setntenceArray = typeDisplay.querySelectorAll("span");
    //console.log(setntenceArray);
    const arrayValue = typeInput.value.split("")
    //console.log(arrayValue);
    let correct = true;
    setntenceArray.forEach((characterSpan,index) => {
        if ((arrayValue[index] == null)){
            characterSpan.classList.remove("correct");
            characterSpan.classList.remove("incorrect");
            correct = false;
        }else if(characterSpan.innerText == arrayValue[index]){
            characterSpan.classList.add("correct");
            characterSpan.classList.remove("incorrect");
            //console.log("correct");
        }else{
            characterSpan.classList.add("incorrect");
            characterSpan.classList.remove("correct");



            typeSound2.volume = 0.3;
            typeSound2.play();
            typeSound2.currentTime = 0;
            correct = false;
        }
    })

    if (correct==true){
        typeSound3.play();
        typeSound3.currentTime = 0;
        RenderNextSentence();
    }

});




//非同期でAPIを叩いてランダムな文章を取得する
function GetRandomSentence(){
    return fetch(RAMDOM_SENTENCE_URL_API)
    .then((responce) => responce.json())
    .then((data) => data.content);

}

//ランダムな文章を取得して、表示する。
 async function RenderNextSentence(){
    const setntence = await  GetRandomSentence();
    //console.log(setntence);

    typeDisplay.innerText = "";
    //文章を一文字ずつ分解
    let oneText = setntence.split("");
    
    oneText.forEach((character) =>{
        const characterSpan = document.createElement("span");
        characterSpan.innerText = character;
        //console.log(characterSpan);
        typeDisplay.appendChild(characterSpan);
        //characterSpan.classList.add("correct");

    });

    // テキストボックスの中身を消す
    typeInput.value = "";
    StartTimer();


}

let origintime = 60;
let Starttime;
function StartTimer(){
    timer.innerText = origintime;
    Starttime = new Date();
    //console.log(Starttime);
    setInterval(() => {
        timer.innerText = origintime - getTimerTime();
        if (timer.innerText <= 0) TimeUp();
    },1000);

}

function getTimerTime(){
    return Math.floor((new Date() - Starttime) / 1000);
}
function TimeUp(){
    RenderNextSentence();
    typeSound2.play();
}
RenderNextSentence();



