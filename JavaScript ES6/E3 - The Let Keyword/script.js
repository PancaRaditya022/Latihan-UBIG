window.onload = function(){

    var items = document.getElementsByTagName("li");

    for(let x = 0; x < items.length; x++){
        items[x].onclick = function(){
            console.log(x);
        }
    }

}
