console.log(document.images);
console.log(document.querySelector('img'));
console.log(document.getElementsByTagName('img'));

console.log(document.querySelector('select.bPink').children);

console.log(document.getElementsByTagName('table')[1].rows);

console.log(document.querySelectorAll('.fontBlue, .BGrey'));

console.log(document.getElementsByTagName('table')[1].querySelector('a').href="training.com");
console.log(document.getElementsByTagName('table')[1].querySelector('a').text="Training");

console.log(document.querySelectorAll('img').forEach(img => img.style.border = "solid pink 2px"));
alert([...document.querySelector('#userData').querySelectorAll('input[type="checkbox"]:checked')].map(c=>c.value));
document.getElementById("example").style.backgroundColor="pink";

setInterval(() => document.title = new Date().toString(), 1000);

const startSliding= (imgObject) => {
    let i=0;
    let id=setInterval(() => {
        
            if(i<8)
            imgObject.src=`images/${++i}.jpg`;
            
    }, 1000);
    return id;
}

const stopSliding = (timerId) => {
    clearInterval(timerId)
}

let id = startSliding(document.images[0]);
stopSliding(id);



