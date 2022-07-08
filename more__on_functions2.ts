//working with canstrained (обмеженими) values

// //common error when working with generic constraints
// function minimumlength<Type extends {length: number }>(
//     obj: Type,
//     minimum: number): Type{
//         if (obj.length >= minimum){
//             return obj;
//         }else {
// //Type '{ length: any; }' is not assignable to type 'Type'.
// //'{ length: any; }' is assignable to the constraint of type 'Type',
// //but 'Type' could be instantiated with a different subtype of constraint
// //'{ length: number; }
//             return { length: minimim}
//         }
//     }

//the problem is that the function promises to return the same kind of object as was passed in,
//not just some object matching the constraint.
// declare function minimumlength2<Type extends {length: number}>(
//     obj: Type,
//     minimum: number
// ): Type;
// //arr gets value{length: 6}
// const arr = minimumlength2([1, 2, 3], 6)
// // and crashes here because arrays have
// //a "slice" method, but not the returned object

// console.log(arr.slice(0))

//specifying type arguments

function combinedd<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2);
}

// declare function combines<Type>(arrr1: Type[], arrr2: Type[]): Type[]
// //normally it would be an error to call this function with mismathed arrays:
// //Type 'string' is not assignable to type 'number'
// const arrr = combines([1, 2, 3], ["hello"])

// if needed the intended type argument in a generic call you could manually specify Type:
declare function combinee<Type>(arr1: Type[], arr2: Type[]): Type[];
const aqq = combinee<string | number>([1, 2, 3], ["hello"]);

//Guidelines for Writing good genreric function

//Having too many type parameters or using constraints where they aren't needed can make inference less
//successful, frustrating callers or your function.

//push type parameters down

//two ways of writing a function that appear similar:
function firstElement10<Type>(arr: Type[]) {
  return arr[0];
}

function firstElement20<Type extends any[]>(arr: Type) {
  return arr[0];
}

//a: number (good)
const c = firstElement10([1, 2, 3]);
//b: any(bad)
const d = firstElement20([1, 2, 3]);
//RULE: When possible, use the type parameter itself rather than constraining it

//USE FEWER TYPE PARAMETERS

//another pair of similar functions
function filter1<Type>(arr: Type[], func: (arg: Type) => boolean): Type[] {
  return arr.filter(func);
}

function filter2<Type, Func extends (args: Type) => boolean>(
  arr: Type[],
  func: Func
): Type[] {
  return arr.filter(func);
}

// TYPE PARAMETS SHOULD APPEAR TWICE

function greet<Str extends string>(s: Str) {
  console.log("Yo, " + s);
}

greet("maaan");

//easier way

//remember, type parameters are for relating the types of multiple values. If a type parameter
//is only used once in the function signature, it's not relating anything.

function greetFunc(s: string) {
  console.log("yo, " + s);
}

//RULE: If type parameter only appears in one location, strongly reconsider if you actually need it.

//OPTIONAL PARAMETERS

function fff(n: number) {
  console.log(n.toFixed()); //0 argument
  console.log(n.toFixed(3)); //3 argument
}

//also can model in TS by marking the parameter as optional with ?:
// function ff(x: number) {
//   ///
// }
// ff();
// ff(10);

//the parameter is specified as type "number", the "x" parameter will actually have the type "number | undefined"
//because unspecified parameters in JS get the value "undefined"

//can also provide a paramter default
function f100(x = 10) {
  //
}

declare function f(x?: number): void;
//all good
f();
f(10);
f(undefined);

//optional parameters in Callbacks

//after optional parameters and function type expressions, it is good to make the following
//mistakes wher writing functions that invoke callbacks;
function myForEach(arr: any[], callback: (arg: any, index?: number) => void) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i);
  }
}

//what people usually intend when writing index? as an optional parameter
//is that they want both of these calls to be legal
declare function myForrEach(
  arr: any[],
  callback: (arg: any, index?: number) => void
): void;
myForrEach([1, 2, 3], (a) => console.log(a));
myForrEach([1, 2, 3], (a, i) => console.log(a, i));

function theFunc(arr: any[], callback: (arg: any, index?: number) => void) {
  for (let i = 0; i < arr.length; i++) {
    //I don't feel like prov. index today
    callback(arr[i]);
  }
}


//In JS, if you call a function with more arguments than there are parameters,
// the extra arguments are simply ignored. 
//TS behaves the same way. Functions with fewer parameters 
//(of the same types) can always take the place of functions with more parameters.
declare function ofFunc(
  arr: any[],
  callback: (arg: any, index?: number) => void
): void;

ofFunc([1, 2, 3], (a, i) => {

    //Object is possibly 'undefined'.
  console.log(i.toFixed());
});
