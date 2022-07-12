//CLASSES
//Class mermbers
class Point{}

//Fields
class thePoint {
    x: number;
    y: number;
    z: number;
}

const pt = new thePoint();

pt.x = 0;
pt.y = 0;
pt.z = 0;

class newPoint {
    x = 0;
    y = 0;
    z = 0;
}
const thePt = new newPoint();
console.log(`${pt.x}, ${pt.y}`);

// const PT = new thePoint();
// //Type 'string' is not assignable to type 'number'.
// pt.x = "0";

//--strictPropertyInitialization

class UserAccount {
    name: string;
    accountType = "user";
  
    email: string;
    address: string | undefined;
  
    constructor(name: string) {
      this.name = name;
      // Note that this.email is not set
    }
}

class Good {
    name: string;
    constructor(){
        this.name = "yo"
    }
}


