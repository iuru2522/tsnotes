// function printAll(strs: string | string[] | null) {
//     if (typeof strs === "object") {

//         //Onject is possibly "nulls"
//         for (const s of strs) {
//             console.log(s)
//         }
//     } else if (typeof strs === "string") {
//         console.log(strs)
//     } else {
//         //do nothings
//     }
// }

// function getUsersOnlineMessage(numUsersOnline: number ){
//     if(numUsersOnline) {
//         return `There are ${numUsersOnline} online now!`
//     }
//     return "Nobody's here. :("
// }

// function printAll(strs: string | string[] | null) {
//     if(strs && typeof strs === "object"){
//         for(const s of strs) {
//             console.log(s)
//         }
//     } else if (typeof strs === "string"){
//         console.log(strs)
//     }
// }

// function printAll(strs: string | string[] | null) {
//     //

//     if (strs) {
//         if (typeof strs === "object") {
//             for (const s of strs) {
//                 console.log(s);
//             }
//         } else if (typeof strs === "string") {
//             console.log(strs);
//         }
//     }
// }

// function multiplyAll(
//     values: number[] | undefined,
//     factor: number
// ): number[] | undefined {
//     if(!values){
//         return values
//     }else {
//         return values.map((x) => x * factor)
//     }
// }

// function example(x: string | number, y: string | boolean) {
//     if( x === y) {
//         // we can now call ant "string" method on "x" or "y"

//         //(method) String.toUpperCase(): string
//         x.toUpperCase();

//         //(method) String.toLowerCase(): string
//         y.toLowerCase()
//     } else {
//         //(parameter) x: string | number
//         console.log(x)
//         // (parameter) y: string | boolean
//         console.log(y)
//     }
// }

// function printAll(strs: string | string[] | null) {
//     if(strs !== null){
//         if (typeof strs === "object"){

//             //(parameter) strs: string[]
//             for (const s of strs){
//                 console.log(s)
//             }
//         }else if(typeof strs === "string"){

//             //(parameter) strs: string
//             console.log(strs)
//         }
//     }
// }

// interface Container {
//     value: number | null | undefined;
// }

// function multiplyValue(container: Container, factor: number){
//     //remove both "null" and "undefined" from the type
//     if(container.value != null) {
//         console.log(container.value)

//         //Now we can safely multiply "container.value"

//         container.value *= factor;
//     }
// }

//The "in" operator narrowing.

// type Fish = { swim: () => void}
// type Bird = { fly: () => void}

// function move(animal: Fish | Bird) {
//     if("swim" in animal){
//         return animal.swim()
//     }
//     return animal.fly()
// }

// type Fish = { swim: () => void}
// type Bird = { fly: () => void}
// type Human = { swim?: () => void; fly?: () => void}

// function move(animal: Fish | Bird | Human){
//     if("swim" in animal){
//         //(parameter) animal: Fish | Human
//         animal;
//     } else {
//         //(parameter) animal: Bird | Human
//         animal;

//     }
// }

//instance of narrowing

function logValue(x: Date | string) {
  if (x instanceof Date) {
    //(parameter) x: Date
    console.log(x.toUTCString());
  } else {
    //(parameter) x: string
    console.log(x.toUpperCase());
  }
}

//assignments

//Each of these assignments is valid
//let x: string | number
// let x = Math.random() < 0.5 ? 10 : "yyyo"

// x = 1;
// //let x: number
// console.log(x)

// x = "goodbye!"

// //let x: string
// console.log(x)

// //let x: string | number
// let x = Math.random() < 0.5 ? 10 : "Yo!"

// x = 1;

// //let x: number
// console.log(x)

// //Type 'boolean' is not assignable to type 'string | number'.
// x = true;

// //let x: string | number
// console.log(x)

//control flow analysis

// function padLeft(padding: number | string, input: string) {
//     if(typeof padding === "number"){
//         return " ".repeat(padding) + input
//     }
//     return padding + input;
// }

// function example() {
//     let x: string | number | boolean;
//     x = Math.random() < 0.5
//     //let x: boolean
//     console.log(x)

//     if(Math.random() < 0.5) {
//         x= "hello";
//         //let x: string
//         console.log(x)

//     } else {
//         x = 100;
//         //let x: number
//         console.log(x)

//     }
//     //let x: string | number
//     return x;

// }

//using type predicates

// const zoo: (Fish | Bird)[] = [getSmallPet(), getSmallPet(), getSmallPet()]
// const underWater1: Fish[] = zoo.filter(isFish);
// //or, equivalntly

// const underWater2: Fish[] = zoo. filter(isFish) as Fish[];

//discriminated unions

// interface Shape {
//     kind: "circle" | "square";
//     radius?: number;
//     sideLength?: number;
// }

// function handleShape(shape: Shape){
//     //oooops
//     //This condition will always return 'false' since the types
//    "circle" | "square"' and '"rect"' have no overlap.
//     if(shape.kind === "rect"){

//     }
// }

// interface Shape {
//   kind: "circle" | "square";
//   radius?: number;
//   sideLength?: number;
// }

// function getArea(shape: Shape) {
//   //Object is possibly 'undefined'.
//   return Math.PI * shape.radius ** 2;
// }

// function getArea(shape: Shape) {
//   if (shape.kind === "circle") {
//     //Object is possibly 'undefined'.
//     return Math.PI * shape.radius ** 2;
//   }
// }

//try to use a non-null assertion(a "!"" after "shape.radius")
//to say radius is definitely present
// function getArea(shape: Shape) {
//   if (shape.kind === "circle") {
//     return Math.PI * shape.radius! ** 2;
//   }
// }

//the problem with this encoding of "Shape" is that type-checker
//doesn't have any way to know whether or not "radius" or sideLength are
//present based in the "kind" property.

//It needed to communicate what we know to the type checker.

interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}

//properly separated "Shape" out into two types with defferent
//value for the "kind" property, but "radius" and "sideLength" are declared
//as required properties in their respective types.
type Shape = Circle | Square;

// function getAre(shape: Shape) {
//   //Property 'radius' does not exist on type 'Shape'.
//   return Math.PI * shape.radius ** 2;
// }

// function getArea(shape: Shape){
//     if(shape.kind === "circle"){

//         //(parameter) shape: Circle
//         return Math.PI * shape.radius ** 2;

//     }
// }


//the same checking works with "switch" statements as well.
//try without "!" non-null assertions.
function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      //(parameter) shape: Circle
      return Math.PI * shape.radius ** 2;
    case "square":
      //(parameter) shape: Circle
      return shape.sideLength ** 2;
  }
}
