let daftarMenu = ["Kopi Hitam", "Kopi Susu", "Teh Manis", "Mie Rebus", "Roti Bakar"];
let hargaMenu = [5000, 7000, 2500, 10000, 12000];
let keranjang = [];

let areaMenu = document.getElementById("areaMenu");
let areaKeranjang = document.getElementById("areaKeranjang");
let totalHarga = document.getElementById("totalHarga");
let halamanKasir = document.getElementById("halamanKasir");
let halamanStruk = document.getElementById("halamanStruk");
let areaStruk = document.getElementById("areaStruk");
let totalStruk = document.getElementById("totalStruk");

function renderMenu(){
    let elemenHTML = "<ul class='list-group list-group-flush'>";
    for(let i = 0; i < daftarMenu.length; i++){
        elemenHTML += `
            <li class='list-group-item d-flex justify-content-between align-items-center'>
                <div>
                    <div class='fw-semibold'>${daftarMenu[i]}</div>
                    <small class='text-muted'>Rp. ${hargaMenu[i]}</small>
                </div>
                <button class='btn btn-primary btn-sm' onclick='tambahKeranjang(${i})'>Tambah</button>
            </li>
        `;
    }
    elemenHTML += "</ul>";
    areaMenu.innerHTML = elemenHTML;
}

function tambahKeranjang(indexMenu){
    keranjang.push(indexMenu);
    renderKeranjang();
}

function hapusKeranjang(indexKeranjang){
    keranjang.splice(indexKeranjang, 1);
    renderKeranjang();
}

function renderKeranjang(){
    let elemenHTML = "<ul class='list-group'>";
    let totalHargaPesanan = 0;

    for(let i = 0; i < keranjang.length; i++){
        let indexMenu = keranjang[i];
        let namaPesanan = daftarMenu[indexMenu];
        let hargaPesanan = hargaMenu[indexMenu];

        totalHargaPesanan = totalHargaPesanan + hargaPesanan;

        elemenHTML += `
            <li class='list-group-item d-flex justify-content-between align-items-center'>
                ${namaPesanan} (Rp. ${hargaPesanan})
                <button class="btn btn-danger btn-sm" onclick="hapusKeranjang(${i})">X</button>
            </li>
        `;
    }

    elemenHTML += "</ul>";

    totalHarga.innerHTML = "Rp. " + totalHargaPesanan;
    areaKeranjang.innerHTML = elemenHTML;
}

function checkout(){
    if(keranjang.length === 0){
        alert("Keranjang masih kosong!");
        return;
    }

    let elemenHTML = "";
    let totalHargaPesanan = 0;

    for(let i = 0; i < keranjang.length; i++){
        let indexMenu = keranjang[i];
        let namaPesanan = daftarMenu[indexMenu];
        let hargaPesanan = hargaMenu[indexMenu];
        totalHargaPesanan = totalHargaPesanan + hargaPesanan;

        elemenHTML += `
            <div class="d-flex justify-content-between py-1 border-bottom">
                <span>${namaPesanan}</span>
                <span>Rp. ${hargaPesanan}</span>
            </div>
        `;
    }

    areaStruk.innerHTML = elemenHTML;
    totalStruk.textContent = "Rp. " + totalHargaPesanan;

    halamanKasir.classList.add("d-none");
    halamanStruk.classList.remove("d-none");
}

function buatPesananBaru(){
    keranjang = [];
    renderKeranjang();

    halamanStruk.classList.add("d-none");
    halamanKasir.classList.remove("d-none");

    alert("Pesanan baru siap diterima!");
}

renderMenu();
renderKeranjang();
