const v = [1, 2, 3]
const [val1, val2] = v;
console.log(val1, val2)
const ob1 = {
    name: 'John',
    foo() {
        console.log(this.name);
        this.some = "12"
        const v = () => {
            console.log(this)
        }
        v();
    }
}
ob1.foo()


const arr = [1, 2];
function foo1(arg) {
    arg.push(3);
}
foo1(arr);
console.log(arr);

function foo2(arg) {
    arg = [1, 2, 3, 4];
}
foo2(arr);
console.log(arr);

function foo3(arg) {
    let b = arg;
    b.push(3);
}
foo3(arr);
console.log(arr);

function foo4(arg) {
    let b = arg;
    b = [1, 2, 3, 4];
}
foo4(arr);
console.log(arr);