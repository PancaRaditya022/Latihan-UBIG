window.onload = function(){

    var ninjas = ["shaun", "crystal", "yoshi", "ryu", "yoshi", "ryu"];

    var refinedNinjas = new Set(ninjas);

    console.log(refinedNinjas);

    ninjas = [...refinedNinjas];

    console.log(ninjas);

}
