class Student {
    constructor(username, password, grade, phone, img){
        this.username = username,
        this.password=password,
        this.grade = grade,
        this.phone = phone,
        this.img = img
        this.completedExams = [];
        this.theme = 'light'
    }
    addExamRes(examId, score, asnwers){
        this.completedExams.push(
            {
                examId: examId,
                score:score, 
                date :new Date().toDateString(), 
                asnwers: asnwers
            }
        );
    }

}