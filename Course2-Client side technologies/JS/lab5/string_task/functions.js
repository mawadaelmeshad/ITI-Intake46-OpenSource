const getLength = (word) =>{
    let counter=0;
    for(let i=0;i<word.length;i++){
        counter++;
    }
    return counter;
}

function upperCase(word){
    return word.toUpperCase();
}

function lowerCase(word){
    return word.toLowerCase();
}

const charExtract = (word) =>{
    let first=(word.charAt(0));
    let middle= (word.charAt(word.length/2));
    let last = (word.charAt(word.length-1));
    return {first, middle, last};
}

const greetings = (firstName, lastName) => {
    return `Hello ${firstName} ${lastName}`;
}

const removePartFromString = () => {
    let name = prompt("enter your full name");

    return name.substring(name.length - 5);

}


// searching and replacing

function findWord(sentence, word){
    if(sentence.includes(word)){
        return true;
    }
    else{
        return false;
    }
}


function replaceWord(sentence, word, newWord){
    return sentence.replace(word, newWord);
}


const countOccurrences = (word, letter) => {
    let counter = 0;
    for(let i=0;i< word.length; i++){
        if(word[i] == letter){
            counter++;
        }
    }
    return counter;

}


const startsOrEnds = (word, subWord) => {
    return word.startsWith(subWord) || word.endsWith(subWord);
}

const removeSpaces = (sentence) => {
    return sentence.replaceAll(" ", "");
}

// substrings and formatting


function extractDomain(email){
    // console.log(email.indexOf("@"));
    return email.substring(email.indexOf("@")+1);
}

function generator(name){
    let CapitalName = name.toUpperCase();
    let firstChar= CapitalName[0];
    let secondChar= CapitalName [CapitalName.indexOf(" ") + 1];
    return `${firstChar}.${secondChar}`;

}

function reverseString(word){
    let reversed="";
    for(let i=word.length-1 ; i>=0; i--){
        reversed+= word[i];
    }
    return `Reverse String is : ${reversed}`
}

function isPlaindrome(word){
    let reversed="";
    for(let i=word.length-1 ; i>=0; i--){
        reversed+= word[i];
    }
    return reversed == word;
}

function countVowels(word){
    let counter=0;
    for(let i = 0 ;i<word.length;i++){
        if(word[i]=='a' || word[i]=='e' || word[i]=='i' || word[i]=='o' || word[i]=='u'){
            counter++;
        }
    }
    return `the number of vowels char is : ${counter}`;
}

// challenges


function titleCase(title){
    let indexOfSpace = title.indexOf(" ");
    let firstWord=  title.substring(0,indexOfSpace);
    firstWord[0].toUpperCase();
    return  title.substring(0,indexOfSpace);
}


function maskPart(word){
    let masked="";
    for(let i=0;i<word.length;i++){
        if(i<word.length-4){
            masked+='*';
        }
        else{
            masked+=word[i];

        }
    }
    return masked;
}


function longestWord(sentence){
    let counter=0;
    let secondCounter=0;
    for(let i=0;i<sentence.length;i++){  // mawadaaaaa is graduate
        if(counter<secondCounter){
            counter=secondCounter;
        }
        secondCounter=0;
        for(let j=i+secondCounter; j<sentence.length;j++){
            if(sentence[j]== ' '){
                break;
            }
            else{
                secondCounter++;
                
            }
        }
    }
    return counter;
}


function removeRepeated(word){
    let newWord="";
    for(let i= 0;i<word.length;i++){
        if(word[i]!=word[i+1]){
            newWord+=word[i];
        }
    }
    return newWord;
}