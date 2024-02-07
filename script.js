let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#Reset");
let msgContainer = document.querySelector(".msgContainer");
let msg = document.querySelector("#msg")
let newbtn = document.querySelector("#newgame");

let turnO = true; //palyerX, playerO
let count=0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetBoxes=()=>{
    turnO = true;
    enableBoxes();  
    msgContainer.classList.add("hide")
}

const drawGame =()=>{
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const disableBoxes = ()=>{
    for(let box of boxes){
        boxes.disabled=true;
    }
}

const enableBoxes = ()=>{
    for(let box of boxes){
        boxes.disabled=false;
        box.innerText="";
    }
}

boxes.forEach((box) => {
    box.addEventListener("click",() => {
        if(turnO){
            box.innerText="O";
            turnO=false;
            count++;
        }
        else{
            box.innerText="X";
            turnO=true;
            count++;
        }
        box.disabled=true;
        let isWinner = checkWinner();

        if(count==9 && !isWinner){
            drawGame();
        }
    });
});

const showWinner=(winner)=>{
    msg.innerText = `Congratulations, winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner= ()=>{
    for(let pattern of winPatterns){
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if(pos1val!=="" && pos2val!=="" && pos3val!==""){
            if(pos1val===pos2val && pos2val===pos3val){
                showWinner(pos2val);
            }
        }
    }
};

newbtn.addEventListener("click",resetBoxes);
resetbtn.addEventListener("click",resetBoxes);