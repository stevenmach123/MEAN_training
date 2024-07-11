

const obj = {
    name:"khang",
    f:function(){
        console.log("f", this)
        function god(){
            console.log("god", this)
        }
        const god2 = ()=>{
            console.log("god2",this)
        }
        (()=>{
            console.log("god22", this)   
        })()
        console.log(god())
    
    }
}

/*const obj2  =(function(){
     this.name ="hillo";
     this.task ="booking"
    function what(){
        console.log("what",this)
    }
    console.log("this obj2",this)
    what()
}).bind(this)
console.log(obj2())  */

const v = ()=>{
    this.sam = "samsung";
    function vc(){ 
        console.log("vc",this) 
    }
    const vc2 =()=>{
        console.log("vc2",this)
    }
    //console.log(vc2())
    console.log(vc())
   console.log("vvv",this)
    return {vc,vc2}
}
const obj_fun = function(){
    this.namesam = 1;
    function vc3(){ 
        console.log("vc3",this) 
    }
    const vc4 =()=>{
        console.log("vc4",this)
    }
    vc3();vc4()
    return {'h':1,he:function(){
        console.log("h function", this)
    } , //vc4 is global, stick in function obj_fun
   }
}
//console.log(obj_fun().vc4());
//console.log("v",v().vc(),v().vc2())
console.log(obj.f())

//--
const v2 = (function(){ 
    //console.log("v2", this) ;
    console.log("v2",this())
}).bind(obj_fun)()
//--
class Person {
    name = "who?"
    #id =10
    constructor(name){
        this.name = name
    }
    intro(){
       console.log("intro",this)
       /*const v = (function()=>{   // good, this class
         console.log("intro v",this) 
       }).bind(this) */ 
       const v = ()=>{
        console.log("intro v",this) // good, this class
       }    
       function vfun(){
          console.log("vfun",this)
       }
        // vfun() is global/undefined 
        vfun()
       return {v,vfun}
    }
    intro2 = function(){
        console.log("intro2",this)
    }
    intro22 = ()=>{
        console.log("intro22",this)
    }
    
}

class Employee extends Person {
	constructor(name, company) {
		super(name);
		this.company = company;
	}
  printCompany = function() {
    console.log("company",this.company);
  }
}

let per = new Employee("khang", "vn"  )
console.log(per.intro22())
console.log(per.intro().vfun())    
console.log(per.printCompany()  )

const callname = function(a,b){
    console.log("callname",this.name,a,b)
}
callname.apply(obj, [1,2])

/**
 
 * @param {number} a 
 */
function pipe_p(a){
    function v(...args){
        return args.reduce((acc,cur)=>{
            return cur(acc)
        } ,a)
    }
    return v
}
const call1 = (a)=> a+2
const call2 = (b)=> b*2
const call3 = (c)=> c+2
console.log("pipe_p",pipe_p(5)(call1,call2,call3))

class GoodPromise{
    queue = []
    
    constructor(fn){
        fn(this.resolve.bind(this))
        
    }   
    resolve = function(data){
        console.log(this)
    }
    static all(...args){
        let confirm = 0
        return new Promise((resolve)=>{
            for(let pro of args){
                pro.then((data)=>{
                    confirm++
                    if(confirm === args.length){
                        resolve("")
                    }
                })
            }
        } )
        
    }
    
}
let vh = new GoodPromise((resolve)=>{
    resolve(1);
})

/*
const a1 =  Promise.resolve(3);
const b1 =new Promise((resolve)=>resolve(12));
const c1  = new Promise((resolve)=>
    setTimeout(()=>{
        console.log("c1")
        resolve(15)
    }, 1000)
)

GoodPromise.all(a1,b1,c1).then((result) => {
    console.log("success all")
}).catch((err) => {
    console.log("promise all error", err.message)
});  */

///

function fetchData(fn, error,time){
    setTimeout(()=>{
        try{
            fn()
        }catch(e){
            error(e)
        }
    
    }, time)

}   
/*fetchData(()=>{
    console.log("good")
    throw "what?"
},(err)=>{
    console.log("error",err)
},0)  */


const fetchData2  =function(){
   const db = [{name:"khang",age:1},{"name":"linh",age:2}]
   const queue =[]
   this.sam  =1;
   
    function get(data){
        const {name} = data
        let mark;
        setTimeout(()=>{
            if(name){
                mark = db.filter(item=>item.name === name)
            }
            while(queue.length > 0){
                try{
                    let then = queue.shift()
                    let v = then(mark)
                    if(v instanceof Error)
                        throw  Error("bad")

                    if(v =="nothing bad")
                        continue
                
                    mark = v;
                }catch(e){        
                    console.log("catchfirst", e instanceof Error) 
                    let temp = new Error("baddo")
                    while(queue.length >0 && temp instanceof Error){
                        let t = queue.shift()  
                        if(t.mark == "catchy"){
                            temp=  t.hello(e)
                        }
                        
                    }
                    mark = temp;
                }
            }
            if(mark instanceof Error){
                return "bad error"
            }
            else 
                return ["good" + mark]
          
        },500)
        

        return this
    }
    function then(cb){
        queue.push(cb)
        return this
    }
    function catchy(cb){
        const hello = (err)=>{
            if(err instanceof Error){
                return cb(err)
            }
            return "nothing bad"
        }
        queue.push({mark:"catchy",hello})
        return this
    }





  
   return {
     get,then,catchy
   }
}

    fetchData2().get({name:"khang"}).
    then((da)=>{"da"+JSON.stringify(da)
        return Error("badd")

    }).then(da=>{
        return "hi" + JSON.stringify(da);
    }).
    catchy((err)=>{
        return Error("bad")
        
    }).catchy((err)=>"me final"+err)
    .then(result=>console.log(result))
    
    

///
console.log("merge role")

const names = [
	{ userid: 2, name: "Velen" },
	{ userid: 56, name: "Illidan" },
	{ userid: 23, name: "Muradin" },
	{ userid: 12, name: "Sylvanas" },
	{ userid: 44, name: "Cenarius" },
	{ userid: 4, name: "Gul'Dan" },
];
const roles = [
	{ userid: 2, role: "Mage" },
	{ userid: 4, role: "Worlock" },
	{ userid: 56, role: "Demon Hunter" },
	{ userid: 66, role: "Druid" },
	{ userid: 87, role: "Shaman" },
	{ userid: 12, role: "Hunter" },
];

let m_data = {}
let accum = [names,roles];
accum.reduce((acc,cur)=>{
    cur.forEach(val => {
        acc[val.userid] = {...{ userid: null, name: null, role: null },...val} 
    });
    return acc;
},m_data)
console.log("m_Data",m_data)
    



  /*f
queue.sh
  while()

  
    */

