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
    check(s: sting) {
        return this[s] as boolean;
    }
}

//CLASS HERITAGE

//implements Clauses


interface Pingable {
    ping(): void;
}

class Sonar implements Pingable {
    ping() {
        console.log("ping!");
    }
}

//Class 'Ball' incorrectly implements interface 'Pingable'.
//Property 'ping' is missing in type 'Ball' but required in type 'Pingable'.
class Ball implements Pingable {
    pong() {
        console.log("pong")
    }
}

//Cautions

interface Checkable {
    check(name: string): boolean;
}

class NameChecher implements Checkable {
    //Parameter 's' implicitly has an 'any' type.
    check(s) {
        return s.toLowercse() === "ok"

    }
}


interface A {
    x: number;
    y?: number;
}

class C implements A {
    x = 0;
}
const c = new C();
//Property 'y' does not exist on type 'C'.
c.y = 10;

//extends Clauses

class Animal2 {
    move() {
        console.log("Moving along!")
    }
}

class Dog extends Animal2 {
    woof(times: number) {
        for (let i = 0; i < times; i++) {
            console.log("woof!");
        }
    }
}

const ddd = new Dog();
ddd.move();
ddd.woof();

//overriding methods

class theBase {
    greet() {
        console.log("Hello, world!")
    }
}

class Derived2 extends theBase {
    greet(name?: string) {
        if (name === undefined) {
            super.greet();

        } else {
            console.log(`yoy, ${name.toUpperCase()}`);
        }
    }
}

const dd = new Derived2();
dd.greet();
dd.greet("reader");

const B: theBase = d;
B.greet();

class thaBase {
    greet() {
        console.log("yo world");
    }
}

class thaDerived extends thaBase {
    //Property 'greet' in type 'Derived' is not assignable to the same property in base type 'Base'.
    //Type '(name: string) => void' is not assignable to type '() => void'.
    greet(name: string) {
        console.log(`hello, ${name.toUpperCase()}`);
    }
}

declare class base {
    greet(): void;
}
declare class derived extends base { };

const bq: base = new derived();
//// Crashes because "name" will be undefined
bq.greet();

//type-only field declarations
interface AnimalA {
    dateOfBirth: any;
}

interface DogA extends AnimalA {
    breed: any;
}

class AnimalHouse {
    resident: AnimalA;
    constructor(animal: AnimalA) {
        this.resident = animal;
    }
}

class DogHouse extends AnimalHouse {
    //
    //
    declare resident: DogA;
    constructor(dog: DogA) {
        super(dog);
    }
}

//initialization order
//Note: If you don’t plan to inherit from built-in types like Array, Error, Map, etc. or your compilation target is explicitly set to ES6/ES2015 or above, you may skip this section
class tBase {
    name = "base";
    constructor() {
        console.log("Name " + this.name)
    }
}
class tDerived extends Base {
    name = "derived";
}

const q = new tDerived();

//for a subclass like the following

class MsgError extends Error {
    constructor(m: string) {
        super(m)
    }
    sayYo() {
        return "Hi " + this.message;
    }
}

class MesError extends Error {
    constructor(m: string) {
        super(m);
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, MesError.prototype)
    }

    sayHello() {
        return "hello " + this.message;
    }
}

//MEMBER VISIBILITY

//public

class Onemore {
    public hi() {
        console.log("zdorov")
    }
}

const g = new Onemore();
g.hi();

//protected
//protected members are only visible to subclasses of the class they're declared in

class oohHi {
    public sayHi() {
        console.log("Hello, " + this.getname());
    }
    protected getname() {
        return "ya!"
    }
}

class sHello extends oohHi {
    public howdy() {
        console.log("Howdy, " + this.getname());
    }
}

const k = new sHello();
k.sayHi();//Okay
//Property 'getname' is protected and only accessible within class 'oohHi' and its subclasses.
k.getname();


//exposure of protected members
class Fundamentals {
    protected d = 10;
}

