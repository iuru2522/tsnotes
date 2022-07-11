//typeof type operator

//prints "string"
//js already has a "typeof" operator you can use in an expression context
console.log(typeof "Ya'all")

let s = "yaaa";
//let n:string
let n: typeof s;

//not so useful for basic types
type Predicate = (x: unknown) => boolean;
//type K = boolean
type K = ReturnType<Predicate>;

function f(){
    return {x: 10, y: 3};
}
//'f' refers to a value, but is being used as a type here. Did you mean 'typeof f'?
type PP = ReturnType<f>;

//remember that values and type's aren't the same thing. To refer to the type that the value f has
//use typeof!!
function fk(){
    return {x: 10, y: 3};
}

type PPP = ReturnType<typeof fk>;

//limitations

declare const msgbox: () => boolean;
//',' expected.
let shouldContinue: typeof msgbox("are you sure you want? this")








































