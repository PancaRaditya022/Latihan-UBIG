function tambah(angka1,angka2){
    let hasil = angka1 + angka2;
    console.log("dalem fungsi");
    return hasil;
}

function sambungKata(kata1,kata2){
    let katakata = kata1 + " " + kata2;
    return katakata;
}

let y = tambah(4,5);
console.log("luar fungsi");
console.log(y);

console.log(sambungKata("oke","gas!"));

function luasKelilingPersegi(sisi){
    let luas = sisi*sisi;
    let keliling = sisi*4;
    return [luas,keliling];
}

let hasil = luasKelilingPersegi(6);
console.log(hasil);
