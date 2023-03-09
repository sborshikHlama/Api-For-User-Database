import { HTTP_STATUSES } from '../../src/user.controller'
import request from 'supertest'

describe('/users', () => {
    it(`shouldn't create user with incorect input data`, async () => {
        await request('http://localhost:8080/api')
            .post('/users')
            .send({
                name: 1,
                surname: 0
            })
            .expect(HTTP_STATUSES.BAD_REQUEST_400)
    })
    it(`shouldn't update user with incorect input data`, async () => {
        await request('http://localhost:8080/api')
            .put('/users/' + -100 )
            .send({
                name: 1,
                surname: 0
            })
            .expect(HTTP_STATUSES.NOT_FOUND_404)
    })
})

