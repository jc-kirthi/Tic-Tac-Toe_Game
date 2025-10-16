let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#re");
let newGame = document.querySelector("#newGame");
let msgcon = document.querySelector(".msg-con");
let msg = document.querySelector("#msg");

let turno = true; // true = O, false = X
let count = 0;

// Winning combinations
const winP = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

// Enable/reset all boxes
const enable = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.style.color = "black"; // neutral color at start
    }
}

// Reset game
const resetG = () => {
    turno = true;
    count = 0; // reset move counter
    enable();
    msgcon.classList.add("hide"); // hide message
}

// Disable all boxes
const dis = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
}

// Show winner with delay
const showinner = (w, combo) => {
    setTimeout(() => {
        msg.innerText = `CONGRATS, ${w} WON!`;
        msgcon.classList.remove("hide");
        combo.forEach(i => boxes[i].style.color = "green"); // highlight winning combo
        dis();
    }, 300); // 300ms delay
}

// Check winner
const checkW = () => {
    for(let p of winP) {
        let p1 = boxes[p[0]].innerText;
        let p2 = boxes[p[1]].innerText;
        let p3 = boxes[p[2]].innerText;

        if(p1 !== "" && p1 === p2 && p2 === p3) {
            showinner(p1, p);
            return true; // winner found
        }
    }
    return false; // no winner
}

// Draw condition with delay
const gameD = () => {
    setTimeout(() => {
        msg.innerText = `IT IS A DRAW!`;
        msgcon.classList.remove("hide");
        dis();
    }, 300); // 300ms delay
}

// Handle clicks
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turno) {
            box.innerText = "O";
            box.style.color = "red";  // O = red
            turno = false;
        } else {
            box.innerText = "X";
            box.style.color = "blue"; // X = blue
            turno = true;
        }
        box.disabled = true; 
        count++;

        let isW = checkW();
        if(count === 9 && !isW) {
            gameD(); // show draw with delay
        }
    });
});

// Button events
newGame.addEventListener("click", resetG);
reset.addEventListener("click", resetG);
