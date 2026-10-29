console.log('hello world');

let nama = "April";
console.log(nama);
nama = "Ponnay";
console.log(nama);

var namaDepan = "Yinsha";
console.log(namaDepan);
namaDepan = "Wang Lin";
console.log(namaDepan);

// kelakuan let
let namaBelakang = "Tou She";
{
    let namaBelakang = "Yang Jin";
    console.log(namaBelakang);
}
console.log(namaBelakang);

// kelakuan var
var namaTengah = "Yao Lao";
{
    var namaTengah = "Hun Tiandi";
    console.log(namaTengah);
}
console.log(namaTengah);

// kasus khusus tanpa keywoard akan menjadi var
gorengan = "Bala Bala";
{
    gorengan = "Combro";
    console.log(gorengan);
}
console.log(gorengan);

// const
const TTL = "03 April 2008";
console.log(TTL);