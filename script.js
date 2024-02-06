let title = document.querySelector("h1");
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".rstBtn");
let turn = true;
let turnCount = 0;
const winCase = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
title.addEventListener("mouseover", () => {
    title.classList.add("title");
    title.classList.remove("heading");
});
title.addEventListener("mouseout", () => {
    title.classList.remove("title");
    title.classList.add("heading");
});
resetBtn.addEventListener("mouseover", () => {
    resetBtn.style.backgroundColor = "white";
    resetBtn.style.color = "black";
});
resetBtn.addEventListener("mouseout", () => {
    resetBtn.style.backgroundColor = "";
    resetBtn.style.color = "";
});
const checkAns = () => {
    for (let pattern of winCase) {
        let firstVal = boxes[pattern[0]].innerText;
        let secondVal = boxes[pattern[1]].innerText;
        let thirdVal = boxes[pattern[2]].innerText;
        if (firstVal != "" && secondVal != "" && thirdVal != "") {
            if (firstVal === secondVal && secondVal === thirdVal) {
                title.innerText = `${firstVal} wins ! Congrats 🎉🎉`;
                resetBtn.innerText = "Restart";
                title.classList.add("result");
                title.classList.remove("heading");
                disableBoxes();
                return true;
            }
        }
    }

};
const reset = () => {
    turn = true;
    turnCount = 0;
    enableBoxes();
    title.innerText = "Tic-Tac-Toe";
    title.classList.add("heading");
    title.classList.remove("result");
    resetBtn.innerText = "Reset";
};
resetBtn.addEventListener("click", () => {
    boxes.forEach((box) => {
        reset();
    })
});
const draw = () => {
    title.innerText = "Draw !!! Press the restart button to play again.";
    disableBoxes();
    resetBtn.innerText = "Restart";
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};
window.onload = () => {
    let mode = prompt("Enter 1 for singleplayer OR 2 for multiplayer !");
    if (mode == 1) {
        singlePlayer();
    }
    else if (mode == 2) {
        multiPlayer();
    }
}
const singlePlayer = () => {
    boxes.forEach((box) => {
        box.addEventListener("click", function () {
            if (turn) {
                box.innerText = "O";
                turn = !turn;
                setTimeout(() => {
                    botMove();
                }, 500);
            }
            box.disabled = true;
            turnCount++;
            let winAction = checkAns();
            if (turnCount === 9 && !winAction) {
                draw();
            }
        });
    });
}
const botMove = () => {
    let botChoice;
    do{
        botChoice = boxes[Math.floor(Math.random() * 9)];
    }
    while(botChoice.innerText != "");
    botChoice.innerText = "X";
    turn = true;
    botChoice.disabled = true;
    turnCount++;
    let x = checkAns();
    if (turnCount === 9 && !x) {
        draw();
    }
}
const multiPlayer = () => {

    boxes.forEach((box) => {
        box.addEventListener("click", function () {
            if (turn) {
                box.innerText = "O";
                turn = !turn;
            } else {
                box.innerText = "X";
                turn = true;
            }
            box.disabled = true;
            turnCount++;
            let winAction = checkAns();
            if (turnCount === 9 && !winAction) {
                draw();
            }
        });
    });
};