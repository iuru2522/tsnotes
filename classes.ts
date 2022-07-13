//CLASSES
//Class mermbers
// class daPoint{}

//Fields
// class thePoint {
//     x: number;
//     y: number;
//     z: number;
// }

// const pt = new daPoint();

// pt.x = 0;
// pt.y = 0;
// pt.z = 0;

// class daPoint {
//     x = 0;
//     y = 0;
//     z = 0;
// }
// const thePt = new daPoint();
// console.log(`${pt.x}, ${pt.y}`);

// const PT = new thePoint();
// //Type 'string' is not assignable to type 'number'.
// pt.x = "0";

// class BadGreeter {
//     //to see this error, you need to setup tsconfig file. ""--strictPropertyInitialization" to true
//     //Property 'name' has no initializer and is not definitely assigned in the constructor.
//     name: string;
// }

class NiceGreeter {
    name: string;
    constructor() {
        this.name = "yo"
    }
}
//definite assignment assertion operator, "!""
class SuperGreeter {
    name!: string;
}

//readonly

// class theGreeter {
//     readonly name: string = "wooorld";

//     constructor(otherName?: string) {
//         if (otherName !== undefined) {
//             this.name = otherName;
//         };
//     }
//     err(){
//         //Cannot assign to 'name' because it is a read-only property.
//         this.name = "not ok";
//     }
// }
// const g = new theGreeter();
// //Cannot assign to 'name' because it is a read-only property.
// g.name = "not okay";

//constructors
//Class constructors are very similar to functions. 
//You can add parameters with type annotations, default values, and overloads:

class PointOne {
    x: number;
    y: number;
    constructor(x = 0, y = 0;) {
        this.x = x;
        this.y = y;
    }
}

class PointTwo {
    constructor(x: number, y: string);
    constructor(s: string);
    constructor(xs: any, y?: any) {
        //TDB
    }
}

//super call

class Base {
    k = 4;
}
class Derived extends Base {
    constructor() {
        //asdasd
        console.log(this.k)
        //'super' must be called before accessing 'this'
        // in the constructor of a derived class.
        super();
    }
}

//METHODS

//a function property 

class pPoint {
    x = 10;
    y = 10;
    scale(n: number): void {
        this.y *= n;
        this.x *= n;
    }
}

let x: number = 0;
class C {
    x: string = "hello";
    m() {
        x = "world";
        //Type 'string' is not assignable to type 'number'.
    }
}

//getters /setters

class D {
    _length = 0;
    get length() {
        return this.length;
    }
    set length(value) {
        this._length = value;
    }
}

class Thing {
    _size = 0;
    get size(): number {
        return this._size;
    }
    set size(value: string | number | boolean) {
        let num = Number(value);
        //
        if (!Number.isFinite(num)) {
            this._size = 0;
            return;
        }
        this._size = num;
    }
}

//index signatures

class MyClass {
    [s: string]: boolean | ((s: string) => boolean);
    check (s: sting){
        return this[s] as boolean;
    }
}

//CLASS HERITAGE

//implements Clauses


interface Pingable {
    ping(): void;
}

class Sonar implements Pingable {
    ping(){
        console.log("ping!");
    }
}

//Class 'Ball' incorrectly implements interface 'Pingable'.
//Property 'ping' is missing in type 'Ball' but required in type 'Pingable'.


class Ball implements Pingable {
    pong(){
        console.log("pong")
    }
}