if(currentUser){
    if(currentUser.role=="teacher"){
        window.location.href="dashboard.html";
    }
    else{
        window.location.href="profile.html";

    }
}
document.querySelector("#login").addEventListener("click" ,async function(e){
    e.preventDefault();
    let username = document.querySelector("#username").value;
    let pass = document.querySelector("#pass").value;
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

    if(username && pass){
        let stdsArr = JSON.parse(localStorage.getItem("stds"));
        let userExist  = false;
        let role = "std";

        stdsArr.find(item=>{
            console.log(item);
            console.log(username)
            if(item.username == username && item.password == pass){
                userExist = true;
            }
        });
        try{
            await fetch('../teachers.json')
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                data.teachers.find(item=>{
                // console.log(item);
                // console.log(username)
                if(item.username == username && item.password == pass){
                    userExist = true;
                    role = "teacher";
                }
            });  
            });
        }
        catch(error){
            console.log(error)
            alert('An error occured please try again !')
        }

        if(userExist){
            localStorage.setItem("user", JSON.stringify({username , pass, role}));
            alert("You logged in successfully!");
            if(role=="std"){
                window.location.pathname="profile.html";
            }
            else if(role == "teacher"){
                window.location.pathname="dashboard.html";
            }

        }
        else{
            alert("Your info is wrong");
        }

    }
});

document.querySelector("#username").addEventListener("input" , function(){
    document.querySelector("#errorName").style.display = "none";
});
document.querySelector("#pass").addEventListener("input" , function(){
    document.querySelector("#errorPass").style.display = "none";
});
