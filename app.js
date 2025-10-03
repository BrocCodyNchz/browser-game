//After sleeping on the problems that

const labTitle = document.querySelector(`.lab-title`);
const storyText = document.querySelector(`.story-text`);
const gameContainer = document.getElementById(`game-container`);

//Variables
let currentLab = 1;
const totalLabs = 5;
let currentOutcome = `start`;

//
const storyOutcome = {
    chatGpt: `🛑 Expelled`,
    congratulations: `🏆 Congratulations`,
    start: `Welcome to General Assembly!`,
    gameOver: `Game Over! You were caught and now you have been expelled.`,
};

//Stories to be used for each lab
//Was resetting after game one due to my logic, used AI and told me to place an emoji over using text.
const labData = {
    1: {
        intro:`Intro to the CLI Lab`,
        safe: `✅ Matt: "Coding is hard so it is going to be a bit rough. Great work!"`,
        riskySuccess: `✅ You got by this time but you may not be so lucky next time.`,
        riskyFail: `❌Busted`,
    },
    2: {
        intro:`Choose Your Own Adventure Lab`,
        safe: `✅ Matt: "Coding is hard so it is going to be a bit rough. Great work!"`,
        riskySuccess: `✅ You got by this time but you may not be so lucky next time.`,
        riskyFail: `❌Busted`,
    },
    3: {
        intro:`Intro to JavaScript Functions Lab`,
        safe: `✅ Matt: "Coding is hard so it is going to be a bit rough. Great work!"`,
        riskySuccess: `✅ You got by this time but you may not be so lucky next time.`,
        riskyFail: `❌Busted`,
    },
    4: {
        intro:`Terminal Game Lab`,
        safe: `✅ Matt: "Coding is hard so it is going to be a bit rough. Great work!"`,
        riskySuccess: `✅ You got by this time but you may not be so lucky next time.`,
        riskyFail: `❌Busted`,
    },
    5: {
        intro:`DOM Events Lab`,
        safe: `✅ Matt: "Coding is hard so it is going to be a bit rough. Great work!"`,
        riskySuccess: `✅ You got by this time but you may not be so lucky next time.`,
        riskyFail: `❌Busted`,
    },
};

function resetGame() {
    currentLab = 1;
    currentOutcome = `start`;
    gamePlay(`start`);
}

function gamePlay(outcomeKey) {
    currentOutcome = outcomeKey;
//below checks for wins
    if (currentLab > totalLabs) {
        endGame(`congratulations`);
        return;
    }
//Below checks if the result was safe or risky success
    const isResult = outcomeKey !== `start` && !outcomeKey.startsWith(`riskyFail`) && !outcomeKey.startsWith(`chatGpt`);
    
    labTitle.textContent = `Lab ${currentLab} / ${totalLabs}`;

    if (isResult) {
        const labToDisplay = currentLab - 1;
        storyText.textContent = labData[labToDisplay][outcomeKey];
        currentOutcome = `nextLabIntro`;
    } else {
        if (currentLab <= totalLabs) {
            storyText.textContent = labData[currentLab].intro;
        } else {
            storyText.textContent = storyOutcome.start;
        }
    }
}

function handleChoice(event) {
    const targetButton = event.target.closest(`.choice-button`);
    if (targetButton) {
        const choicePath = targetButton.dataset.path;
        if (storyText.textContent.startsWith(`🏆`) || storyText.textContent.startsWith(`❌`) || storyText.textContent.startsWith(`🛑`)) {
            resetGame();
            return;
        }

        if (currentOutcome === `nextLabIntro`) {
            gamePlay(`start`);
            return;
        }

        //choice logic
        if(choicePath === `chatGpt`) {
            endGame(`chatGpt`);
        } else if (choicePath === `risky`) {
            if (Math.random() > 0.5) {
                currentLab++;
                gamePlay(`riskySuccess`);
            } else {
                endGame(`riskyFail`);
            }
        } else if (choicePath === `safe`) {
            currentLab++;
            gamePlay(`safe`);
        }
    }
}
function endGame(outcomeKey) {
    let labKey;
    if (currentLab <= totalLabs) {
        labKey = currentLab;
    } else {
        labKey = totalLabs;
    }

    if (outcomeKey === `chatGpt`) {
        storyText.textContent = storyOutcome.chatGpt;
        labTitle.textContent = `GAME OVER`;
    }

    else if (outcomeKey === `riskyFail`) {
        labTitle.textContent = `GAME OVER`;
    }

    else if (outcomeKey === `congratulations`) {
        storyText.textContent = storyOutcome[outcomeKey];
        labTitle.textContent = `You Passed The Course`
    }
}
gameContainer.addEventListener(`click`, handleChoice);

window.onload = () => {
    gamePlay(`start`);
};

//Original JS below that I rewrote in the wee morning hours to get it to function properly.

// function gamePlay(outcomeKey)
//     storyText.textContent = story[game];
//     gameContainer.innerHTML = ``;
    
//     if (game === `safe` || game === `riskySuccess`) {
//         currentLab++;
//     }
//     if (currentLab > totalLabs) {
//         endGame(`Congratulations`);
//         return;
//     }
// labTitle.textContent = `Lab ${currentLab} / ${totalLabs}`;

// }

// //Set event to check the choice made by user.
// function handleChoice(event) {
//     const targetButton = event.target.closest(`.choice-button`);
//     //used MDN to find a way to pull from path using dataset
//     if (targetButton) {
//         const choicePath = targetButton.dataset.path;
//         if (choicePath === `chatGpt`) {
//             endGame(`chatGpt`);
        
//         } else if (choicePath === `risky`) {
//             if (Math.random() > 0.5) {
//                 gamePlay(`riskySuccess`);
//             } else {
//                 endGame(`riskyFail`); 
//             }
//         } else if (choicePath === `safe`) {
//             gamePlay(`safe`);
//     }
// }

// labTitle.textContent = `Lab ${currentLab}`;
// storyText.textContent = story[game] || story.start;

// for (let i = 0; i < choices.length; i++) {
//     const choice = choices [i];
//     const button = document.createElement(`button`);
//     button.classList.add(`choice-button`);

//     const icon = document.createElement(`img`);
//     icon.src = choice.icon;
//     button.appendChild(icon);
//     const buttonText = document.createTextNode(choice.text);
//     button.appendChild(buttonText);

//     button.setAttribute(`data-path`, choice.path);
//     gameContainer.appendChild(button);
// }
// }

// function endGame(outcome) {
//     gameContainer.innerHTML = ``;
//     if (outcome === `congratulations`) {
//         labTitle.textContent = `You passed the course and were able to get a job quickly!`
//     } else {
//         labTitle.textContent = `You wasted your money and now everyone hates you.`
//     }
// }
// gameContainer.addEventListener(`click`, handleChoice);

// window.onload = () => {
//     gamePlay(`start`);
// };