$('.flip').on('click', () => {
    $('.card').toggleClass('flipping');
});

async function getData() {
    const response = await fetch('characters.json');
    const characters = await response.json();
    
    marvelCharacters = characters.marvelCharacters;
    dcCharacters = characters.dcCharacters;
}
getData();

var searchBar = document.querySelector('.search-bar input');
var marvelImg = document.getElementById('marvel-image');
var dcImg = document.getElementById('dc-image');

var characters;
var marvelCharacters = [], dcCharacters = [];

var marvelNameFront = document.querySelector('#marvel-card .front h1');
var marvelNameBack = document.querySelector('#marvel-card .back h1');
var dcNameFront = document.querySelector('#dc-card .front h1');
var dcNameBack = document.querySelector('#dc-card .back h1');

var marvelMovies = document.querySelector('#marvel-card .movies #marvel-movies-list');
var dcMovies = document.querySelector('#dc-card .movies #dc-movies-list');


// Dark Mode
let darkMode = localStorage.getItem('darkMode');
const darkModeToggle = document.querySelector('#dark-toggle');

const enableDarkMode = () => {
    document.body.classList.add('darkmode');
    document.querySelector('header').classList.add('dark');
    document.querySelector('#versus').src = 'images/versus-black.png';
    document.querySelector('#dark-toggle i').style.color = '#fff';
    document.querySelector('.search-bar').style.backgroundColor = '#1a1a1a';
    document.querySelector('.search-bar input').style.backgroundColor = '#1a1a1a';
    
    document.querySelector('.logo-imgs img:first-of-type').src = 'images/marvel-images/marvel_white.png';
    document.querySelector('.logo-imgs img:last-of-type').src = 'images/dc-images/dc_white.png';
    
    document.querySelector('.over-characters h1').style.color = '#fff';
    document.querySelector('footer').style.backgroundColor = '#000';
    document.querySelector('footer #all-rights').style.color = '#fff';
    document.querySelector('section:last-of-type').style.color = '#6b6b6b';
    
    localStorage.setItem('darkMode', "on");
};

const disableDarkMode = () => {
    document.body.classList.remove('darkmode');
    document.querySelector('header').classList.remove('dark');
    document.querySelector('#versus').src = 'images/versus.png';
    document.querySelector('#dark-toggle i').style.color = '#000';
    document.querySelector('.search-bar').style.backgroundColor = '#fff';
    document.querySelector('.search-bar input').style.backgroundColor = '#fff';
    
    document.querySelector('.logo-imgs img:first-of-type').src = 'images/marvel-images/marvel_black.png';
    document.querySelector('.logo-imgs img:last-of-type').src = 'images/dc-images/dc_black.png';
    
    document.querySelector('.over-characters h1').style.color = '#000';
    document.querySelector('footer').style.backgroundColor = '#dcdcdc';
    document.querySelector('footer #all-rights').style.color = '#585858';
    document.querySelector('section:last-of-type').style.color = '#000';
    
    localStorage.setItem('darkMode', "off");
};

if (darkMode === "on" )
    enableDarkMode();
else
    disableDarkMode();

