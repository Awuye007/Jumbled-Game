const wordText = document.querySelector(".word"),
 hintText = document.querySelector(".hint span");
 timeText = document.querySelector(".time b");
 inputField = document.querySelector("input");
 refreshBtn = document.querySelector(".refresh-word");
 checkBtn = document.querySelector(".check-word");

 let correctWord, timer;

 const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval( () => {
        if (maxTime > 0) {
            maxTime--;       // decrement maxTime by -1
            timeText.innerHTML = maxTime
            return timeText.innerText = maxTime;
        }
        clearInterval(timer);
        alert(`Time up! ${correctWord.toUpperCase()} was the correct word`)
        initGame();    // calling initGame function, so the game restarts 

    }, 1000);

 }

const initGame = () => {
    initTimer(31)    // calling initTimer function with passing 30 as maxtime value
    let randomObj = words [Math.floor(Math.random() * words.length)];       // getting random object from words
    let wordArray = randomObj.word.split("");      // Splitting each letter in the random word
    for (let i = wordArray.length -1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));     // getting random number
       
       //shuffling and swiping wordArray letters randomly
        let temp = wordArray[i];
        wordArray[i] = wordArray[j];
        wordArray[j] = temp;
    }
    
 
    wordText.innerHTML = wordArray.join("");    // passing shuffled word as word text
    hintText.innerHTML = randomObj.hint;     // passing random object hint as hint text
   correctWord = randomObj.word.toLocaleLowerCase();   // passing random word to correctWord
   inputField.value = "";    // making input field empty
   inputField.setAttribute("maxlength", correctWord.length )      // setting input maxlength attribute value to the correct words' length
    
} 

initGame();

const checkWord = () => {
    let userWord = inputField.value.toLocaleLowerCase();     // getting user value
    if(!userWord) return alert ("Please enter a word to check") ;  // if user doesn't provide any word

    if(userWord !== correctWord) return alert (`Oops ${userWord} is not a correct word`);  // if the users' word doesn't match the appropriate word

    // if the two  "if conditons" above are not met then show congrats because user word is correct
    alert(`Congrats ${userWord.toUpperCase()} is the correct word`)

    initGame();
} 

refreshBtn.addEventListener("click", initGame)
checkBtn.addEventListener("click", checkWord)