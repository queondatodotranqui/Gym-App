const { getString, getFalse, getNumber } = require('../src/strings');

describe('First suite', ()=>{

    it('This should run', ()=>{

        const data = getString()
        expect(data).toBeTruthy()
    })

    it('This should return string nothing', ()=>{

        const data = getFalse()
        expect(data).toEqual('nothing')
    })

    it('This should return a number different', ()=>{

        const data = getNumber(2)
        expect(data).not.toEqual(2)
    })
})