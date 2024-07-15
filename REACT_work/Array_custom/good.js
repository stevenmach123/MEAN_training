// 1. what is prototype and prototype chain 
/*
What is prototype:
prototype is an object that main objects can inherit properties and methods from. Every JavaScript object has a prototype. Inside prototype, you can create a function/object/properties, which  automatically point to main object, upon prototype constructor created. 

What is prototype chain :
When you try to access a property or method on an object, JS  first look for the property on main object. If it doesn't find it, it will look for the property on the object's prototype, then on the prototype's prototype, until it either finds the property or reaches the end of chain (where the prototype is null).

*/

// 2. 6 array custom methods.
Array.prototype.myFilter = function (cb) {
    let ar = []
    for (let i = 0; i < this.length; i++) {
        if (cb(this[i], i, this))
            ar.push(this[i])
    }
    return ar
}
Array.prototype.myMap = function (cb) {
    let ar = Array(this.length)
    for (let i = 0; i < this.length; i++) {
        ar[i] = cb(this[i], i, this)
    }
    return ar;
}
Array.prototype.myIncludes = function (ele, start) {
    for (let i = start; i < this.length; i++) {
        if (this[i] === ele) {
            return true;
        }
    }
    return false;
}
Array.prototype.myIndexOf = function (ele, start) {
    for (let i = start; i < this.length; i++) {
        if (this[i] === ele) {
            return i;
        }
    }
    return -1;
}
Array.prototype.myReduce = function (cb, init) {
    let val;
    if (!init) {
        val = this[0]
        for (let i = 1; i < this.length; i++) {
            val = cb(val, this[i], i, this)
        }

    }
    else {
        val = init;
        for (let i = 0; i < this.length; i++) {
            val = cb(val, this[i], i, this)
        }
    }
    return val;
}
Array.prototype.mySlice = function (start, end) {
    let ar = []
    if (end < 0)
        end = this.length + end;
    if (start > end)
        return []
    for (let i = start; i < end; i++) {
        ar.push(this[i])
    }
    return ar
}



Array.prototype.mySplice = function (start, deleteCount,) {
    let ar = []
    let remain = []
    let x
    let end = start + deleteCount
    if (end > this.length)
        end = this.length
    for (let i = start; i < end; i++) {
        ar.push(this[i])
    }
    for (let i = 0; i < this.length; i++) {
        if (i >= start && i < end)
            continue;
        remain.push(this[i])
    }
    this.length = 0;
    for (let i = 0; i < remain.length; i++) {
        this.push(remain[i]);
    }

    return ar
}




//test 
let cv = ["d", "e", "f"];

console.log(cv.myFilter((e, i) => {
    if (i == 0 || i == 2)
        return true;
}))
console.log(cv.myMap((e, i) => {
    if (i % 2 == 0) return true;
    else return false;
}))

console.log(cv.myReduce((prev, cur, idx) => {
    if (idx == 0) {
        prev[0] = cur;
    } else
        prev[idx] = prev[idx - 1] + cur
    return prev;
}, {}));
let f = cv.mySlice(1, -1);
console.log(cv.mySplice(1, 1));
console.log(cv)



