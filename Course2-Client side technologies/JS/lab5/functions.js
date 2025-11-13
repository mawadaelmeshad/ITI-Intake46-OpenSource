// function getStudentGrades(){
//     let enGrade= prompt("Enter your grade in english");
//     while(isNaN(enGrade)){
//         enGrade= prompt("Enter your grade in english and must be a number");
//     }
//     let arGrade= prompt("Enter your grade in arabic");
//     while(isNaN(arGrade)){
//         arGrade= prompt("Enter your grade in arabic and must be a number");
//     }
//     let muGrade= prompt("Enter your grade in music");
//     while(isNaN(muGrade)){
//         muGrade= prompt("Enter your grade in music and must be a number");
//     }
//     let hiGrade= prompt("Enter your grade in history");
//     while(isNaN(hiGrade)){
//         hiGrade= prompt("Enter your grade in history and must be a number");
//     }

//     return {"English grade": enGrade,"Arabic grade": arGrade,"Music grade": muGrade,"History grade": hiGrade};

// }


function getStudentGrades(){
    let grades="";
    let sum=0;
    let NumberOfStudents= prompt(`Enter the number of students`);
    while(isNaN(Number(NumberOfStudents))){
            NumberOfStudents= prompt("Enter number of students again");
    }

    for(let i=0;i<Number(NumberOfStudents);i++){
        let grade= prompt(`Enter the grade of student number ${i}`);
        while(isNaN(Number(grade)) || Number(grade) < 0 || Number(grade) > 100){
            grade= prompt("Enter the grade again and must be a number between 0 and 100");
        }
        sum+=Number(grade);
        grades+=`student number ${i} grade is : `;
        grades+=grade;
        grades+=" ";
    }
    if(Number(NumberOfStudents)<2 || Number(NumberOfStudents)>10){
        alert("Error! you entered a number that is not between 2 and 10");
    }
    else{
        console.log("summation of all grades is",sum);
    }
    

    return {grades, sum};

}

