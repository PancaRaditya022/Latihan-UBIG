// perulangan
data_array = [1,2,3,4,5,12,23,4,23,42,3,42,34,100,120];

// for loop
// for(inisialisasi; kondisi; increment){}

for(let i = 1; i<=20 ; i++){
    console.log(`nilai i = ${i}`);
}

for(let i = 0; i <= 12; i++){
    console.log(`array ke-${i} = ${data_array[i]}`);
}

console.log("menggunakan length")
for(let i = 0; i < data_array.length;i++){
    console.log(`array ke-${i} = ${data_array[i]}`);
}
