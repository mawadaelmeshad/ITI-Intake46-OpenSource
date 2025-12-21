if(currentUser){
    if(currentUser.role=="teacher"){
        window.location.href="dashboard.html";
    }
    else{
        window.location.href="profile.html";

    }
}

document.querySelector("#register").addEventListener("click" , function(e){
    e.preventDefault();
    let username = document.querySelector("#username").value;
    console.log(username);
    let pass = document.querySelector("#pass").value;
    let grade = document.querySelector("#grade").value;
    let phone = document.querySelector("#phone").value;
    let img= document.querySelector("#img");
    let imgFileName = "";
    if(img.files && img.files.length > 0){
        imgFileName = img.files[0].name;
    }
    let errorMsg;

    if(username==""){
        errorMsg = document.querySelector("#errorName");
        errorMsg.style.display = "block";
        return;

    }
    if(pass=="" || pass.length<6){
        errorMsg = document.querySelector("#errorPass");
        errorMsg.style.display = "block";
        return;

    }
    if(grade=="" || grade<1 || grade>3){
        errorMsg = document.querySelector("#errorGrade");
        errorMsg.style.display = "block";
        return;

    }
    if(phone=="" || phone.length<11){
        errorMsg = document.querySelector("#errorPhone");
        errorMsg.style.display = "block";
        return;

    }
    if(imgFileName==""){
        errorMsg = document.querySelector("#errorImg");
        errorMsg.style.display = "block";
        return;

    }

    if(username && pass && grade && phone && imgFileName){
        let std = new Student(username, pass, grade, phone, imgFileName);
        stds.push(std);
        localStorage.setItem('stds', JSON.stringify(stds));
        console.log(stds);
        console.log(std);
        alert("You registerd successfully!");
        window.location.pathname='login.html';
    }
});

document.querySelector("#username").addEventListener("input" , function(){
    document.querySelector("#errorName").style.display = "none";
});
document.querySelector("#pass").addEventListener("input" , function(){
    document.querySelector("#errorPass").style.display = "none";
});
document.querySelector("#grade").addEventListener("input" , function(){
    document.querySelector("#errorGrade").style.display = "none";
});
document.querySelector("#phone").addEventListener("input" , function(){
    document.querySelector("#errorPhone").style.display = "none";
});
document.querySelector("#img").addEventListener("input" , function(){
    document.querySelector("#errorImg").style.display = "none";
});