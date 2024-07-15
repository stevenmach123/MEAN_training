const v = () => {
    function hello() {
        console.log("hello", this);
    }
    const hello2 = () => {
        console.log("hello", this);
    }
    return {
        hello,
        hello2
    }
}
console.log(v().hello()); console.log(v().hello2());

console.log([].slice())