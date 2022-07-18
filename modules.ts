//the JS specification declares that any js files without an export or
//top-level await should be considered a script and not a module.

//inside a script file variables and types are declared to be in the shared
//global scope.! and it's assumed that you'll either use the outFile compiler
//option to join miltiple input files into one output file, or use multiple 
//<script> tags in your HTML to load these files

//modules in TS

//there are three main things to consider when writing module-based code
//in TS

//Syntax
//Module resolution
//module output Target

//ES module syntax
//@filename: hello.ts
// export default function hi(){
//     console.log("yoyo")
// }
// //can be inported 
// import hi from "./hello.js"
// hi();

//in addition to the default export, you can have more than one 
//export of variablws and functions via the export  by omitting "default"

export var pi = 3.14;
export let squareTwo = 1.41;
export const phi = 1.61;
export class RandomNumberGenerator {};

export function absolute(num: number){
    if (num < 0) return num * -1;
    return num;
}
//there can be used in another file via "import" syntax:

// import {pi, phi, absolute} from "./math.js"
console.log(pi)
//to be const absPhi: number
const abshPhi = absolute(phi);
