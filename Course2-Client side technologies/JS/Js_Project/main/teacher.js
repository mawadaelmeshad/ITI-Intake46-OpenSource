if(!currentUser){
    window.location.href="login.html";
}
document.querySelector("#welcome").innerText +=" prof. "+ JSON.parse(localStorage.getItem("user")).username + " !";
const tbody = document.querySelector("#examsBody");
let selectedCheckboxes;
let examsDataExist = false;
exams.forEach(ex=>{
    if(ex.creator == currentUser.username){
        examsDataExist = true;
        let row = document.createElement("tr");
        row.classList.add("tr-exams");
        let tdActions = document.createElement("td");
        tdActions.className = "font-bold text-left";
        tdActions.innerHTML = `
            <span class="editExam text-blue-800 pl-4 cursor-pointer" data-exam-id="${ex.id}">Edit</span>
            <span class="deleteExam text-red-800 pl-4 cursor-pointer" data-exam-id="${ex.id}" >Delete</span>
        `;
        row.appendChild(tdActions);
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        td2.innerText=ex.name;
        row.appendChild(td2);
        td2.classList.add("text-center");
        td1.innerText=ex.id;
        td1.classList.add("text-right");
        row.appendChild(td1);
        tbody.appendChild(row);

    }
});
if(!examsDataExist){
    tbody.innerHTML= 
    `<tr>
        <td colspan="3" class="text-center">No Data</td>
    </tr>`
}


document.querySelector("#add").addEventListener("click" , function(){
    document.getElementById("modalOverlay").classList.remove("hidden");
    
});
document.querySelector(".closeAdd").addEventListener("click", function(){
    document.getElementById("modalOverlay").classList.add("hidden");

});
document.getElementById("modalOverlay").addEventListener("click", function(e) {
    if (e.target === this) {
        this.classList.add("hidden");
    }
});

// assigned students section in thr modal
const container = document.querySelector(".assign-stds-container");
stds.forEach(std => {
    const label = document.createElement('label');
    label.className = 'flex items-center gap-2 p-2  rounded cursor-pointer';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'student-checkbox w-4 h-4';
    checkbox.value = std.username; 
    const text = document.createTextNode(`${std.username} - Grade ${std.grade}`);
    label.appendChild(checkbox);
    label.appendChild(text);
    container.appendChild(label);
});

//validations
document.querySelector("#examBtn").addEventListener("click" , function(e){
    e.preventDefault();
    let error;

    const examName = document.getElementById('examName').value;
    if (examName == "") {
        error = document.querySelector("#errorExName");
        error.style.display="block";
        return;

    }
    const duration = document.getElementById('duration').value;
    if (duration == "" || Number(duration) < 20) {
        error = document.querySelector("#errorDuration");
        error.style.display="block";
        return;
    }
    const Qnumber = document.getElementById('Qnumber').value;
    if (!Qnumber || Qnumber<3) {
        error = document.querySelector("#errorQnumber");
        error.style.display="block";
        return;

    }
    
    selectedCheckboxes = document.querySelectorAll('.student-checkbox:checked');
    
    if (selectedCheckboxes.length == 0) {
        error = document.querySelector("#errorAssign");
        error.style.display="block";
        return;
    }

    if(examName && duration && Qnumber && selectedCheckboxes.length!=0){
        const user = JSON.parse(localStorage.getItem("user"));

        if (window.editingExamId) {
        
            currentExam.name = examName;
            currentExam.duration = duration;
            currentExam.questionCount = Qnumber;
            currentExam.assignedStudents = Array.from(selectedCheckboxes).map(cb => cb.value);
        } else {
            currentExam = new Exam(user.username, examName, duration, Qnumber, 100);
            currentExam.assignedStudents = Array.from(selectedCheckboxes).map(cb => cb.value);
        }

        document.querySelector(".stepOne").classList.add("hidden");
        document.querySelector(".stepTwo").classList.remove("hidden");
        document.getElementById('modalTitle').innerText = `Add ${Qnumber} Questions`;
        generateQuestions(Qnumber, currentExam.questions);
    }

});

