// cek posisi index menggunakan charAt()
let data = "abcde";
let dataChar = data.charAt(0);
console.log(`character pada index 0  = ${dataChar}`);
dataChar = data.charAt(1);
console.log(`character pada index 1  = ${dataChar}`);
dataChar = data.charAt(2);
console.log(`character pada index 2  = ${dataChar}`);
dataChar = data.charAt(3);
console.log(`character pada index 3  = ${dataChar}`);
dataChar = data.charAt(4);
console.log(`character pada index 4  = ${dataChar}`);
dataChar = data.charAt(5);
console.log(`character pada index 5  = ${dataChar}`); // tidak ada output karena array dari data hanya 4 dan dimulai dari 0

// menyambung string menggunakan concat()
let namaDepan = "Yang";
let namaBelakang = "Jing";
let namaLengkap = namaDepan.concat(" ", namaBelakang);
console.log(namaLengkap);

// mengambil index kemunculan pertama menggunakan indexOf()
console.log(namaLengkap.indexOf('Y'));
console.log(namaLengkap.indexOf('n'));
console.log(namaLengkap.indexOf('a'));
console.log(namaLengkap.indexOf('g'));

// mengambil sebagian karaktek menggunakan substring()
console.log(namaLengkap.substring(5, 11))

// mengambil sebagian elemen tanpa merusak data menggunakan slice()
console.log(namaLengkap.slice(1, 7));

// mereplace data secara langsung menggunakan replace()
console.log(namaLengkap.replace("Yang Jing", "Yang Hao"));

// mengubah seluruh karakter menjadi kecil/uppercase menggunakan toLowerCase()
console.log(namaLengkap.toLowerCase());

// mengubah seluruh karakter menjadi besar/uppercase menggunakan toUpperCase()
console.log(namaLengkap.toUpperCase());

// parse data string ke number menggunakan parseInt()
let dataString = "10";
console.log(typeof dataString);
let parse = parseInt(dataString);
console.log(typeof parse);