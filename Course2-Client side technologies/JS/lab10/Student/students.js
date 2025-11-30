
let studentTable = document.querySelector("#studentsData");



const createStudentRow=function(student){
    let trElm=  document.createElement("tr");
    trElm.classList.add(`bg-${(student.depertment).toLowerCase()}`)
    studentTable.append(trElm);
            
        for(let property in student)
        {
            console.log(property)
            let tdElem=document.createElement("td");
            tdElem.innerText=student[property];
            trElm.append(tdElem);
        }
        // adding delete button
            let tdElem=document.createElement("td");
            trElm.append(tdElem);
            let deleteBtnElem=document.createElement("button");
            deleteBtnElem.innerText="Delete";
            tdElem.append(deleteBtnElem);

        //handel delete
        deleteBtnElem.onclick=function(){
            this.parentElement.parentElement.remove();
            const index = stds.findIndex(s => s.name === student.name);
            if(index != -1){
                stds.splice(index, 1);
            }
        }
return trElm;    
};

const PascalCase = (word) => {
    if (word.indexOf(" ")!=-1){
        let first = word.slice(0, word.indexOf(" "));
        let second = word.slice(word.indexOf(" ")+1);
        return first[0].toUpperCase()+first.slice(1) + second[0].toUpperCase()+second.slice(1);
    }
    else{
        return word[0].toUpperCase()+ word.slice(1);
    }
}

function handleFilter(selectedValue){
    studentTable.innerHTML = "";
    let filterdStds;
    console.log("filter value" , selectedValue)

    if(selectedValue == "success"){
        filterdStds= stds.filter(std=>std.grade>=60);

    }
    else if(selectedValue=="fail"){
        filterdStds= stds.filter(std=>std.grade<60);
    }
    
    else{
        filterdStds = stds;
    }
    filterdStds.forEach(element => {
        createStudentRow(element);
        
    });

};
function handleSort(selectedValue){
    studentTable.innerHTML = "";
    let filterdStds;

    if(selectedValue == "name"){
        console.log("sort by name")
        filterdStds= stds.slice().sort((a,b)=>a.name.localeCompare(b.name));
    }
    else if(selectedValue == "grade"){
        console.log("sort by grade")
        filterdStds = stds;
        filterdStds.sort((a,b)=>Number(b.grade) - Number(a.grade));
        console.log(filterdStds)
    }
    else{
        filterdStds = stds;

    }
    filterdStds.forEach(element => {
        createStudentRow(element);
        
    });
}

let submitBtn=document.querySelector("input[type='button']");
let stds= [];

submitBtn.addEventListener("click", function (){
    let std = new Student();
    let name = document.querySelector("input[type='text']").value;
    let grade = document.querySelector("input[name='studentGrade']").value;
    let depertment =  document.querySelector("input[type='radio']:checked").value;
    let hasError=false;

    if(name == "" || stds.find(std=>std.name==PascalCase(name))){
        document.querySelector("#nameError").style.display="block";
        hasError=true;
    }
    if(grade == "" || grade>100 || grade < 0){
        document.querySelector("#gardeError").style.display="block";
        hasError=true;

    }
    if(hasError){
        return;
    }

    std.name = PascalCase(name);
    std.grade = grade;
    std.depertment = depertment;
    stds.push(std);
    createStudentRow(std);
});

let filter = document.querySelector("#filter");
let selectedValue = filter.value;
filter.addEventListener("change", function (){
    selectedValue = this.value;
    handleFilter(selectedValue);

});

let sort = document.querySelector("#sort");
let sortVal = sort.value;
console.log(`sort val ${sortVal}`)
sort.addEventListener("change", function(){
    sortVal = this.value;
    handleSort(sortVal);
})