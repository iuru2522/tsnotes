//TEMPLATE LITERAL TYPES

//template literals types build on string literal types and have the
//ability to expand into many strings via unions

type Canada = "Canada";
//type Greeting = "Welcome to Canada"
type Greeting = `Welcome to ${Canada}`;


type EmailLocaleIDs = "welcome_email" | "email_heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";
//type AllLocaleIDs = "welcome_email_id" | "email_heading_id" | "footer_title_id" | "footer_sendoff_id"
type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;

type AllLocaleIDs = `${EmailLocalIDs | FooterLocaleIDs}_id`;
type Lang = "en" | "ja" | "pt";
/* type LocaleMessageIDs = "en_welcome_email_id" | "en_email_heading_id" | "en_footer_title_id" | "en_footer_sendoff_id" | "ja_welcome_email_id" | "ja_email_heading_id" | "ja_footer_title_id" | "ja_footer_sendoff_id" | "pt_welcome_email_id" | "pt_email_heading_id" | "pt_footer_title_id" | "pt_footer_sendoff_id" */
type LocaleMessageIDs = `${Lang}_${AllLocaleIDs}`;
//=================================================================================================
//STRING UNIONS IN TYPES

// const passedObject = {
//     firstName: "John",
//     lastName: "Black",
//     age: 20,
// };

// const persona = makeWatchedObject({
//     firstName: "George",
//     lastname: "White",
//     age: 29,
// });

// //
// persona.on("firstNameChanged", (newValue) => {
//     console.log(`firstName was changed to ${newValue}!`);
// })

// //=================================================================================================

// type PropEventSource<Type> = {
//     on(eventName: `${string & keyof Type} Changed`, callback: (newValue: any) => void): void;
// }

// //create object withe an "on" method

// declare function makeWatchodObj<Type>(obj: Type): Type & PropEventSource<Type>;

//nice to know 
//can build something that error when given the wrong property
type PropEventSource<Type> = {
    on(eventname: `${string & keyof Type}Changed`, callback: (newValue: any) => void): void;
}

declare function makeWatchedPersonObject<T>(obj: T): T & PropEventSource<T>;

const personObject = makeWatchedPersonObject({
    firstName: "Steve",
    lastName: "Green",
    age: 21
});
personObject.on("firstNameChanged", () => {});

//prevent from human error (using the key instead of the event)
/* Argument of type '"firstName"' is not assignable to parameter of type '"firstNameChanged" | "lastNameChanged" | "ageChanged"'. */
personObject.on("firstName", () => {});
/* Argument of type '"frstNameChanged"' is not assignable to parameter of type '"firstNameChanged" | "lastNameChanged" | "ageChanged"' */
personObject.on("frstNameChanged", () => {});
//============================================================================================================

//INFERENCE with TEMPLATE Literals

//made "on" into a generic method

type PropEventSource2<Type> = {
    on<Key extends string & keyof Type>
    (eventName: `${Key}Changed`, callback: (newValue: Type[Key]) => void): void;
}
declare function makeWatchedObject2<Type>(obj:Type): Type & PropEventSource2<Type>l

const person2 = makeWatchedObject2({
    firstName: "George",
    lastName: "White",
    age: 28
});

person2.on("firstNameChanged", newName => {
    console.log(`new name is ${newName.toUpperCase()}`);
});
person2.on("ageChanged", newAge => {
    if (newAge < 0){
        console.warn("warning! negative age");
    }
})