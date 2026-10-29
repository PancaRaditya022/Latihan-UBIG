let angka1, angka2, hasil;

document.getElementById("button_jumlah").onclick = function() {
    angka1 = document.getElementById("angka1").valueAsNumber;
    angka2 = document.getElementById("angka2").valueAsNumber;
    hitung = angka1 + angka2;
    hasil = document.getElementById("hasil").textContent = hitung;
    // console.log(angka1, angka2, hasil);
}