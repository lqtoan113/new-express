let strname = "toan";
let age = 19;
let isStudent = true;

console.log(typeof strname)

function eon(x){
    if(x % 2 === 0)
        return true;
    else
        return false
}
console.log(eon(9));

function sumAllDivisible3(x){
    let sum = 0;
    for (let i = 1; i <= x; i++) {
        if (i % 3 === 0) {
            sum += i;
        }
    }
    return sum;
}
console.log(sumAllDivisible3(2000)); 


