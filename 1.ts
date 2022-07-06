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

type Fish = { swim: () => void}
type Bird = { fly: () => void}

function move(animal: Fish | Bird) {
    if("swim" in animal){
        return animal.swim()
    }
    return animal.fly()
}