class Floor extends Fundamentals {
    //// No modifier, so default is 'public'
    d = 15;
}

const y = new Floor();
console.log(y.d)//okay


//cross-hierarchy protected acess

class fromScratch {
    protected x: number = 1;
}
class der1 extends fromScratch {
    protected x: number = 5;
}
class der2 extends fromScratch {
    f1(other: der2) {
        other.x = 10;
    }
    f2(other: fromScratch) {
        //Property 'x' is protected and only accessible through an instance of class 'der2'. This is an instance of class 'fromScratch'.
        other.x = 10;
    }
}

//private

//"private" is like "protected", but doesn't allow access tot he member even from subclass

class FundamentalsFirst {
    private of = 0;
}

const p = new FundamentalsFirst();
// Can't access from outside the class
//Property 'of' is private and only accessible within class 'FundamentalsFirst'
console.log(p.of)
class FundamentalsSecond extends FundamentalsFirst {
    showX() {
        //Property 'of' is private and only accessible within class 'FundamentalsFirst'.
        console.log(this.of)
    }
}

//because "private" members visible to derived classes, a derived class can't
//increase its visibility

class house {
    private w = 19;
}
class dance extends house {
    //Class 'dance' incorrectly extends base class 'house'.
    //Property 'w' is private in type 'house' but not in type 'dance'.
    w = 1;
}

//cross-instance private access
class FF {
    private x = 11;
    public sameAs(other: FF) {
        return other.x === this.x;
    }
}

//caveats

class mSafe {
    private secretKey = 12345;
}
//in js code
const v = new mSafe()
console.log(v.secretKey)

class SafeClass {
    private secKey = 1234;
}

const qq = new SafeClass()
//Property 'secKey' is private and only accessible within class 'SafeClass'
console.log(qq.secKey);
//Okay
console.log(qq["secKey"]);

class niceDog {
    #barkAmount = 0;
    personality = "happy";
    constructor() { }
}

//"use" strict
var _Dog_barkAmount;
class theDog {
    constructor() {
        _Dog_barkAmount.set(this, 0)
        this.persn = "happy";
    }
}
_Dog_barkAmount = new WeakMap();

//STATIC MEMBERS

//classes may have "static" members. These members aren't associated with
// a particular instance of the class. They can be accessed through the class
//constructor object itself

class yourClass {
    static x = 0;
    static printX() {
        console.log(yourClass.x);
    }
}
console.log(yourClass.x);
yourClass.printX();

//static members can also use the same public, protected and private visibility

class futureClass {
    private static x = 0;
}
//Property 'x' is private and only accessible within class 'futureClass'.
console.log(futureClass.x);

//static members are also inherited

class furuteBase {
    static getG() {
        return "!"
    }
}
class Der extends furuteBase {
    myG = Der.getG();
}

//special static names

class S {
    //Static property 'name' conflicts with built-in property 'Function.name' of constructor function 'S'.
    static name = "S!";
}

//why no static classes?

class MyStaticClass {
    static someSome() { }
}

function someSome() { }
const MyHeplerOject = {
    doSomething() { }
}

//"Static" BLOCKS IN CLASSES
//static block allow you to write a sequence of statements with their own scope
//that can access private fields withthin the containing class.

declare function loadLastInstances(): any[]

class Foo {
    static #count = 0;
    get count() {
        return Foo.#count;
    }
    static {
        try {
            const lastInstances = loadLastInstances();
            Foo.#count += lastInstances.length;
        }
        catch { }
    }
}

//GENERIC CLASSES
//classes, much like interfaces, can be genereic.
//when a generic class is istantiated with "new", its type are 
//inferref the same way as in function call;
class BOX<Type> {
    contents: Type;
    constructor(value: Type) {
        this.contents = value;
    }
}
//const z: BOX<string>
const z = new BOX("right!")

//classes can use generic constraints and defaults the same way as interfaces

