// menyimpan data todo ke array
let todoArray = []

// inisiasi / menangkap elemen2 html
let tombolTambah = document.getElementById("btnTambah");
let kolomInput = document.getElementById("inputTugas");
let areaArray = document.getElementById("areaArray");

function tambahTodo(){
    let tugasBaru = kolomInput.value;

    if (tugasBaru === ""){
        alert("Tugas tidak boleh kosong!");
        return;
    }

    todoArray.push(tugasBaru);
    kolomInput.value="";

    tampilkanTodo();
}

function tampilkanTodo(){
    if (todoArray.length === 0){
        areaArray.innerHTML = "<small>Belum ada tugas hari ini...</small>";
        return;
    }

    let isiHTML = "<ul class='list-group'>"
    for(let i=0; i < todoArray.length; i++){
        isiHTML += "<li class='list-group-item list-group-item-primary mb-2 rounded d-flex justify-content-between align-items-center'>" + todoArray[i] + "<button class='btn btn-danger btn-sm ms-2' onclick='hapusTodo(" + i + ")'>Hapus</button></li>";
    }
    isiHTML += "</ul>";

    areaArray.innerHTML = isiHTML;
}

function hapusTodo(index){
    if (index === todoArray.length - 1){
        todoArray.pop();
    } else {
        todoArray.splice(index, 1);
    }
    tampilkanTodo();
}
