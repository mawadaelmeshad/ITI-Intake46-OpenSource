// with set
function removeDuplicatesWithSet(input){
    let mySet= new Set(input);
    return mySet;
}
removeDuplicatesWithSet([1,2,2,3,3,4,5,5]);

// without set

function removeDuplicatesWithoutSet(input){
    return input.filter((item, index) => input.indexOf(item)==index);
}

removeDuplicatesWithoutSet([1,2,2,3,3,4,5,5]);

// reverse 

const reverseString = (word) =>{
    let reversed="";
    for(let i=word.length-1;i>=0;i--){
        reversed+=word[i];
    }
    return reversed;
}


const reverseEachWord = (input, reverseFun) =>{
    for(let i=0;i<input.length;i++){
        input[i] = reverseFun(input[i]);
    }
    return input;
    
}

reverseEachWord(["apple", "banana" , "mango"], reverseString);


const getEvenAndMultiply_2 = (input) =>{
    input= input.filter(item => item % 2 == 0).map(item => item * 2);
    
    return input;
}
getEvenAndMultiply_2([1,2,3,4,5,6]);


const findSecondLargestNumber = (input) => {
    let max = Math.max(...input);
    let secondMax=input[0];
    for(let i=1;i< input.length; i++){
        
        if(input[i]> secondMax && input[i]!= max){
            secondMax=input[i];
        }
    }
    return secondMax;

}

findSecondLargestNumber([10,20,30,50,40]);


const splitIntoEvenAndOddIndex = (input) => {
    let evenIndex = input.filter(item => input.indexOf(item) % 2 == 0);
    let oddIndex = input.filter(item=> input.indexOf(item) % 2 != 0);

    console.log(`Even index: ${evenIndex}`);
    console.log(`Odd index ${oddIndex}`);

}

splitIntoEvenAndOddIndex(["a","b","c","d","e"]);

const countNumbersGreaterThan50 = (input) => {
    const count = input.reduce((acc , curr) => {
        return  curr > 50 ? acc+1 : acc;
    }, 0);
    return count;
}
countNumbersGreaterThan50([10,50,60,70]);

const longestWord = (input) =>{

    return input.reduce((longest, current) => {
        return current.length > longest.length ? current : longest;
    });
}

longestWord(["dsfdfc", "dd", "sss", "dsffffffffff"]);

const generateRandomArr = (len, min, max) => {
    let arr =[];
    for(let i = 0;i < len; i++){
        arr.push(Math.floor(Math.random() * (max - min + 1) ) + min);

    }
    return arr;
}

generateRandomArr(5,2,8);

const roundArr = (input) =>{
    return input.map((item) =>Math.round(item));
}
roundArr([1.2, 3.7, 4.5]);


const daysSinceGivenDates = (input) => {
    let res = [];
    let today = new Date();
    for(let item of input){
        let otherDay = new Date(item);
        let resInSec = today - otherDay;
        let resInDays = Math.floor(resInSec /  (1000 * 60 * 60 * 24));
        res.push(resInDays);
    }
    return res;
}

daysSinceGivenDates(["2024-01-01", "2024-03-01", "2024-04-15"])

const sortByDate = (input) => {
    return input.sort((a,b) => new Date(a) - new Date(b));
}
sortByDate(["2024-05-01", "2024-01-01", "2024-03-15"]);

