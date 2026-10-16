let  data = "data string";
console.log(data);

// escaping string
let data1 = 'Yang Jing berkata : "Apa Kabar?"';
console.log(data1);
let data2 = "Yang Hao menjawab : \"Aku baik baik saja\"";
console.log(data2);
let data3 = "Yang Hao berjalan-jalan di tepi pantai, \nAngin nya sepoi-sepoi";
console.log(data3);

// literal string template
let namaDepan = "Yang";
let namaBelakang = "Jing";
let umur = 20;;
let namaLengkap = namaDepan + " " + namaBelakang + " " + umur; // terlalu panjang dan rawan  error
console.log(namaLengkap);

// lebih elegan supaya tidak error
let biodata = `Nama ${namaDepan} ${namaBelakang}, Umur ${umur}`;
console.log(biodata);