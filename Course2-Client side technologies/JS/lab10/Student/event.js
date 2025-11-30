/**
 * event -->  action
 * EventListener (handel event)
 * 
 * 
 * button --> click (event) --> proprty   oneventName (onclick)
 * 
 * How to handel events on object
 * 1- property Object 
 *  a- property onevent
 *  b- addEventListener("eventName",callBack,options)
 * 2- tag  onclick (not recomended)
 */

let startBtn=document.querySelector("button");
let divBox=document.querySelector("#divBox");
// startBtn.onclick=function(){  //forbidden =>
//     document.body.style.backgroundColor="pink";
// }

//deatchment
// startBtn.onclick=null;

// attcah click event on image
// document.images[0].addEventListener("click",function(){
//     alert("image");
// },{ once:true} );

// document.images[0].addEventListener("click",funactionname)
// document.images[0].removeEventListener("click",functionname)


//attcah more than on event on object
divBox.onmouseover=()=>{
    this.classList.add("bPink");
    startBtn.onclick=()=>{  //forbidden =>
        alert(this);
    document.body.style.backgroundColor="pink";
        }
}

divBox.onmouseout=function(){
    this.classList.remove("bPink");
}



divBox.onmousemove=function(event){
    this.innerText=`${event.x} : ${event.y}`
}








