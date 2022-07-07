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
function combined(arr1, arr2) {
    return arr1.concat(arr2);
}
var aq = combinee([1, 2, 3], ["hello"]);
//Guidelines for Writing good genreric function
//push type parameters down
function firstElement1(arr) {
    return arr[0];
}
function firstElement2(arr) {
    return arr[0];
}
//a: number (good)
var a = firstElement1([1, 2, 3]);
//b: any(bad)
var b = firstElement2([1, 2, 3]);
