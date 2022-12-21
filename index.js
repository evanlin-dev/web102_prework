/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    // loop over each item in the data
    games.forEach(function(game){
        // create a new div element, which will become the game card
        const game_card = document.createElement("div");

        // add the class game-card to the list
        game_card.classList.add("game-card");

        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        const html = `
        <div>
            <img src=${game.img} class="game-img">
                <b>${game.name} </b> <br> <br>
                ${game.description} <br>
                Backers: ${game.backers}
            </img>
        </div>
        `;
        game_card.innerHTML = html;

        // append the game to the games-container
        document.getElementById("games-container").appendChild(game_card);
    });
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const total_contributions = GAMES_JSON.reduce((total, game) => {
    return total + game.backers;
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
let html = `
    <div>
        ${total_contributions.toLocaleString("en-US")}
    </div>
`;

contributionsCard.innerHTML = html;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const total_amount_raised = GAMES_JSON.reduce((total, game) => {
    return total + game.pledged;
}, 0);

// set inner HTML using template literal
html = `
    <div>
        $${total_amount_raised.toLocaleString("en-US")}
    </div>
`
raisedCard.innerHTML = html;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const number_of_games = GAMES_JSON.reduce((total) => {
    return total + 1;
}, 0);

html = `
    <div>
        ${number_of_games.toLocaleString("en-US")}
    </div>
`

gamesCard.innerHTML = html;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let list_of_unmet_goals = GAMES_JSON.filter((game) => {
        return game.pledged < game.goal;
    });

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(list_of_unmet_goals);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let list_of_met_goals = GAMES_JSON.filter((game) => {
        return game.pledged > game.goal;
    });

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(list_of_met_goals);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const num_unfunded_games = GAMES_JSON.reduce((total, game) => {
    if(game.pledged < game.goal){
        return total + 1;
    }
}, 0);

// create a string that explains the number of unfunded games using the ternary operator
const unfunded_text = num_unfunded_games > 0 ? `There are ${num_unfunded_games} unfunded games.` : "There are no unfunded games.";

// create a new DOM element containing the template string and append it to the description container
const element = document.createElement("div");
element.innerHTML = `<p>${unfunded_text}</p>`;

descriptionContainer.appendChild(element);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort((item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [first, second] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const top_pledge = first.name;
const topPledgeContainer = document.getElementById("first-game");
const topPledgeElement = document.createElement("div");
topPledgeElement.innerHTML = `<p>${top_pledge}</p>`;
topPledgeContainer.appendChild(topPledgeElement);

// do the same for the runner up item
const second_pledge = second.name;
const secondPledgeContainer = document.getElementById("second-game");
const secondPledgeElement = document.createElement("div");
secondPledgeElement.innerHTML = `<p>${second_pledge}</p>`;
secondPledgeContainer.appendChild(secondPledgeElement);