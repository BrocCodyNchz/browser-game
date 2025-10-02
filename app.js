const labTitle = document.getElementById(`lab-title`);
const storyText = document.getElementById(`story-text`);
const gameContainer = document.getElementById(`game-container`);

//Vaiables
let currentLab = 1;
const totalLabs = 5;

//Prompts for the the user to choice how they will do each lab.
const choices = [
    {text: `Code it yourself`, path:`safe`},
    {text: `Modify someone's example`, path: `risky`},
    {text: `Use ChatGPT to generate the code`, path: `chatGpt`},
];

//Story lines that will be reused.
const story = {
    start: `Welcome to General Assembly!`,
    safe: `Matt: "Coding is hard so it is going to be a bit rough. Great work!"`,
    riskySuccess: `You got by this time.`,
    riskyFail: `Busted! Matt and Keith ask about the code and you try to explain it."`,
    chatGpt: `Matt: "You are no longer allowed to continue the program due to plagerism."`,
    congratulations: `Matt: "Awesome job, I present to you your worthless certificate."`,
    gameOver: `Great job, you were kicked out of the class. Next time do the work and put in the effort.`,
}

function gamePlay(game) {
    storyText.textContent = story[game];
    gameContainer.innerHTML = ``;
    
    if (game === `safe` || game === `riskySuccess`) {
        currentLab++;
    }
    if (currentLab > totalLabs) {
        endGame(`Congratulations`);
        return;
    }
labTitle.textContent = `Lab ${currentLab}`;
}

//Set event to check the choice made by user.
function handleChoice(event) {
    const targetButton = event.target.closest(`.choice-button`);
    //used MDN to find a way to pull from path using dataset
    if (targetButton) {
        const choicePath = targetButton.dataset.path;
        if (choicePath === `chatGpt`) {
            endGame(`chatGpt`);
        
        } else if (choicePath === `risky`) {
            if (Math.random() > 0.5) {
                gamePlay(`riskySuccess`);
            } else {
                endGame(`riskyFail`); 
            }
        } else if (choicePath === `safe`) {
            gamePlay(`safe`);
    }
}

labTitle.textContent = `Lab ${currentLab}`;
storyText.textContent = story[game] || story.start;

for (let i = 0; i < choices.length; i++) {
    const choice = choices [i];
    const button = document.createElement(`button`);
    button.classList.add(`choice-button`);

    const icon = document.createElement(`img`);
    icon.src = choice.icon;
    button.appendChild(icon);
    const buttonText = document.createTextNode(choice.text);
    button.appendChild(buttonText);

    button.setAttribute(`data-path`, choice.path);
    gameContainer.appendChild(button);
}
}

function endGame(outcome) {
    gameContainer.innerHTML = ``;
    if (outcome === `congratulations`) {
        labTitle.textContent = `You passed the course and were able to get a job quickly!`
    } else {
        labTitle.textContent = `You wasted your money and now everyone hates you.`
    }
}
gameContainer.addEventListener(`click`, handleChoice);

window.onload = () => {
    gamePlay(`start`);
};
