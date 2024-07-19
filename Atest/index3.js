function vv() {
    this.hh = "1";
    fan = "fan";
    const v = () => {
        console.log(this);
        v();
    }
    function v2() {
        console.log("v2", this);
    }
    console.log(this);
    v2();
    return
}
const vv2 = (function () {
    wiski = "wiski"
    const v = () => {
        console.log(this);
    }
    function v2() {
        console.log("v2", this)
    }
    v2();
}).bind(this);



const vvo = new vv();
//const vvo2 = new vv2();


//console.log(vv2());
console.log(this);
