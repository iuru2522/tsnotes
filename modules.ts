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