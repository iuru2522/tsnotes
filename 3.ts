// interface User {
//   id: number;
//   isAdmin: boolean;
// }
// declare const getDB: () => DB;
// // ---cut---
// interface DB {
//   filterUsers(filter: (this: User) => boolean): User[];
// }

// const db = getDB();
// const admins = db.filterUsers(() => this.admin);
