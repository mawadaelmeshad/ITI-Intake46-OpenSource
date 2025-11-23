const combineInput= (names, ages) => {
    let res= [];
    for(let i=0;i<names.length;i++){
        res.push({name : names[i] , age: ages[i]});
    }
    return res;
}
combineInput(["mawada","sarah"],[20,21]);

const countFrequency = (arr) => {
    let freq={}
    for(let i=0;i<arr.length;i++){
        if(freq[arr[i]]){
            freq[arr[i]]++;
        }
        else{
            freq[arr[i]]=1;
        }
    }
    return freq;
}

const groupGrades = (arr) => {
    let res={
        A : [],
        B: [],
        C: [],
        D: [],
        F: []
    };
    for(let i=0;i<arr.length;i++){
        if(arr[i]>=90){
            res['A'].push(arr[i]);
        }
        else if(arr[i]>=80){
            res['B'].push(arr[i]);
        }
        else if(arr[i]>=70){
            res['C'].push(arr[i]);
        }
        else if(arr[i]>=60){
            res['D'].push(arr[i]);
        }
        else{
            res['F'].push(arr[i]);
        }
    }
    return res;
}
groupGrades([95,90,70,50,40]);

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
PascalCase("mawada elmesahd");

const namesPascal = (objs) => {    
    return objs.map(obj => ({
        name : PascalCase(obj.name),
        grade : obj.grade,
    }));
}
namesPascal([{name:"ahmed", grade:90}, {name:"mona", grade:80}]);


const sortByGrade = (stds) => {
    return stds.sort((a,b) => b.grade - a.grade);
}
sortByGrade([{name:"Ali", grade:70}, {name:"Sara", grade:95}]);

const heightsGrade = (stds) => {
    let maxGrade = Math.max(...stds.map(s => s.grade))
    return stds.filter(std => std.grade == maxGrade);
}
heightsGrade([{name:"Ali", grade:70}, {name:"Sara", grade:95}]);


const filterStdWhoPassed = (stds) => {
    return stds.filter(std=>std.grade >= 60);
}
filterStdWhoPassed([{name:"Ali", grade:55}, {name:"Sara", grade:95}, {name:"Mona", grade:62}]);

const convertToString = (objs) => {
    return objs.map(obj=> obj.name + " " + obj.grade);
}
convertToString([{name:"Ali", grade:70}, {name:"Sara", grade:95}]);


const countStdsNamesMoreThan4 = (stds) => {
    const count = stds.map(std=>std.name).reduce((acc, curr) => {
        // console.log(curr);
        return curr.length >= 4 ? acc+1 : acc;
    }, 0);
    return count;
}

const createBook = (title, author, year, price) => {
    let obj = {
        title : title,
        author : author,
        year: year,
        price : price,
        getDetails() {
            return `${this.title} by ${this.author} (${this.year}) - $${this.price}`;
        },
        isClassic () {
            if(2025-this.year > 20){
                return true;
            }
            else{
                return false;
            }
        },
        applydis (percent) {
            this.price= this.price - (this.price*percent)/100;
        }
    }
    return obj;

}
const books = [
    createBook("mawada" , "hassan" , 1800, 200),
    createBook("mawada2" , "hassan2" , 1900, 200),
    createBook("mawada3" , "hassan3" , 2024, 200)
]

books.forEach(book => {
    console.log(book.getDetails());
});
books.forEach(book => {
    console.log(`${book.isClassic() ? "Classic" : "Not Classic"}`);
});

books.forEach(book => {
    if(2025 - book.year > 10){
        book.applydis(10);
        console.log(`Book details after discount` ,book.getDetails())
    }
})
books.forEach(book => {
    console.log(book.getDetails());
});





//second taskkkk

const registerStd = () => {
    let firstName = prompt("Enter your first name");
    let secondName = prompt("Enter your second name");
    let age = prompt("Enter your age");
    let email = prompt("Enter your email");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    while(emailRegex.test(email)==false){
        email = prompt("Enter your email make sure it is valid");
    }
    let dep = prompt("Enter your department");

    let stdData = {
        fullName : {firstName : firstName , secondName : secondName},
        age : age,
        email : email, 
        dep : dep
    }
    return stdData;

}

let arr = [];
for(let i = 0 ;i <1 ; i++){
    arr[i] = registerStd();
}
for(let i = 0 ;i <1 ; i++){
    console.log(arr[i]);
}

let maxAge =  Math.max(...arr.map(s => s.age))
arr.map(std=>{
    if(std.age == maxAge){
        console.log(`oldest student full name is` , std.fullName);

    }
})
arr.map(std=>console.log(PascalCase(std.fullName.firstName+" "+std.fullName.secondName)));
arr.filter(std=>{
    if(std.age>20){
        console.log(std.fullName);
    }
});

let avg=0;
arr.map(std=>avg+=std.age);
avg=avg/arr.length;
console.log(`average for all students is ${avg}`);

// sort students 

arr.sort((a, b) => {
        if(a.fullName.firstName < b.fullName.firstName) return -1;
        if(a.fullName.firstName > b.fullName.firstName) return 1;
        
        if(a.fullName.secondName > b.fullName.secondName) return -1;
        if(a.fullName.secondName < b.fullName.secondName) return 1;
        
        return 0; 
});

let obj = {
    fullName : "mawada",
    age : 20,

    toString(){
        return this.fullName;
    }
}
let newArr = [obj];
console.log(newArr[0]+"g");
console.log(JSON.stringify(newArr));

// search 
newArr.map(item=>{
    if(item.age==Math.random()){
        console.log(`found !`, item.age);
    }
    else{
        console.log("not found");
    }
})

