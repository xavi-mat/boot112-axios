'use strict';
////////////////////////////////////////////////////////////////////////////////
// Axios Exercise
// for The Bridge
// by  xavimat
// 2022-05-06
//
////////////////////////////////////////////////////////////////////////////////
// Constants
const DOGAPI = "https://dog.ceo/dog-api/";
const GITHUBAPI = "https://api.github.com/users/";

////////////////////////////////////////////////////////////////////////////////
// DOM
const inputBreed = document.querySelector('#input-breed');
const container = document.querySelector('#container');
const showBtn = document.querySelector('#show-dog');
const getUserDataBtn = document.querySelector('#search-user');
const searchText = document.querySelector('#search-text');

////////////////////////////////////////////////////////////////////////////////
// Globals

////////////////////////////////////////////////////////////////////////////////
// Classes

////////////////////////////////////////////////////////////////////////////////
// Utils
const getData = (url, callback, log) => {
    axios(url)
        .then(res =>
            callback(log, res.data)
        )
        .catch((e) => console.log("What the what?", e));
}

const printMessage = (log, data) =>
    console.log('\n/////////////////////////\n// ' + log, data.message);

const showArrayOnDOM = (log, data) => {
    const newDiv = document.createElement('div');
    newDiv.innerHTML = '<h3>' + log + '</h3>';
    data.message.forEach(breed => {
        newDiv.innerHTML += breed + ', '
    });
    container.appendChild(newDiv);
}

const showIMGOnDOM = (log, data) => {
    const newImg = document.createElement('img');
    newImg.src = data.message;
    container.appendChild(newImg);
}

const show5ImagesOnDOM = (log, data) => {
    data.message.slice(0, 5).forEach(
        (img) => {
            const newImg = document.createElement('img');
            newImg.src = img;
            container.appendChild(newImg);
        }
    )
}


////////////////////////////////////////////////////////////////////////////////
// Functions
const printAllBreeds = () => {
    getData("https://dog.ceo/api/breeds/list",
        printMessage,
        "1.PRINT ALL BREEDS");
}

const printRandomImage = (breed) => {
    getData(`https://dog.ceo/api/breed/${breed}/images/random`,
        printMessage,
        "2.PRINT RANDOM IMAGE");
}

const printAllImages = (breed) => {
    getData(`https://dog.ceo/api/breed/${breed}/images`,
        printMessage,
        "3.PRINT ALL IMAGES");
}

const printAllBreedsOnDOM = () => {
    getData("https://dog.ceo/api/breeds/list",
        showArrayOnDOM,
        "4.PRINT ALL BREEDS");
}

const showRandomImageOnDOM = (breed) => {
    getData(`https://dog.ceo/api/breed/${breed}/images/random`,
        showIMGOnDOM,
        "5.SHOW RANDOM IMG ON DOM");
}

const showFiveImagesOnDOM = (breed) => {
    getData(`https://dog.ceo/api/breed/${breed}/images`,
        show5ImagesOnDOM,
        "5.SHOW RANDOM IMG ON DOM");
}

const showImgsFromInput = (e) => {
    e.preventDefault();
    const breed = inputBreed.value.toLowerCase();
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    showFiveImagesOnDOM(breed);
}

const putUserData = (user) => {
    container.innerHTML = `Nombre: ${user.login}<br>
        Num. repositorios: ${user.public_repos}<br>
        <img src="${user.avatar_url}">`;
}

const getGitHubUserData = async (e) => {
    e.preventDefault();
    const userName = searchText.value;
    try {
        const res = await axios(GITHUBAPI + userName);
        putUserData(res.data)
    } catch (error) {
        console.error(error);
        putUserData({login:'NOT FOUND'});
    }
}


////////////////////////////////////////////////////////////////////////////////
// Listeners
showBtn.addEventListener("submit", showImgsFromInput);
getUserDataBtn.addEventListener("submit", getGitHubUserData);

////////////////////////////////////////////////////////////////////////////////
// Init
printAllBreeds();
printRandomImage("germanshepherd");
printAllImages("germanshepherd");

printAllBreedsOnDOM();
showRandomImageOnDOM("germanshepherd");
showFiveImagesOnDOM("germanshepherd");
