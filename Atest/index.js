


const View  =(()=>{
    /**
     * @param {string} value 
     * @param {string[]} db_id
     */
    const temp = (db_id,value )=> {
        const join_value = value.replace(/\s+/g,'')
        console.log("id value",join_value)
        return `
        <div class="${join_value}" >
        <span>${db_id.length}. </span>
        <span class="value" id="${join_value}value">${value}</span>
        <button class="collapse" onclick="collapse(event)" id="${join_value}">Collapse</button>
        <button class="remove" onclick="remove(event)">X</button>
     </div>`
    }
    return {temp}
})()
const Model = ((view)=>{
     const dom = {
        input:"#inputwork",
        add:"#addwork",
        box1:"#box1"  
     } 
     let box1 = document.querySelector(dom.box1);  
     let db_id  = []
       
      this.collapse = (e)=>{
        let selector = `${e.target.id}value`;
        let v=  document.getElementById(selector)?.classList;
        let spans=  document.querySelectorAll("span.collapse");
        for(let span of spans){
           if( e.target.id != span.parentNode.lastChild?.id)
                span.parentElement?.children[1].classList.add("none");
        }
        if(!v?.contains("none"))
            v?.add("none")
        else
            v?.remove("none")  
        }
      this.remove =(e)=>{
    
        const val = e.target.parentElement.children[1].innerHTML
    
        const idx  = db_id.find(value=>value =val)
        db_id.splice(idx,1)
        
        let temp  =""
        for(let myid  of db_id){
            temp += view.temp(db_id, myid)
        }
        box1.innerHTML = temp;

      }
      const addBox = (value)=>{
        db_id.push(value)
        console.log("here");
        box1.innerHTML += view.temp(db_id,value)
        
      }

      return {dom,db_id,addBox}

    
})(View)

class Controller{
   
    input_work = document.querySelector(Model.dom.input);   
    add_work = document.querySelector(Model.dom.add); 
    frame =  document.querySelector(Model.dom.box1);
    constructor(){  
     
        this.add_work?.addEventListener('click',(e)=>{ 
            let id =1
            //console.log(document.querySelector(`.1#vin`)) .vin#1 is bad
            if( "#"+e.target.id ===Model.dom.add ) {
                
                if(!Model.db_id.find((value)=>value ===this.input_work?.value) && this.input_work?.value.trim() !== "" ){
                    console.log("here")
                    Model.addBox(this.input_work?.value);
                }
            }
        })
        this.frame?.addEventListener('click',(e)=>{        
            if(e.target.tagName == "SPAN" && e.target.className == "value")
                    console.log(e.target)
        })
        
    }
    
    
}
let controller = new Controller();
//--


const str = "ds d"








/* 
remove(id){
}
*/