darkModeToggle.addEventListener('click', () => {
    darkMode = localStorage.getItem('darkMode')
    
    if (darkMode !== 'on') {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
});



// Functions
let styleNotFound = () => {

    let notFound = document.querySelector('.not-found');
    notFound.style.transform = 'translateY(-380px)';
    notFound.innerHTML = `
        <h1>Hmm... It seems like comics didn't reveal this character...</h1><br>
        <h1 id="emoji">🤔</h1>
    `;
}

let notFound = () => {
    document.querySelector('.result-container').style.transform = 'translateX(1500px)';
    document.querySelector('.logo-imgs').style.transform = 'translateX(1500px)';
    setTimeout(styleNotFound, 200)
    document.querySelector('.not-found').style.display = 'flex'; 
}


let resetCards = () => {
    marvelImg.src = "images/marvel-images/characters/iron-man.png";
    marvelImg.style.width = "330px";
    marvelNameFront.textContent = "Iron Man";
    marvelNameBack.innerHTML = "Iron Man <hr>";

    marvelMovies.innerHTML = `
        <p>The Incredible Hulk (2008)</p>
        <p>Iron Man(2008)</p>
        <p>Iron Man 2 (2010)</p>
        <p>The Avengers (2012)</p>
        <p>Iron Man 3 (2013)</p>
        <p>Avengers: Age of Ultron (2015)</p>
        <p>Captain America: Civil War (2016)</p>
        <p>Spider-Man: Homecoming (2017)</p>
        <p>Avengers: Infinity War (2018)</p>
        <p>Avengers: Endgame (2019)</p>
        <p>Spider-Man: Far From Home (2019)</p>
    `;

    dcMovies.innerHTML = `
        <p>Batman v Superman: Dawn of Justice (2016)</p>
        <p>Justice League (2017)</p>
        <p>Zack Snyder's Justice League (2021)</p>
    `;

    dcImg.src = "images/dc-images/characters/cyborg.png";
    dcImg.style.width = "210px";
    dcNameFront.textContent = "Cyborg";
    dcNameBack.innerHTML = "Cyborg <hr>";
}

let hasNoCopycat = card => {
    let img;
    if (card === 'marvel')
        img = marvelImg;
    else
        img = dcImg;
        
    img.style.visibility = "hidden";
    img.src = 'images/question-mark.png';
    document.querySelector(`#${card}-card .front img`).style.width = "280px";
    setTimeout(() => {
        img.style.visibility = "visible";
        document.querySelector(`#${card}-card .front h1`).textContent = "Unknown";
    }, 90)

    document.querySelector(`#${card}-card .back`).style.color = "transparent";
    document.querySelector(`#${card}-card .back hr`).style.borderColor = "transparent";
}

let findCopycat = (where, copycat) => {
    let toSearch = [];
    if (where === "marvel")
        toSearch = dcCharacters;
    else
        toSearch = marvelCharacters;


    for (let i = 0; i < toSearch.length; i++) {
        if (toSearch[i].name === copycat) {
            return toSearch[i];
        }
    }

    return false;
}

let changeCard = (name, character, toChange, img, front, back, movies) => {
    img.style.visibility = "hidden";
    img.src = character.imgSource;
    img.style.width = `${character.width}`;
    setTimeout(() => {
        img.style.visibility = "visible";
        document.querySelector(`#${toChange}-comic-year`).textContent = `${character.appearanceComics} (${character.appearanceYear})`
    }, 100);



    const insertMovies = which => {
        if (character.movies !== undefined)
            for (let i = 0; i < character.movies.length; i++) {
                let elem = document.createElement('p');
                let text = document.createTextNode(`${character.movies[i]}`);
                elem.appendChild(text);
                which.appendChild(elem);
            }
        else {
            movies.innerHTML = 'This chracter didn\'t show up in any movie until now';
        }
    }

    insertMovies(movies);

    front.textContent = `${name}`;
    back.innerHTML = `${name} <hr>`;

}


// Event Listeners
document.addEventListener('scroll', () => {
    let check = document.querySelector('.container').getBoundingClientRect();
    if (check.bottom < -10) {
        document.querySelector('.go-up button').style.transform = "translateX(0)";
        
    } else {
        document.querySelector('.go-up button').style.transform = "translateX(100px)";
    }
})


document.querySelector('.go-up button').onclick = () => {
    document.getElementById('search-bar').scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start"
    });
}


searchBar.addEventListener('click', () => {
    
    if(searchBar === document.activeElement && searchBar.value.length === 0) {
        document.getElementById('search-bar').scrollIntoView({
            behavior: "smooth",
            block:  "start",
            inline: "start"
        });
    }

    if (searchBar.value === "") {
        
        document.querySelector('.not-found').style.display == 'none'
        document.querySelector('.not-found').style.transform = 'translateY(0)';
        
        document.querySelector('.result-container').style.transform = 'translateX(0px)';
        document.querySelector('.logo-imgs').style.transform = 'translateX(0px)';

        resetCards();
    }
});

searchBar.addEventListener("click", () => {
    document.querySelector("header").classList.add("dark")
    searchBar.focus();
});

