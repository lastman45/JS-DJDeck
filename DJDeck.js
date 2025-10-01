// State management for both players
const playerState = {
    left: false,
    right: false
};

// Get elements for both players
const elements = {
    left: {
        button: document.querySelector('[data-player="left"].btn'),
        record: document.querySelector('#player-left .record'),
        toneArm: document.querySelector('#player-left .tone-arm'),
        song: document.querySelector('#song-left'),
        slider: document.querySelector('[data-player="left"].slider'),
        // Added selectors for select button and file input
        selectBtn: document.querySelector('.select-music-btn[data-player="left"]'),
        fileInput: document.querySelector('.music-file-input[data-player="left"]')
    },
    right: {
        button: document.querySelector('[data-player="right"].btn'),
        record: document.querySelector('#player-right .record'),
        toneArm: document.querySelector('#player-right .tone-arm'),
        song: document.querySelector('#song-right'),
        slider: document.querySelector('[data-player="right"].slider'),
        // Added selectors for select button and file input
        selectBtn: document.querySelector('.select-music-btn[data-player="right"]'),
        fileInput: document.querySelector('.music-file-input[data-player="right"]')
    }
};

// Show file picker when "Select Music" is clicked
elements.left.selectBtn.addEventListener('click', () => {
    elements.left.fileInput.click();
});
elements.right.selectBtn.addEventListener('click', () => {
    elements.right.fileInput.click();
});

// Handle file selection and load into audio element
function handleFileInput(side) {
    const fileInput = elements[side].fileInput;
    const song = elements[side].song;
    fileInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            song.src = url;
            song.load();
        }
    });
}
handleFileInput('left');
handleFileInput('right');

// Function to handle play/pause for a specific player
function togglePlayer(side) {
    const player = elements[side];
    
    if (playerState[side] === false) {
        player.record.classList.add("on");
        player.toneArm.classList.add("play");
        setTimeout(() => {
            if (player.song.src) {
                player.song.play();
            }
        }, 1000);
        playerState[side] = true;
    } else {
        player.record.classList.remove("on");
        player.toneArm.classList.remove("play");
        player.song.pause();
        playerState[side] = false;
    }
}

// Add event listeners for both players
elements.left.button.addEventListener("click", () => {
    togglePlayer('left');
});

elements.right.button.addEventListener("click", () => {
    togglePlayer('right');
});

// Volume control for both players
elements.left.slider.addEventListener("input", (e) => {
    elements.left.song.volume = Number(e.target.value);
});

elements.right.slider.addEventListener("input", (e) => {
    elements.right.song.volume = Number(e.target.value);
});
