if(!currentUser){
    window.location.href="login.html";
}
document.querySelector("#welcome").innerText +=" " +JSON.parse(localStorage.getItem("user")).username + " !";
document.querySelector("#username").innerText = currentUser.username;
let userImg ;
stds.map(std=>{
    if(std.name == currentUser.name){
        userImg = std.img;
    }
});
console.log(userImg);
document.querySelector("#userImg").src = `../Images/${userImg}`
console.log(exams);
exams.map(ex=>ex?.assignedStudents.map(std=>{
    if(std==currentUser.username){
        requiredExams.push(ex);
        
    }
}));
console.log(requiredExams);
const currentUserCompletedExams = completedExams?.filter(ex => ex.stdName == currentUser.username) || [];
const completedExamIds = currentUserCompletedExams.map(ex => ex.examId);

requiredExams = exams.filter(ex => {
    const isAssigned =  ex?.assignedStudents.includes(currentUser.username);
    
    const isNotCompleted = !completedExamIds.includes(ex.id);
    
    return isAssigned && isNotCompleted;
});
console.log(requiredExams);


if(requiredExams.length>0){
    document.querySelector(".noExams").classList.add("hidden");
}
requiredExams?.map(ex => {
    let li = document.createElement("li");
    let btn = document.createElement("button");
    li.innerText = ex.name;
    li.classList.add("li-exams")

    btn.innerText="Start";
    console.log(btn);
    btn.classList.add("btn-start");
    btn.onclick = function(){
        localStorage.setItem('currentExam', JSON.stringify(ex));
        window.location.pathname="exam.html";
    }
    li.appendChild(btn);
    document.querySelector("#nextExams").appendChild(li);

});

let table = document.querySelector("#completedExams");
let tableBody = document.querySelector("#completedExamsBody");
console.log(`compelted exams : ${currentUser}`);
let stdCompletedExamDataExist= false;
completedExams?.forEach(ex=>{
    if(ex.stdName == currentUser.username){
        stdCompletedExamDataExist = true;
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        td1.innerText = ex.examName;
        let td2 = document.createElement("td");
        td2.innerText =Math.round(ex.score) + '%';
        let td3 = document.createElement("td");
        td3.innerText = ex.dateTaken.substr(0,10);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tableBody.appendChild(tr);
    }
});
if(!stdCompletedExamDataExist){
    tableBody.innerHTML= 
    `<tr>
        <td colspan="3" class="text-center">No Data</td>
    </tr>`
}

