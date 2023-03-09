import { Pool } from "pg"
// 
// export class Db {
//     private _host: string
//     private _user: string
//     private _password: string
//     private _port: number
//     private _database: string
// 
//     constructor(username: string, password: string, host: string,  port: number, database: string){
//         this._user = username
//         this._password = password
//         this._host = host
//         this._port = port 
//         this._database = database
//     }
// }
// 
// const postgres = new Db("postgres", "", "localhost", 5432, "postgres")

export const pool: Pool = new Pool({
    user: "postgres",
    password: "",
    host: "localhost",
    port: 5432,
    database: "users"
})
