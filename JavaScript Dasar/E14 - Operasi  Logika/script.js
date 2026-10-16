let data_bool = true;
console.log(data_bool);

// NOT
console.log(!data_bool);
console.log(!!data_bool);
console.log(!1);
console.log(!0);

// OR
let makan = false;
let minum = false;

let sudah_menyantap = makan || minum;
console.log(`sudah menyantap = ${sudah_menyantap}`);

// AND
// A    true  true  false false
// B    true  false true  false
// Hasil true  false false false

// A    1 1 0 0
// B    1 0 1 0
// Hasil 1 0 0 0

console.log(`true && true, Hasil = ${true && true}`);
console.log(`true && false, Hasil = ${true && false}`);
console.log(`false && true, Hasil = ${false && true}`);
console.log(`false && false, Hasil = ${false && false}`);

makan = true;
minum = true;

let sudah_makmin = makan && minum;
console.log(`sudah makan dan minum? = ${sudah_makmin}`);