// Define variables
let lastTimestamp = 0;
const updateInterval = 1000 / 2; // 1 second

// Game update function
function updateGame(timestamp) {
  const deltaTime = timestamp - lastTimestamp;

  // Update game logic here

  lastTimestamp = timestamp;

  updateCartUI()
  
  // Request the next frame after the updateInterval
  setTimeout(() => {
    requestAnimationFrame(updateGame);
  }, updateInterval);
}

// Start the game loop
function startGameLoop() {
  requestAnimationFrame(updateGame);
}

function didLoad() {
    startGameLoop();
}

function updateCartUI() {
    let count = localStorage.getItem("cart_count")
    const badge = document.querySelector(".badge")

    if (count == undefined || count == null || count == 0) {
        badge.style.display = "none"
        count = 0
    } else {
        badge.style.display = "inline-block"
    }
    badge.textContent = count
}