const box = document.getElementById("box");
const btn = document.getElementById("startBtn");

// top-left -> bottom-left -> bottom-right -> top-right -> top-left
const steps = [
  { top: "0",     left: "0",     color: "red" },
  { top: "240px", left: "0",     color: "green" },
  { top: "240px", left: "340px", color: "blue" },
  { top: "0",     left: "340px", color: "orange" },
  { top: "0",     left: "0",     color: "purple" }
];

let index = 0;
let timer = null;

btn.addEventListener("click", () => {
  if (timer) return;         
  timer = setInterval(() => {
    index++;
    if (index >= steps.length) {
      clearInterval(timer);
      timer = null;
      return;
    }
    const s = steps[index];
    box.style.top = s.top;
    box.style.left = s.left;
    box.style.backgroundColor = s.color;
  }, 1000);
});