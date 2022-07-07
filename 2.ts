type Fish = {swim: () => void; name: string}
type Bird = { fly: () => void; name: string}

declare function getSmallPet(): Fish | Bird;

function isFish(pet: Fish | Bird): pet is Fish {
    return(pet as Fish).swim !== undefined
}

const zoo: (Fish | Bird)[] = [getSmallPet(), getSmallPet(), getSmallPet()]
const underWater1: Fish[] = zoo.filter(isFish);
//or equivalently

const underWater2: Fish[] = zoo.filter(isFish) as Fish[]

//the predicate may need repeating for more complex examples

const underWater3: Fish[] = zoo.filter((pet): pet is Fish =>{
    if (pet.name === "sharkey") return false;
    return isFish(pet)
})