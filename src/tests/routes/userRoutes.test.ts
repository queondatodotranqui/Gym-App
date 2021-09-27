import { app } from '../../main'
import * as supertest from 'supertest'
import { disconnect } from 'mongoose'

const request = supertest(app)

describe('First suite', ()=>{

    it('Should test get(\'/\') endpoint', async ()=>{

        const response = await request.get('/')

        expect(response.body.msg).toBe('Success')
    })
})

afterAll(async()=>{
    await disconnect()
})