function generateQuestions(Qnumber, existingQuestions = []){
    let container = document.querySelector("#questionsContainer");
    container.innerHTML = '';
    const temp = document.getElementById('questionTemplate');
    const scorePerQ = Math.round(100 / Qnumber);
    const remaining = 100 - (scorePerQ * Qnumber);


    for(let i =0; i < Qnumber; i++){

        const clone = temp.content.cloneNode(true);
        const existingQ = existingQuestions[i];
        console.log(clone);
        const Qscore = scorePerQ + (i<remaining ? 1: 0);
        let defaultLevel = 'Medium';
        clone.querySelector('.question-header').textContent = `Question ${i + 1}`;
        clone.querySelector('.question-text').value = existingQ?.txt || '';
        clone.querySelector('.question-level').value = existingQ?.level || defaultLevel;
        clone.querySelector('.question-score').value = existingQ?.score || Qscore;
        const radioButtons = clone.querySelectorAll('.correct-answer');
        radioButtons.forEach((radio, idx) => {
            radio.name = `correct${i}`;
            if(existingQ && idx === existingQ.correctAns) {
                radio.checked = true;
            }
        });
        
        const choices = clone.querySelectorAll('.choice-text');
        choices.forEach((choice, idx) => {
            choice.value = existingQ?.choices?.[idx] || '';
        });
        
        const imagePreview = clone.querySelector('.image-preview');
        if(existingQ?.img) {
            const img = document.createElement('img');
            img.src = existingQ.img;
            img.style.maxWidth = '200px';
            img.style.borderRadius = '8px';
            img.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
            imagePreview.appendChild(img);
        }
        const imageInput = clone.querySelector('.question-image');
        imageInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                console.log(file.name);
                // Show preview
                const img = document.createElement('img');
                img.src =`../Images/${file.name}`;
                img.style.maxWidth = '200px';
                img.style.borderRadius = '8px';
                img.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                
                imagePreview.innerHTML = '';
                imagePreview.appendChild(img);
                
            }
        });
        
        
        container.appendChild(clone);

    }

}


document.getElementById('saveExamBtn').addEventListener('click', function() {
    const numQuestions = currentExam.questionCount;
    let allValid = true;
    
    currentExam.questions = [];
    
    const questionCards = document.querySelectorAll('.question-card');
    
    questionCards.forEach((card, i) => {
        const qText = card.querySelector('.question-text').value.trim();
        
        const imgInput = card.querySelector('.question-image');
        let qImg = '';
    
        if (imgInput && imgInput.files && imgInput.files.length > 0) {
            qImg = imgInput.files[0].name; // Get just the filename
        }
        
        const choiceInputs = card.querySelectorAll('.choice-text');
        const choices = Array.from(choiceInputs).map(input => input.value.trim());
        
        const correctRadio = card.querySelector('.correct-answer:checked');
        const correctAns = correctRadio ? parseInt(correctRadio.value) : undefined;
        
        const level = card.querySelector('.question-level').value;
        
        const score = parseInt(card.querySelector('.question-score').value);
        
        if (!qText || choices.some(c => !c) || correctAns === undefined) {
            alert(`Please complete all fields for Question ${i + 1}`);
            allValid = false;
            return;
        }
        
        const question = new Question(qText, qImg, choices, correctAns, level, score);
        currentExam.addQuestion(question);
    });
    
    if (allValid && currentExam.questions.length == numQuestions) {

        if (!currentExam.validateDifficulty()) {
            alert('Exam must have Easy, Medium, and Hard questions!');
            return;
        }
        
        if (window.editingExamId) {
            const examIndex = exams.findIndex(ex => ex.id === window.editingExamId);
            exams[examIndex] = currentExam;
            alert(`Exam ${currentExam.name} updated successfully!✅`);
            window.editingExamId = null; 
        } else {
            exams.push(currentExam);
            alert(`Exam ${currentExam.name} created successfully!✅`);
        }
        localStorage.setItem('exams', JSON.stringify(exams));
        window.location.reload();
        
        document.getElementById("modalOverlay").classList.add("hidden");
    }
});

document.querySelector("tbody").addEventListener("click", function(e) {
    if (e.target.classList.contains("editExam")) {
        const examId = parseInt(e.target.dataset.examId);
        handleEdit(examId);
    }
    
    if (e.target.classList.contains("deleteExam")) {
        const examId = parseInt(e.target.dataset.examId);
        handleDelete(examId);
    }
});

function handleEdit(examId){
    console.log(examId)
    const exam = exams.find(ex => ex.id === examId);
    if (!exam) {
        alert("Exam not found!");
        return;
    }
    // I had to do this because it was creating a whole new object when editing the exam
    currentExam = Object.assign(new Exam(), exam);
    currentExam.id = examId;

    window.editingExamId = examId;
    document.getElementById("modalOverlay").classList.remove("hidden");
    document.getElementById('modalTitle').innerText = 'Edit Exam';
    // put the data inside fields
    document.getElementById('examName').value = exam.name;
    document.getElementById('duration').value = exam.duration;
    document.getElementById('Qnumber').value = exam.questionCount;
    const checkboxes = document.querySelectorAll('.student-checkbox');
    checkboxes.forEach(cb => {
        cb.checked = exam.assignedStudents && exam.assignedStudents.includes(cb.value);
    });
    const examBtn = document.querySelector("#examBtn");
    examBtn.textContent = "Continue";
};

function handleDelete(examId) {
    const exam = exams.find(ex => ex.id === examId);
    if (!exam) {
        alert("Exam not found!");
        return;
    }
    
    const confirmDelete = confirm(`Are you sure you want to delete "${exam.name}"?`);
    
    if (confirmDelete) {
        const examIndex = exams.findIndex(ex => ex.id === examId);
        exams.splice(examIndex, 1);
        localStorage.setItem('exams', JSON.stringify(exams));
        
        alert(`✅Exam "${exam.name}" deleted successfully!`);
        window.location.reload();
    }
}
