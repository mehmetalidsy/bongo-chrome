const catContainer = document.createElement('div');
catContainer.id = 'bongo-cat-container';
catContainer.innerHTML = `<img id="bongo-img" src="${chrome.runtime.getURL('assets/up.png')}">`;
document.body.appendChild(catContainer);

const img = document.getElementById('bongo-img');
const upImg = chrome.runtime.getURL('assets/up.png');
const downImg = chrome.runtime.getURL('assets/down.png');

const hitBongo = () => {
    img.src = downImg;
    setTimeout(() => {
        img.src = upImg;
    }, 100);
};

document.addEventListener('keydown', (e) => {
    if (!e.repeat) hitBongo(); 
});

document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
        hitBongo();
    } else if (e.button === 2) {
        hitBongo();
    }
});
chrome.runtime.onMessage.addListener((request) => {
    if (request.action === "toggle") {
        catContainer.style.display = request.state ? "block" : "none";
    }
});