class Exam {
    constructor(creator, name, duration, questionCount, totalScore) {
        this.id = Date.now();
        this.creator = creator;
        this.name = name;
        this.duration = duration; 
        this.questionCount = questionCount;
        this.totalScore = totalScore;
        this.questions = [];
        this.assignedStudents = []; 
    }
    addQuestion(question){
        this.questions.push(question);
    }
    validateDifficulty(){
        let easy = this.questions.filter(q => q.level === 'Easy').length;
        let medium = this.questions.filter(q => q.level === 'Medium').length;
        let hard = this.questions.filter(q => q.level === 'Hard').length;
        return easy>0 && medium>0 && hard>0;
    }
}