if(!currentUser){
    window.location.href="login.html";
}
document.querySelector("#welcome").innerText +=" prof. "+ JSON.parse(localStorage.getItem("user")).username + " !";
const tbody = document.querySelector("#stdResBody");
console.log(studentsResults)
let resDataExist = false;
studentsResults.forEach(ex=>{
    if(ex.examCreator == currentUser.username){
        resDataExist = true;
        let row = document.createElement("tr");
        row.classList.add("tr-exams");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let tdActions = document.createElement("td");
        
        td2.innerText=ex.name;
        td2.classList.add("text-center");
        td1.innerText=ex.examId;
        td1.classList.add("text-right");
        td3.innerText=ex.res;
        td3.classList.add("text-right");
        tdActions.classList.add("text-center", "border", "px-4", "py-2");
        let viewBtn = document.createElement("button");
        viewBtn.innerText = "View Details";
        viewBtn.classList.add("text-purple-900", "font-bold");
        viewBtn.onclick = () => viewExamDetails(ex);
        tdActions.appendChild(viewBtn);

        row.appendChild(tdActions);
        row.appendChild(td3);
        row.appendChild(td2);
        row.appendChild(td1);


        tbody.appendChild(row);

    }
});
if(!resDataExist){
    tbody.innerHTML= 
    `<tr>
        <td colspan="4" class="text-center">No Data</td>
    </tr>`
}

let modalContainer = document.querySelector("#examDetailsModal");
document.querySelector(".closeModal").addEventListener("click", function(){
    modalContainer.classList.add("hidden");
    window.location.reload();
});
modalContainer.addEventListener("click", function(e) {
    if (e.target == this) {
        this.classList.add("hidden");
        window.location.reload();

    }
});

function viewExamDetails(stdRes) {
    const completedExam = completedExams.find(c => 
        c.examId == stdRes.examId && c.stdName == stdRes.name
    );
    
    if (!completedExam) {
        alert("Exam details not found!");
        return;
    }
    
    document.getElementById('modalTitle').innerText = `${stdRes.name}'s Exam: ${completedExam.examName}`;
    document.getElementById('studentInfo').children[0].innerText += stdRes.name;
    document.getElementById('studentInfo').children[1].innerText += completedExam.score.toFixed(2)+ '%';
    document.getElementById('studentInfo').children[2].innerText += new Date(completedExam.dateTaken).toLocaleString();


    let questionsHTML = '';
    
    completedExam.questions.forEach((question, index) => {
        const answer = completedExam.answers[index];
        const isCorrect = answer ? answer.correct : false;
        
        questionsHTML += `
            <div class="mb-6 p-4 border rounded ${isCorrect ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}">
                <div class="flex justify-between items-center mb-2">
                    <h4 class="font-bold">Question ${index + 1}</h4>
                    <span class="px-2 py-1 rounded text-sm ${isCorrect ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}">
                        ${isCorrect ? 'correct' : 'wrong'}
                    </span>
                </div>
                <p class="mb-2">${question.txt}</p>
                <p class="text-sm"><strong>Student's Answer:</strong> ${answer ? answer.selectedAnswer : 'Not answered'}</p>
            </div>
        `;
    });
    
    document.getElementById('examQuestionsContainer').innerHTML = questionsHTML;
    
    document.getElementById('examDetailsModal').classList.remove('hidden');
}