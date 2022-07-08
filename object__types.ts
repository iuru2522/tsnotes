//object types

//can be anonymous:

// function immigration(country: {name: string; abbr: string}) {
//     return "Welcome " + country.name 

// }


//named by using either an interface
// interface Country{
//     name: string;
//     abbr: string;
//     populatiom: number;

// }

// function immigration(country: Country){
//     return "Welcome " + country.name;
// }

//or a type alias.

type Country{
    name: string;
    abbr: string;
    populatiom: number;

}

function immigration(country: Country){
    return "Welcome " + country.name;
}

//in all three examples above, we've written functions that take objects that
//contain the property "name" (which must be a "string") and 
//"population" (which must be a number)

//PROPERTY MODIFIERS

//each property in an object type can specify a couple of things: 
//the type, whether the property is optional, and wherer the property 
//can be written to.

//Optional Properties

//sometimes we dealing with objects that might have a property set.
// in those case, we can mark those properties as optional by adding
// a question mark(?) to the end of their names

interface Shape {};
declare function getShape(): Shape;

interface PaintOptions{
    shape: Shape;
    xPos?: number;
    yPos?: number;
};

// function paintShape(opts: PaintOptions){

// }

// const shape = getShape();

// paintShape({shape});
// paintShape({shape, xPos: 100});
// paintShape({shape, yPos: 100});
// paintShape({shape, yPos: 100, xPos: 100});


//read more about strictNullChecks
function paintShape(opts: PaintOptions){
    //(property) PaintOptions.xPos?: number | undefined
    let xPos = opts.xPos;
    //(property) PaintOptions.yPos?: number | undefined
    let yPos = opts.yPos;
}