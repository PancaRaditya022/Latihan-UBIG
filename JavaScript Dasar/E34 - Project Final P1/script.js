let daftarMenu = ["Kopi Hitam", "Kopi Susu", "Teh Manis", "Mie Rebus", "Roti Bakar"];
let hargaMenu = [5000, 7000, 2500, 10000, 12000];
let keranjang = [];

let areaMenu = document.getElementById("areaMenu");
let areaKeranjang = document.getElementById("areaKeranjang");
let totalHarga = document.getElementById("totalHarga");

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

function bayarSekarang(){
    if(keranjang.length === 0){
        alert("Keranjang masih kosong!");
        return;
    }
    alert("Terima kasih sudah belanja! Total: " + totalHarga.textContent);
    keranjang = [];
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

renderMenu();
renderKeranjang();
