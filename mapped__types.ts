//mapped types

//mapped types build on the syntax for index signatures, which are used to
//declare the types of properties which have not been declared ahead of time

type Horse = {};

type OnlyBoolsAndHorses = {
    [key: string]: boolean | Horse;
}

const conforms: OnlyBoolsAndHorses = {
    del: true,
    rodney: false,
}
//==============================================================================
type OptionsFlags<Type> = {
    [Property in keyof Type]: boolean;
}

//===============================================================================

type FeatureFlags = {
    darkMode: () => void;
    newUserProfile: () => void;
};

/* type FeatureOptions = {
*   darkMode: boolean;
*    newUserProfile: boolean;
}*/
type FeatureOptions = OptionsFlags<FeatureFlags>;
//=====================================================================
//mapping modifiers
//there are two different modifiers which can be applied during mapping
//"readonly" and "?" which affect mutability and optionality respectively
type CreateMutable<Type> = {
    -readonly [Property in keyof Type]: Type[Property];
}

type LockedAccount = {
    readonly id: string;
    readonly name: string;
}

/* type UnlockedAccount = {
*    id: string;
*   name: string;
}*/
type UnlockedAccount = CreateMutable<LockedAccount>;
//===============================================================================

type Concrete <Type> = {
    [Property in keyof Type]-?: Type [Property];
};

type MaybeUser = {
    id: string;
    name?: string;
    age?: number;
};

/*type User = {
*   id: string;
*   name: string;
*   age: number;
} */
type User = Concrete<MaybeUser>;
//========================================================================================
//KEY Remapping via "as"
//in TS 4.1 and onwards, you can re-map keys in mapped types with an
//"as" clause in a mapped type

type MappedTypeWithNewProperties<Type> = {
    [Properties in keyof Type as NewKeyType]: Type[Properties];
}
//=============================================================

type Getters<Type> = {
    [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property];
}

interface Person {
    name: string;
    age: number;
    location: string;
}

/* type LazyPerson = {
*   getName: () => string;
*   getAge: () => number;
*   getLocation: () => string;
} */

type LazyPerson = Getters<Person>;
//==========================================================
//how to filter out keys of producing "never" via a conditional type:

type RemoveKindField<Type> = {
    [Property in keyof Type as Exclude<Property, "kind">]: Type[Property]
};

interface Circle {
    kind: "circle";
    radius: number;
}

/* type KindlessCircle = {
    radius: number;
} */
type KindlessCircle = RemoveKindField<Circle>;

//how to map over arbitrary unions, not just unions of string | number | symbol,
//but unions of any type

type EventConfig<Events extends {kind: string}> = {
    [E in Events as E["kind"]]: (event: E) => void;
}

type SquareEvent = { kind: "square", x: number, y: number};
type CircleEvent = { kind: "circle", radius: number};
/*type Config = {
    square: (event: SquareEvent) => void;
    circle: (event: CircleEvent) => void;
} */
type Config = EventConfig<SquareEvent | CircleEvent>

//Futher exploration

type ExtractPII<Type> = {
    [Property in keyof Type]: Type[Property] extends {pii: true} ? true : false;
};

type DBFields = {
    id: {format: "incrementing"};
    name: {type: string; pii: true};
};

/* type ObjectsNeedingGDPRDeletion = {
    id: false;
    name: true;
} */
type ObjectsNeedingGDPRDeletion = ExtractPII<DBFields>;


























