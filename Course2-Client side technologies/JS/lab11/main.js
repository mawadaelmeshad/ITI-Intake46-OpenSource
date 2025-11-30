class card {
    constructor(flag, countryName, location, people, lang, currency){
        this.flag = flag;
        this.countryName = countryName;
        this.location = location;
        this.people = people;
        this.lang = lang;
        this.currency = currency;
    }

    buildCard(){
        let div = document.createElement("div");
        let img = document.createElement("img");
        img.src = this.flag;
        div.appendChild(img);
        let title = document.createElement("h2");
        title.innerText = this.countryName;
        div.appendChild(title);
        let region = document.createElement("p");
        region.innerText = this.location;
        region.classList.add("region")
        div.appendChild(region);
        let peoplee = document.createElement("p");
        peoplee.innerText = "👯";
        peoplee.innerText += this.people + " People";
        div.appendChild(peoplee);

        let langg = document.createElement("p");
        langg.innerText = "🗣️  ";
        langg.innerText += this.lang;
        div.appendChild(langg);

        let curr = document.createElement("p");
        curr.innerText = "💰  ";
        curr.innerText += this.currency;
        div.appendChild(curr);

        document.body.appendChild(div);

    }
}

function createCard (){
    document.querySelector("#enter").style.display = "none";
    let country = document.querySelector("input").value;
    let captialCountry = country[0].toUpperCase()+ country.slice(1);
    console.log(captialCountry);
    fetch(`https://restcountries.com/v2/name/${country}`, {
        method : "get"
    }).then((respone)=>{
        return respone.json();
    }).then((data)=>{
        data = data[0];
        console.log(data);
        let egypt = new card (data.flag, data.name, data.region, data.population, data.languages[0].name, data.cioc);
        egypt.buildCard();
        console.log(egypt);
        let neighborCode = data.borders[1];
        return fetch(`https://restcountries.com/v2/alpha/${neighborCode}`);

    }).then((response)=> response.json()).then((alphaData)=>{
        let neighborName = alphaData.name;

        return fetch(`https://restcountries.com/v2/name/${neighborName}`)
    }).then((respone)=> respone.json()).then((data)=>{
        data = data[0];
        console.log(data);
        let neighbor = new card (data.flag, data.name, data.region, data.population, data.languages[0].name, data.cioc);
        neighbor.buildCard();
        console.log(neighbor);
    });
};