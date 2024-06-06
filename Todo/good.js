

const fun = async () => {
    
    const my = await fetch('https://jsonplaceholder.typicode.com/todos')
    let datas = await my.json()
    for(let data of datas){
        let inputValue = data.title;
        let t = document.createTextNode(inputValue);
        
        let li = document.createElement('li')
        
       var span = document.createElement('span')
        var txt = document.createTextNode("X");
        span.classList.add("what")
       // span.className = "close";
        span.appendChild(txt);
       
        li.appendChild(span)
        li.appendChild(t)
        
        txt.onclick = function() {
            let li = this.parentElement;
            li.style.display = "none";
        }
        document.querySelector('#box1')?.appendChild(li)
        console.log(data)
    }
    
}   
fun().then(()=>{
    let list = document.querySelector('#box1');

    list.addEventListener('click', function(ev) {
    if((ev.target).classList.contains('checked'))
        ev.target.classList.remove('checked');
    else 
        ev.target.classList.add('checked');
});
})







function newElement() {
    let li = document.createElement("li");
    let inputValue = document.getElementById("myInput").value;
    let t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
      alert("You must write something!");
    } else {
      document.querySelector("#box1").appendChild(li);
    }
    document.getElementById("myInput").value = "";
  
    let span = document.createElement("span");
    let txt = document.createTextNode("X");
    //span.className = "close";
    span.classList.add("what")
    span.appendChild(txt);
    span.onclick = function() {
      let li = this.parentElement;
      li.style.display = "none";
    }
    li.appendChild(span);
  }
  