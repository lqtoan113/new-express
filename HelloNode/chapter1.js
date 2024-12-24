// Chapter 1. Introduction to JavaScript
var msg = 'Hello World';
console.log('Hello World');

let points = [      // An array with 2 elements.
    {x: 2, y: 0},   // Each element is an object.
    {x: 0, y: 2}
    ];
let x = 2, y = 3;
let primes = [2,4,6,8];
let data = { 
    trial1: [[1,2], [3,4]], 
    trial2: [[2,3], [4,5]] 
    };

// function plus1(x){
//     return x+1;
// }

// let square = function(x){
//     return x*x;
// }

const plus1 = x => x + 1;        // same as function plus1
const square = x => x * x;       // same as function square

console.log(plus1(y));  
console.log(square(plus1(y)));

points.dist = function(){
    let p1 = points[0]; // First element of array
    let p2 = points[1]; // Second element of array

    let a = p2.x-p1.x;  // Difference in x coordinates
    let b = p2.y-p1.y;  // Difference in y coordinates

    return Math.sqrt(a*a + b*b); 
};

console.log(points.dist());

function abs(x){    
    if(x>0)
        return x;
    else 
        return -x;
};
function sum(array){
    let sum = 0
    for(let x of array){
        sum += x;
    }
    return sum;
};
function factorial(n) { // giai thua
    let product = 1; 
    while(n > 1) { 
    product *= n; 
    n--; 
    } 
    return product;
};
function factorial2(n) { 
    product = 1; 
    for(let i=2; i <= n; i++) 
    product *= i; 
    return product; 
};
    
console.log(abs(-10));
console.log(sum(primes));
console.log(factorial2(5));


class Point { 
    constructor(x, y) { 
        this.x = x;
        this.y = y; 
    } 
    
    distance() { // khoang cach
        return Math.sqrt( 
        this.x * this.x + this.y * this.y // x² + y² distance from p to origin
        
    );
    }
};

let p = new Point(1,1);
console.log(p.distance());