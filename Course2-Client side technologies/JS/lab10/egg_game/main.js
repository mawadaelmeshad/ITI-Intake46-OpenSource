
document.body.style.backgroundImage="url(../images/bg.png)";
let score = 0;
document.querySelector("p").innerText+=" "+score;

let id;
// let egg = document.querySelector('.egg');
let basket = document.querySelector("#basket");


class Egg {

    constructor(){
        this.moveVer = 0;
        this.moveHor = Math.random() * window.innerWidth;
        this.element = document.createElement("img");
        this.element.src= "../images/1182-removebg-preview.png";
        this.element.classList.add("egg");
        this.element.style.top = `${this.moveVer}px`;
        this.element.style.left = `${this.moveHor}px`;
        this.isBroken = false;

        document.body.appendChild(this.element);
    }
    broken(){
        if(this.moveVer>=window.innerHeight-this.element.height){
            this.element.src="../images/Uovo_sorridente.png";
            this.isBroken = true;
            setTimeout(()=>{
                this.reset();
            },1000);

        };
        
    }
    reset(){
        this.moveVer = 0;
        this.moveHor = Math.random() * window.innerWidth;
        this.element.src= "../images/1182-removebg-preview.png";
        this.element.style.visibility = "visible";
        this.element.style.top = `${this.moveVer}px`;
        this.element.style.left = `${this.moveHor}px`;
        this.isBroken = false;


    };

    
    fall(){
        if(this.isBroken) return;
        if(this.moveVer<=window.innerHeight-this.element.height){
            this.element.style.top=`${this.moveVer}px`;
            this.moveVer+=20;
        }
        let eggBottom = parseInt(this.element.style.top) ;
        let basketTop = window.innerHeight - basket.offsetHeight;
        let eggLeft = parseInt(this.element.style.left);
        let basketLeft = parseInt(basket.style.left);

        if((eggBottom>=basketTop) && (eggLeft>=basketLeft && eggLeft<=basketLeft+basket.offsetWidth)){
            console.log("yaay");
            score++;
            if(score== 5 || score == 10){
                alert("Congrats! you unlocked next level :)")
                AddMoreEggs();
            }
            else if(score >15){
                alert("congratulations you won!");
            }
            document.querySelector("p").innerText = "Score: " + score;
            this.element.style.visibility="hidden";
            this.reset();
        }
        else{
            this.broken();
        }
    }


};

let eggs= [];
let numEggs=1;
const initializeEggs = () =>{
    for(let i=0;i<numEggs;i++){
        eggs.push(new Egg());
    }

}

const startGame = () => {
    initializeEggs();
    id = setInterval(()=>{
    eggs.forEach((egg,index)=>{
        egg.fall();
    })
},100);

let left=0;

document.addEventListener("keydown" , function(event){
    console.log(event)
    if(event.key=="ArrowLeft"){
        if(left>0){
            left-=20;
            basket.style.left = `${left}px`;

        }
    }
    else if(event.key=="ArrowRight"){
        if(left<=window.innerWidth-basket.width){
            left+=20;
            basket.style.left = `${left}px`;

        }
        
    }
});
}

function AddMoreEggs(){
    numEggs++;
    eggs.push(new Egg());
}



