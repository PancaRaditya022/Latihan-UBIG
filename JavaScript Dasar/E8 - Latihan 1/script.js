let namaDepan, namaBelakang, namaLengkap;

document.getElementById('button_merge').onclick = function() {
    namaDepan = document.getElementById('nama_depan').value;
    namaBelakang = document.getElementById('nama_belakang').value;
    namaLengkap = `${namaDepan} ${namaBelakang}`;
    
    document.getElementById('nama_lengkap').textContent = namaLengkap;
    // console.log("Nama Depan", namaDepan);
    // console.log("Nama Belakang", namaBelakang);
    // console.log("Nama Lengkap", namaLengkap);
}