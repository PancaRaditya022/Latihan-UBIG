// global

// local
// berada di dalam { }

let nama = "Otong";

function sayNama(){
    let nama = "Ucup"; // variable dengan local scope
    console.log(nama + " di local scope");
}

sayNama();

console.log(nama + " di global scope");

// kasus 1

let nama2 = "Otong"; // variable dengan global scope

function sayNama2(){
    nama2 = "Ucup"; // variable global
    console.log(nama2 + " di local scope");
}

sayNama2();

console.log(nama2 + " di global scope");

// kasus 2
// var -> function scope

function sayNama3(){
    if(true){
        var nama3 = "Mario"; // function scope
        let nama4 = "Asep"; // bracket scope
    }
    console.log(nama3);
    console.log(nama4);
}

// sayNama3(); // tidak akan bisa membaca nama4

// leaked

if(true){
    var nama5 = "Margarita";
}
console.log(nama5);
