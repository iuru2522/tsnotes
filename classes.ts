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

class BadGreeter {
    //to see this error, you need to setup tsconfig file. ""--strictPropertyInitialization" to true
     //Property 'name' has no initializer and is not definitely assigned in the constructor.
    name: string;
 
  
  }

class NiceGreeter {
    name: string;
    constructor(){
        this.name = "yo"
    }
}


