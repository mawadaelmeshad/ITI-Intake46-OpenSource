// console.log(number1);
// console.log(number2);
// console.log(number3);

var number1=3,number2=2.9,number3=0xff;
console.log(number1);
console.log(number2);
console.log(number3);

var firstName="mawada";
firstName[3]=`A`;
console.log(firstName);
var middleName='hassan';
var lastName=`elmashad`;

console.log(typeof(firstName));
console.log(typeof(lastName));
console.log(typeof(number1));
console.log(typeof(number2));
console.log(typeof(number3));
console.log(number3.toString());





var flag=true;
console.log("This is the External JavaScript file");


//script for checking number is odd or even

function isEven(number){
    if(number%2==0){
        return "Even";
    }
    else{
        return "Odd";
    }
}

console.log(isEven(3));


//print numebrs from 1 to 10

for(let i=1;i<=10;i++){
    console.log(i);
}

// + or - or 0


function isPositive(number){
    if(number>0){
        return "Positive";
    }
    else if(number<0){
        return "Negative";
    }
    else{
        return "Zero";
    }
}

console.log(isPositive(-3));


// multiplication table

function multiplicationTable(number){
    for(let i=0;i<=10;i++){
        console.log(`${number} * ${i} = `,number*i);
    }
}
multiplicationTable(3);


// day of the week

function getDay(number){
    if(number==1){
        console.log("Saturday");
    }
    else if(number==2){
        console.log("Sunday");
    }
    else if(number==3){
        console.log("Monday");
    }
    else if(number==4){
        console.log("Tuesday");
    }
    else if(number==5){
        console.log("Wednsday");
    }
    else if(number==6){
        console.log("Thursday");
    }
    else if(number==7){
        console.log("Friday");
    }
}
getDay(7);


// weekend or weekday



function getStatusOfDay(number){
    if(number==7 || number ==1){
        console.log("Weekend");
    }
    else{
        console.log("Weekday");

    }
}
getStatusOfDay(7);