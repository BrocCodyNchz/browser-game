const labTitle = document.getElementById(`lab-title`);
const storyText = document.getElementById(`story-text`);
const choiceContainer = document.getElementById(`choice-container`);

let currentLab = 1;
const totalLabs = 5;

const choices = [
    {text: `Code it yourself`, path:`safe`, icon:`url here`},
    {text: `Modify someone's example`, path: `risky`, icon:`url here`},
    {text: `Use ChatGPT to generate the code`, path: `chatGpt`, icon:`https://imgs.search.brave.com/zFJCleXHWZpW9U_0wmCwAO0N5USyQOKZTYSaDsyHOv4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4z/ZC5pY29uc2NvdXQu/Y29tLzNkL3ByZW1p/dW0vdGh1bWIvY2hh/dC1ncHQtM2QtaWNv/bi1wbmctZG93bmxv/YWQtODcxNTM1NC5w/bmc`}
];

const story = {
    safe: `Matt: "Coding is hard so it is going to be a bit rough. Great work!"`,
    riskySuccess: `You got by this time.`,
    riskyFail: `Busted! Matt and Keith ask about the code and you try to explain it."`,
    chatGpt: `Matt: "You are no longer allowed to continue the program due to plagerism."`,
    congratulations: `Matt: "Awesome job, I present to you your worthless certificate."`,
    gameOver: `Great job, you were kicked out of the class. Next time do the work and put in the effort.`,
}
function checkOutcome(choice) {
    if (choice.path === `chatGpt`) {
        endGame(`chatGpt`);
    } else if (choice.path === `risky`) {
        if (Math.random() > 0.5) {
            gamePlay(`riskySuccess`);
        } else {
            endGame(`riskyFail`); 
        }
    } else if (choice.path === `safe`) {
        gamePlay(`safe`);
    }
}

function gamePlay(game) {
    storyText.textContent = story[game];
    choiceContainer.innerHTML = ``;
    
    if (currentLab > totalLabs) {
        endGame(`Congratulations`);
        return;
    }
    if (game === `safe` || game === `riskySuccess`) {
        currentLab++;

    }
}

function endGame(outcome)