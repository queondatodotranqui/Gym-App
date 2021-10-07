import { app } from '../../app'
import * as supertest from 'supertest'
import { disconnect } from 'mongoose'
import { mockUser, setupDB } from '../mockData/user'
import * as chalk from 'chalk'

const request = supertest(app)

beforeAll(async ()=>{
    await setupDB()
})

describe(chalk.bgWhite.black(' Users '), ()=>{

    describe('POST', ()=>{

        describe('/signup', ()=>{

            it('Should create user receiving 201 status code ', async ()=>{

                await request.post('/signup')
                    .send({
                        username: 'nicolaskkk',
                        email: 'nicolakks@gmail.com',
                        password: 'pastafrola123'
                    })
                    .expect(201)
            })
    
            it('Should get a 400 bad request status from sending empty body ', async ()=>{
    
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
    
            it('Should receive a jwt in the response after signing up ', async ()=>{
    
                const response = await request.post('/signup')
                    .send({
                        username:'richard',
                        email:'richard@gmail.com',
                        password:'tomenaguapanas'
                    })
                    .expect(201)
    
                expect(response.body.token).toBeTruthy()
            })
        })

        describe('/login', ()=>{

            it('Should login an existing user', async ()=>{

                await request.post('/login')
                    .send({
                        email: mockUser.email,
                        password: mockUser.password
                    })
                    .expect(200)
            })

            it('Should return a 404 not found for searching a non existing user', async ()=>{

                await request.post('/login')
                    .send({
                        email: 'usuarionoregis@gmail.com',
                        password: 'pastafrola'
                    })
                    .expect(404)
            })
        })
    })

    describe('GET', ()=>{

        describe('/me', ()=>{

            it('Should get the users profile data if authorized', async ()=>{

                await request.get('/me')
                    .withCredentials()
                    //@ts-ignore
                    .set('Authorization', mockUser.tokens[0].token)
                    .expect(200)
            })

            it('Should not send data and should give a 401 status code if not authorized', async ()=>{

                await request.get('/me')
                    .withCredentials()
                    //@ts-ignore
                    .set('Authorization', '')
                    .expect(401)
            })
        })
    })

    describe('PATCH', ()=>{

        describe('/me', ()=>{

            it('Should update the user data and receive a 200 status', async ()=>{

                await request.patch('/me')
                    .send({
                        username:'tuvieja123'
                    })
                    .expect(200)
            })
        })
    })

})

afterAll(async()=>{
    await disconnect()
})