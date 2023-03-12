import { Request, Response } from "express";
import { pool } from "../db/db";
import { RequestWithBody, RequestWithParams, RequestWithParamsAndBody } from "../types/request.types";
import { User } from "../types/User";


export const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,

    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404,

    SERVER_ERROR_500: 500
}

export class UserController {
    async createUser(req: RequestWithBody<User>, res: Response) {
        const {name, surname, role} = req.body
        if(!name || !surname || !role) {
            res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
            return
        }
        const user: User = req.body
        const newUser = await pool
            .query('INSERT INTO person (name, surname, role) VALUES ($1, $2, $3) RETURNING *',
            [user.name, user.surname, user.role])
            .then(result => {
                res
                    .send(HTTP_STATUSES.CREATED_201)
                    .json(result.rows[0])
            })
            .catch(error => {
                console.log(error)
                res.sendStatus(HTTP_STATUSES.SERVER_ERROR_500)
            })
                
    }
    async getUsers(req: Request, res: Response) {
        const users = await pool
            .query('SELECT * FROM person')
            .then(result => res.json(result.rows))
            .catch(error => {
                console.log(error)
                res.sendStatus(HTTP_STATUSES.SERVER_ERROR_500)
            })
    }
    async getOneUser(req: RequestWithParams<{id: number}>, res: Response) {
        if(!req.params.id) {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
            return
        }
        const id: number = req.params.id
        const user = await pool
            .query('SELECT * FROM person where id=$1', [id])
            .then(result => {
                res.json(result.rows[0])
            })
            .catch(error => {
                console.log(error)
                res.sendStatus(HTTP_STATUSES.SERVER_ERROR_500)
            })
    }
    async updateUser(req: RequestWithParamsAndBody<{id: number}, User>, res: Response) {
        const {name, surname, role} = req.body
        if(!req.params.id || !name || !surname || !role) {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
            return
        }
        const user: User = req.body
        const id = req.params.id
        const updatetedUser = await pool
            .query('UPDATE person set name = $1, surname = $2, role = $3 where id = $3 RETURNING *', 
            [user.name, user.surname, user.role, id])
            .then(result => {
                res
                .send(HTTP_STATUSES.NO_CONTENT_204)
                .json(result.rows[0])
            })
            .catch(error => {
                console.log(error)
                res.sendStatus(HTTP_STATUSES.SERVER_ERROR_500)
            })
    }
    async deleteUser(req: RequestWithParams<{id: number}>, res: Response){
        if(!req.params.id) {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
            return
        }
        const id: number = req.params.id
        const user = await pool
            .query('DELETE FROM person where id=$1', [id])
            .then(result => {
                res
                    .send(HTTP_STATUSES.NO_CONTENT_204)
                    .json(result.rows[0])
            })
            .catch(error => {
                console.log(error)
                res.sendStatus(HTTP_STATUSES.SERVER_ERROR_500)
            })                      
    }
}