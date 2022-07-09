//keyof type operator

//the keyof operator takes an onject type and produces a string or numeric literal union
//of its keys

type Point = {x: number; y: number};
//type P = keyof Point
type P = keyof Point;

type Arrayish = {[n: number ]: unknown};
//type A = number
type A = keyof Arrayish;

type Mapish = {[k: string]: boolean};
//type M = string | number
type M = keyof Mapish;
//note M is string | number - this is because JS object keys are always coerced to a string
// obj[0] is always the same as obj["0"]

//keyof types become especially useful when cmbined with mapped types


