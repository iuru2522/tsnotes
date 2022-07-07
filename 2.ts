type Fish = { swim: () => void };
type Bird = { fly: () => void };
 
// function move(animal: Fish | Bird) {
//   if ("swim" in animal) {
//     return animal.swim();
//   }
 
//   return animal.fly();
// }


function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
  }

let pet = getSmallPet();

if (isFish(pet)) {
    if (isFish(pet)){
        pet.swim()
    } else {
        pet.fly()
    }
}