//TYPE PARAMETERS IN STATIC MEMBERS

class beat<Type>{

    //Static members cannot reference class type parameters
    static defaultValue: Type;
}

//rememeber that the types are fully erased! At runtime, there's only one "beat.defaultValue" property slot. This means that setting 
//beat<string>.defaultValue( if that were possible) would also change "beat<number>.defaultValue - is not good.
//the static member of a generic class can never refer to the class's type parameters.


//"this" ar Runtime in Classes

//it's important to remember that TS doen't change the runtim behavior
//of JS, and that JS is somewhat famous for having some peculiar runtime 
//behavoirs

class ofMyClass {
    name = "MyClass";
    gotName() {
        return this.name
    }
}
const m = new ofMyClass();
const objekt = {
    name: "objekt",
    gotName: m.gotName,
}
//prints "obj", not "MyClass"
console.log(objekt.gotName());

//this is rarely what you want to happen. TS provides some ways to
//mitigate or prevent this kind of error.

//arrow functions

//if you have a function that will often be called in a way that loses
//its "this" context, it can make sense to use an arrow function 
//property instead of a method.

class secondMyClass {
    name = "MyClass";
    sGetName = () => {
        return this.name;
    }
}
const ny = new secondMyClass();
const mb = ny.sGetName;
console.log(mb())

//"this" parameters

//in a method or functions definition, an initial parameter names "this"
//has a special meaning in TS
//these parameter are erased during compilation
type typ = any;
function func(this: typ, x: number) {

}

//TS checks that calling a function with a "this" parameter is done so with a correct
//context. instead of using an arrow function, we can add a "this"
//parameter to method definitions to statically enforce that the mehtod is 
//called correctly

class thirdMyClass {
    name = "thirdtry";
    gName(this: thirdMyClass) {
        return this.name;
    }
}
const zx = new thirdMyClass();
//ok
zx.gName();
const bb = zx.gName;
//The 'this' context of type 'void' is not assignable to method's 'this' of type 'thirdMyClass'.
console.log(bb())

//"this" types

class hugeBox {
    contents: string = "";
    //(method) hugeBox.set(value: string): this
    set(value: string) {
        this.contents = value;
        return this;
    }
}


class Bx {
    contents: string = "";
    set(value: string) {
        this.contents = value;
        return this;
    }
}
class ClearableBox extends Bx {
    clear() {
        this.contents = "";
    }
}

const AA = new ClearableBox();
//const BB: ClearableBox
const BB = AA.set("yo");

//can also use "this" in a parameter type annoation

class Can {
    content: string = "";
    sameAs(other: this){
        return other.content === this.content;
    }
}

//this is different from writing "other: Box"
//if a derived method -> sameAs method will now only accept other
//instance of that same derived class;

class One {
    content: string = "";
    sameAs(other: this){
        return other.content === this.content;
    }
}

class DerivedBox extends One {
    otherContent: string = "?";
}

const theB = new One();

const deriv = new DerivedBox();
//Argument of type 'One' is not assignable to parameter of type 'DerivedBox'.
//Property 'otherContent' is missing in type 'One' but required in type 'DerivedBox'
deriv.sameAs(theB);

//"this" - based type guards

class FileSystemObject {
    isFile(): this is FileRep {
        return this instanceof FileRep;
    }
    isDirectory(): this is Directory {
        return this instanceof Directory;
    }
    isNetworked(): this is Networked & this {
        return this.networked;
    }
    constructor(public path: string, private networked: boolean) {}
}
class FileRep extends FileSystemObject {
    constructor(path: string, public content: string){
        super(path, false)
    }
}

class Directory extends FileSystemObject {
    children: FileSystemObject[];
}

interface Networked{
    host: string;
}

const fso: FileSystemObject = new FileRep("foo/bar.txt", "foo");
if (fso.isFile()){
fso.content;
}else if (fso.isDirectory()){
    fso.children;
}else if (fso.isNetworked()){
    fso.host;
}