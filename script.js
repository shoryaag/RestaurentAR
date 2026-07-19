// ---------- Next Dish ----------
const dishes = [
  "./dish1.glb",
  "./dish2.glb",
  "./dish3.glb"
];

let currentDish = 0;

const button = document.getElementById("nextDish");
const model = document.getElementById("dishModel");

button.addEventListener("click", () => {
  currentDish = (currentDish + 1) % dishes.length;
  model.setAttribute("src", dishes[currentDish]);
});

// ---------- Rotation & Zoom ----------

let dragging = false;
let previousX = 0;
let previousY = 0;

let rotX = 0;
let rotY = 0;

let scale = 0.03;
let previousDistance = 0;

function getDistance(t1, t2) {
  const dx = t1.clientX - t2.clientX;
  const dy = t1.clientY - t2.clientY;
  return Math.sqrt(dx * dx + dy * dy);
}

document.addEventListener("touchstart", (e) => {

  if (e.touches.length === 1) {
    dragging = true;
    previousX = e.touches[0].clientX;
    previousY = e.touches[0].clientY;
  }

  if (e.touches.length === 2) {
    dragging = false;
    previousDistance = getDistance(e.touches[0], e.touches[1]);
  }

});

document.addEventListener("touchmove", (e) => {

  // Rotate
  if (e.touches.length === 1 && dragging) {

    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;

    rotY += (currentX - previousX) * 0.5;
    rotX -= (currentY - previousY) * 0.5;

    rotX = Math.max(-80, Math.min(80, rotX));

    model.setAttribute("rotation", `${rotX} ${rotY} 0`);

    previousX = currentX;
    previousY = currentY;
  }

  // Pinch Zoom
  if (e.touches.length === 2) {

    const currentDistance = getDistance(
      e.touches[0],
      e.touches[1]
    );

    const delta = currentDistance - previousDistance;

    scale += delta * 0.0002;

    scale = Math.max(0.005, Math.min(0.2, scale));

    model.setAttribute(
      "scale",
      `${scale} ${scale} ${scale}`
    );

    previousDistance = currentDistance;
  }

});

document.addEventListener("touchend", () => {
  dragging = false;
});