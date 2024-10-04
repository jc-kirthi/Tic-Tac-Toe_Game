let boxes=document.querySelectorAll(".box");
let reset=document.querySelector("#re");
let newGame=document.querySelector("#newGame");
let msgcon=document.querySelector(".msg-con");
let msg=document.querySelector("#msg");

let turno= true;
let count=0;
//2D array
//let arr=[["apple"],["mango","litchi"],["mushroom","potato"]];

const winP=[ //all possiblities of winning from 0-8
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];


const enable=()=>{
    for(let box of boxes)
        {
        box.disabled=false; //making the box clickable
        box.innerText="";
        }
}

const resetG=()=>{
turno=true;
enable();
msgcon.classList.add("hide"); //at the beginning it is hidden
}

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        
        if(turno===true) //player o
            {
                box.innerText="O";
                turno=false;
            }
        else{ //player x
            box.innerText="X";
                turno=true;
        }
        box.disabled=true; //to avoid second click
        count++;
        let isW=checkW();
        if(count===9 && !isW){ //draw game condition
            gameD();
        }
    });
});

//draw game condition
const gameD=()=>{
    msg.innerText=`IT IS A DRAW!`;
    msgcon.classList.remove("hide");
    dis();
}


//disabling the boxes 
const dis=()=>{
    for(let box of boxes)
        {
        box.disabled=true; 
        }
}

const showinner=(w)=>{
    msg.innerText=`CONGRATS, ${w} WON!`;
    msgcon.classList.remove("hide");
    dis();
}


const checkW=()=>
{
    for(let p of winP)
        {
          let p1= boxes[p[0]].innerText;
          let p2= boxes[p[1]].innerText;
          let p3= boxes[p[2]].innerText;

          if( p1!="" && p2!="" && p3!="")
            {
                if(p1===p2 && p2===p3 )
                    {
                        showinner(p1);
                    }
                    
            }

        }
}

newGame.addEventListener("click",resetG);
reset.addEventListener("click",resetG);




