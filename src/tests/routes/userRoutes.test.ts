import { app } from '../../main'
import * as supertest from 'supertest'
import { disconnect } from 'mongoose'
import { setupDB } from '../mockData/user'
import * as chalk from 'chalk'

const request = supertest(app)

beforeAll(async ()=>{
    await setupDB()
})

describe(chalk.bgWhite.black(' Users '), ()=>{

    describe('POST', ()=>{

        it('Should create user receiving 201 status code from /signup', async ()=>{

            await request.post('/signup')
                .send({
                    username: 'nicolas',
                    email: 'nicolas@gmail.com',
                    password: 'pastafrola123'
                })
                .expect(201)
        })

        it('Should get a 400 bad request status from sending empty body to /signup', async ()=>{

            await request.post('/signup')
                .send()
                .expect(400)
        })

        it('Should get a 400 bad request for sending an invalid email ', async ()=>{

            const response = await request.post('/signup')
                .send({
                    username: 'roberto',
                    email:'noesunemailesto',
                    password:'botelladeagua'
                })
                .expect(400)

            expect(response.body.error).toContain('email')
        })

        it('Should get a 400 bad request for sending an invalid password (password) ', async ()=>{

            const response = await request.post('/signup')
                .send({
                    username: 'roberto',
                    email:'nicolas@gmail.com',
                    password:'password'
                })
                .expect(400)

            expect(response.body.error).toContain('password')
        })
    })

    describe('GET', ()=>{

        it('Should receive Success message from get(\'/\') endpoint', async ()=>{

            const response = await request.get('/')
    
            expect(response.body.msg).toBe('Success')
        })
    })

})

afterAll(async()=>{
    await disconnect()
})