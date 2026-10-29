function calculate() {
    // console.log("test");
    const angka_1 = parseFloat(document.getElementById('angka1').valueAsNumber);
    const angka_2 = parseFloat(document.getElementById('angka2').valueAsNumber);
    const operator = document.getElementById('operator').value.trim();
    let hasil;

    if(isNaN(angka_1)||isNaN(angka_2)) {
        document.getElementById('hasil').textContent = "Masukkan Angka Valid";
    }

    if (operator == "+") {
        hasil = angka_1 + angka_2;
    } else if (operator == "-") {
        hasil = angka_1 - angka_2;
    } else if (operator == "*") {
        hasil = angka_1 * angka_2;
    } else if (operator == "/") {
        // hasil == angka_1 + angka_2;
        if (angka_2 == 0) {
            hasil = "Maaf tidak bisa dibagi dengan nol";
            // document.getElementById('hasil').textContent = "Maaf tidak bisa dibagi dengan 0";
            // console.log('[CM 1]');
        } else {
            hasil = angka_1 / angka_2;
            // console.log("[CM 2]");
        }
    }
    document.getElementById('hasil').textContent = hasil;
}