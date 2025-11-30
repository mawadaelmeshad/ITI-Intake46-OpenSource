// class Bird { 
//     constructor(src,top,left,img){
//         this.src = src;
//         this.top = top;
//         this.left = left;
//         this.img=img;
//     }
//     createBird(){

//     }

// }

    document.body.style.backgroundImage="url(../images/bg.jpg)";
    let move = Math.random() * (window.innerWidth);
    document.querySelectorAll('img')[0].style.top=`${Math.random() * window.innerHeight-30}px`;
    document.querySelectorAll('img')[1].style.top=`${Math.random() * window.innerHeight-30}px`;
    document.querySelectorAll('img')[2].style.top=`${Math.random() * window.innerHeight-30}px`;
    document.querySelectorAll('img')[3].style.top=`${Math.random() * window.innerHeight-30}px`;

    let birdWidth = document.querySelectorAll('img')[0].width;
    let intervals = [];
    let id;
            document.querySelectorAll('img').forEach((img, index)=>{
            id = setInterval(()=>{
                if(move<=window.innerWidth){
                    img.style.left=`${move}px`;
                    move+=20;
                }
                else {
                    move=Math.random();
                    img.style.top=Math.random();
                }

        },300);
        intervals[index]= id;
    });

    window.document.querySelectorAll("img").forEach((img,index)=>img.addEventListener("click" , function(){
        img.src="../images/dead.png";
        clearInterval(intervals[index]);
        let startFalling = setInterval(()=>{
            let top = parseInt(img.style.top) || 0;  
            top += 20;
            img.style.top = `${top}px`;
            if(top>= window.innerHeight){
                clearInterval(startFalling);
                img.style.visibility="hidden";

            }
        },80);
                    
        let counter = 0;
        document.querySelector("p").innerText+=counter;
        document.querySelectorAll("img").forEach(img=>{
            if(img.src.includes("dead.png")) {
            counter++;
            document.querySelector("p").innerText="Score : " + counter;

        }
        });
        setTimeout(()=>{
            if(counter == document.querySelectorAll("img").length){
                alert("congrats! you won");
            }
        },100);
    }));
