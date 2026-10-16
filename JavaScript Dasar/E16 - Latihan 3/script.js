let angka1, angka2, operator, hitung;

document.getElementById("button_hitung").onclick = function() {
    angka1 = document.getElementById("angka1").valueAsNumber;
    angka2 = document.getElementById("angka2").valueAsNumber;
    operator = document.getElementById("operator").value;

    if (operator === "+") {
        hitung = angka1 + angka2;
    } else if (operator === "-") {
        hitung = angka1 - angka2;
    } else if (operator === "*") {
        hitung = angka1 * angka2;
    } else if (operator === "/") {
        hitung = angka1 / angka2;
    } else if (operator === "%") {
        hitung = angka1 % angka2;
    } else if (operator === "**") {
        hitung = angka1 ** angka2;
    } else {
        hitung = "Pilih operator dulu";
    }

    document.getElementById("hasil_hitung").textContent = hitung;
}

let logika1, logika2, operator_logika, hasil_logika;

document.getElementById("button_logika").onclick = function() {
    logika1 = document.getElementById("logika1").valueAsNumber;
    logika2 = document.getElementById("logika2").valueAsNumber;
    operator_logika = document.getElementById("operator_logika").value;

    if (operator_logika === "and") {
        hasil_logika = logika1 && logika2;
    } else if (operator_logika === "or") {
        hasil_logika = logika1 || logika2;
    }

    document.getElementById("hasil_logika").textContent = hasil_logika;
}
