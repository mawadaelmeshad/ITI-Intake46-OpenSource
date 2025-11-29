document.querySelectorAll("div").forEach(item=>item.addEventListener("click" , createDiv = function (){
    let newDiv=  document.createElement("div");
    console.log(newDiv);
    // console.log(`this is : ${this.style.backgroundColor}, item is : ${item.style.backgroundColor}`)
    newDiv.style.backgroundColor=this.style.backgroundColor;
    newDiv.addEventListener("click", createDiv, {once:true});
    document.body.appendChild(newDiv);


},{once : true}));