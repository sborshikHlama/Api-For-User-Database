import { HTTP_STATUSES } from '../../src/user.controller'
import request from 'supertest'

const url = 'http://localhost:8080/api'
describe('/api', () => {
    it(`shouldn't create user with incorect input data`, async () => {
        await request(url)
            .post('/users')
            .send({
                name: 1,
                surname: 0
            })
            .expect(HTTP_STATUSES.BAD_REQUEST_400)
    })
    it(`shouldn't update user with incorect input data`, async () => {
        await request(url)
            .put('/users/' + -100 )
            .send({
                name: 1,
                surname: 0
            })
             .expect(HTTP_STATUSES.NOT_FOUND_404)
    })
    it('should create user', async () => {
        await request(url)
            .post('/users')
            .send({
                name: "Rayan",
                surname: "Gosling",
                role: "Student"
            })
            .expect(HTTP_STATUSES.CREATED_201)
    })
    it('should get all users', async () => {
        await request(url)
            .get('/users')
            .expect(HTTP_STATUSES.OK_200)
    })
    it('should update user', async() => {
        await request(url)
            .put('/users/1')
            .send({
                name: "Tom",
                surname: "Holand",
                role: "Student"
            })
            .expect(HTTP_STATUSES.NO_CONTENT_204)
    })
    it('should get user', async () => {
        await request(url)
            .get('users/1')
            .expect(HTTP_STATUSES.OK_200)
    })
    it('should delete user', async() => {
        await request(url)
            .delete('/users/1')
            .expect(HTTP_STATUSES.NO_CONTENT_204)              
    })
})

