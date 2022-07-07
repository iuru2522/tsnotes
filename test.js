"use strict";

function isFish(pet) {
  return pet.swim !== undefined;
}

const zoo = [getSmallPet(), getSmallPet(), getSmallPet()];
const underWater1 = zoo.filter(isFish);

//or

const underWater2 = zoo.filter(isFish);
const underWater3 = zoo.filter((pet) => {
  if (pet.name === "sharkey") return false;
  return isFish(pet);
});
