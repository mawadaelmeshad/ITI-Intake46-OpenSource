let stds = JSON.parse(localStorage.getItem('stds')) || [];
let exams = JSON.parse(localStorage.getItem('exams')) || [];
let requiredExams = JSON.parse(localStorage.getItem('requiredExams')) || [];
let completedExams = JSON.parse(localStorage.getItem('completedExams')) || [];
let currentTheme= localStorage.getItem("theme") || 'light';

let currentExam = null;
let currentUser = JSON.parse(localStorage.getItem('user'));
const currentUserExam = JSON.parse(localStorage.getItem('currentExam')) || null;
let studentsResults = JSON.parse(localStorage.getItem('StudentsResults')) || [];
if(document.querySelector(".logout")){
    document.querySelector(".logout").addEventListener("click", function(){
        localStorage.removeItem("user");
        window.location.href="login.html";
    });
}
