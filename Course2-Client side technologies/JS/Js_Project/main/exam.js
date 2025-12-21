if (!currentUserExam || !currentUser) {
    alert('Invalid access!');
    window.location.href = "profile.html";
}
console.log('Taking exam:', currentUserExam);
document.getElementById('examTitle').innerText = currentUserExam.name;
document.getElementById('examInfo').innerText = `Total duration: ${currentUserExam.duration} minutes`;
document.getElementById('progressText').innerText = `Question 1 of ${currentUserExam.questions.length}`;

randomizedQuestions = [...currentUserExam.questions].sort(() => Math.random() - 0.5);
let currentQuestionIndex = 0;
let score = 0;
let answers = [];
let questionTimer;
function displayQuestion(index=0){
    startQuestionTimer(index)
    if (index >= randomizedQuestions.length) {
        showResults();
        return;
    }
    const question = randomizedQuestions[index];
    console.log(`Q : ${question}`)
    currentQuestionIndex = index;
    document.getElementById('progressText').innerText = 
    `Question ${index + 1} of ${randomizedQuestions.length}`;
    
    const questionsContainer = document.getElementById('questionsContainer');
    const choicesContainer = document.getElementById('choicesContainer');
    questionsContainer.innerHTML = '';
    choicesContainer.innerHTML = '';
    const questionTitle = document.createElement('h2');
    questionTitle.className = 'text-2xl font-semibold mb-4';
    questionTitle.innerText = question.txt;
    questionsContainer.appendChild(questionTitle);
    if(question.img){
        let img = document.createElement("img");
        img.style.width="200px";
        img.src=`../Images/${question.img}`;
        questionsContainer.appendChild(img);
    }
    const randomizedChoices = question.choices
    .map((choice, i) => ({choice, originalIndex: i}))
    .sort(() => Math.random() - 0.5);
    randomizedChoices.forEach(({choice, originalIndex}) => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.textContent = choice;
        btn.onclick = () => selectAnswer(choice, btn);
        choicesContainer.appendChild(btn);
    });
    document.getElementById('nextBtn').disabled = true;

}

function selectAnswer(choice, clickedBtn) {
    clearTimeout(questionTimer);
    const audio = new Audio();
    
    const question = randomizedQuestions[currentQuestionIndex];
    const isCorrect = choice == question.correctAns;
    
    // disable all choice buttons
    const allBtns = document.querySelectorAll('.choice-btn');
    allBtns.forEach(btn => {
        btn.disabled = true;
        btn.style.pointerEvents = 'none';
    });

    
    if (isCorrect) {
        clickedBtn.classList.add('correct');
        clickedBtn.style.backgroundColor = '#10b981'; 
        audio.src=`../Sounds/rightanswer-95219.mp3`;
        audio.play();
        score++;
    } else {
        clickedBtn.classList.add('wrong');
        audio.src=`../Sounds/buzzer-or-wrong-answer-20582.mp3`;
        audio.play();
        clickedBtn.style.backgroundColor = '#ef4444';
    }
    
    answers.push({
        questionIndex: currentQuestionIndex,
        selectedAnswer: choice,
        correct: isCorrect
    });
    
    // enable next button
    document.getElementById('nextBtn').disabled = false;
}

let examStartTime;
let totalExamDuration; // in ms

function startExamTimer() {
    totalExamDuration = currentUserExam.duration * 60 * 1000; // minutes to ms
    examStartTime = Date.now();
    
    updateTimerBar();
}

function updateTimerBar() {
    const elapsed = Date.now() - examStartTime;
    const remaining = Math.max(0, totalExamDuration - elapsed);
    const percentage = (remaining / totalExamDuration) * 100;
    
    document.getElementById('timerBar').style.width = `${percentage}%`;
    
    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    document.getElementById('timerDisplay').innerText = 
        `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    // change  color when time is running out
    if (percentage < 20) {
        document.getElementById('timerBar').style.background = '#ef4444'; 
    } else if (percentage < 50) {
        document.getElementById('timerBar').style.background = '#f59e0b'; 
    }
    
    if (remaining > 0) {
        requestAnimationFrame(updateTimerBar);
    } else {
        showResults();
    }
}
function startQuestionTimer(currentQuestionIndex) {
    const timePerQuestion = (currentUserExam.duration * 60 * 1000) / randomizedQuestions.length;
    document.querySelector("#timePerQ").innerText = Math.round( (timePerQuestion / 1000) /60) + " minutes for this question";
    
    questionTimer = setTimeout(() => {

        answers.push({
            questionIndex: currentQuestionIndex,
            selectedAnswer: null,
            correct: false
        });
        
        if (currentQuestionIndex < randomizedQuestions.length - 1) {
            displayQuestion(currentQuestionIndex + 1);
        } else {
            showResults();
        }
    }, timePerQuestion);
}

function showResults() {
    clearTimeout(questionTimer);
    
    const percentage = (score / randomizedQuestions.length) * 100;
        
        completedExams.push({
            examId : currentUserExam.id,
            examName: currentUserExam.name,
            score: percentage,
            answers: answers,
            questions: randomizedQuestions.map(q => ({
            txt: q.txt,
            })),
            stdName: currentUser.username,
            dateTaken: new Date().toISOString(),
            
        });
        
        localStorage.setItem('completedExams', JSON.stringify(completedExams));
        let stdResult = new StudentRes(
            currentUser.username,          
            percentage.toFixed(2),          
            currentUserExam.creator,
            new Date().toISOString(),       
            currentUserExam.id             
        );
        studentsResults.push(stdResult);
        localStorage.setItem('StudentsResults', JSON.stringify(studentsResults));
        alert(`${currentUserExam.name} completed and your Score is: ${percentage.toFixed(1)}%`);
        window.location.href = 'profile.html';
}

displayQuestion(0);
startExamTimer();
document.getElementById('nextBtn').addEventListener('click', () => {
    clearTimeout(questionTimer);
    if (currentQuestionIndex < randomizedQuestions.length - 1) {
        displayQuestion(currentQuestionIndex + 1);
    } else {
        showResults();
    }
});