let siswa_01 = ['ucup','otong','asep'];
let siswa_02 = ['mario','jardel','dicky'];

let tim_bola = siswa_01.concat(siswa_02);
console.log(tim_bola.join(' - '));

if (siswa_01.includes('mario')){
    console.log('mario ada di siswa_01');
} else {
    console.log('mario tidak ada di siswa_01');
}

let posisiJardel = tim_bola.indexOf("jardel");
console.log(`jardel ada di ${posisiJardel}`);
console.log(`mario ada di ${tim_bola.indexOf("mario")}`);