searchBar.addEventListener('change', () => {
    marvelMovies.innerHTML = ``;
    dcMovies.innerHTML = ``;

    document.querySelector('#marvel-comic-year').textContent = `Tales of Suspense #39 (1963)`;
    document.querySelector('#dc-comic-year').textContent = `DC Comics Presents #26 (1980)`;

    document.querySelector(`#marvel-card .back`).style.color = "#000";
    document.querySelector(`#marvel-card .back hr`).style.borderColor = "#000";

    document.querySelector(`#dc-card .back`).style.color = "#000";
    document.querySelector(`#dc-card .back hr`).style.borderColor = "#000";


    document.querySelector('#marvel-card .movies h2').style.display = 'block';

    if (document.querySelector('.not-found').style.display == 'none')
        document.querySelector('.not-found').style.transform = 'translateY(0)';

    document.querySelector('.not-found').style.display = 'none';
    document.querySelector('.result-container').style.transform = 'translateX(0px)';
    document.querySelector('.logo-imgs').style.transform = 'translateX(0px)';

    let searchValue = searchBar.value;
    let found = false;
    
    if (searchValue === "") {

        resetCards();
        
        return;
        
    } else {
        
        // Searching through the Marvel characters
        for (let i = 0; i < marvelCharacters.length; i++) {
            let character = marvelCharacters[i];
            
            if (character.name.toLowerCase().startsWith(searchValue)) {

                changeCard(character.name, character, "marvel", marvelImg, marvelNameFront, marvelNameBack, marvelMovies);
                
                let copycatFound = findCopycat("marvel", character.copycat);
                if (copycatFound)
                    changeCard(copycatFound.name, copycatFound, "dc", dcImg, dcNameFront, dcNameBack, dcMovies);
                else
                    hasNoCopycat("dc")
                    
                found = true;
                return;
                
            } else if (character.alias !== undefined &&
                character.alias.toLowerCase().startsWith(searchValue)) {
                    
                changeCard(character.alias, character, "marvel", marvelImg, marvelNameFront, marvelNameBack, marvelMovies);
                
                let copycatFound = findCopycat("marvel", character.copycat);
                if (copycatFound)
                    changeCard(copycatFound.name, copycatFound, "dc", dcImg, dcNameFront, dcNameBack, dcMovies);
                
                found = true;
                return;

            } else if (character.name.toLowerCase().includes('-')) {    // ---(1)
                
                let splittenName = character.name.toLowerCase().split('-');
                let tempName = `${splittenName[0]} ${splittenName[1]}`;
                
                if (tempName.toLowerCase().startsWith(searchValue)) {
                    
                    changeCard(character.name, character, "marvel", marvelImg, marvelNameFront, marvelNameBack, marvelMovies);
                    
                    let copycatFound = findCopycat("marvel", character.copycat);
                    if (copycatFound)
                        changeCard(copycatFound.name, copycatFound, "dc", dcImg, dcNameFront, dcNameBack, dcMovies);
                    else
                        hasNoCopycat("dc")
                    
                    
                    found = true;
                    return;
                    
                }
                
            }
        }


        // Searching through the DC characters
        if (!found) {
            for (let i = 0; i < dcCharacters.length; i++) {
                let character = dcCharacters[i];
                
                if (character.name.toLowerCase().startsWith(searchValue)) {
    
                    changeCard(character.name, character, "dc", dcImg, dcNameFront, dcNameBack, dcMovies);

                    let copycatFound = findCopycat("dc", character.copycat);
                    if (copycatFound)
                        changeCard(copycatFound.name, copycatFound, "marvel", marvelImg, marvelNameFront, marvelNameBack, marvelMovies);
                    else
                        hasNoCopycat("marvel")
                    
                    found = true;
                    return;
                    
                }  else if (character.name.toLowerCase().includes('-')) {    // ---(1)

                    let splittenName = character.name.toLowerCase().split('-');
                    let tempName = `${splittenName[0]} ${splittenName[1]}`;
                    
                    if (tempName.toLowerCase().startsWith(searchValue)) {
                        
                        changeCard(character.name, character, "dc", dcImg, dcNameFront, dcNameBack, dcMovies);
                        
                        let copycatFound = findCopycat("dc", character.copycat);
                        if (copycatFound)
                            changeCard(copycatFound.name, copycatFound, "marvel", marvelImg, marvelNameFront, marvelNameBack, marvelMovies);
                        else
                            hasNoCopycat("marvel")        

                        found = true;
                        return;
                        
                    }
                    
                }
            }
        }
        
    }

    notFound();
});


// Flip Button
let flipped = false;
let flipButton = document.getElementById('flip');

flipButton.addEventListener('click', () => {
    if (flipped) {
        flipped = false;
        flipButton.innerHTML = '<i class="fa-solid fa-info"></i>';

    } else {
        flipped = true;
        flipButton.innerHTML = '<i class="fa-solid fa-repeat"></i>';
    }

});





// (1)
// --------------------------
// When sombody searches a character whose name
// contains a '-' (dash) 
// it is likely for that person to not type
// the dash, so he will input for the name without the dash.
//
// For example:
// I will type 'spider man'
// instead of 'spider-man'
