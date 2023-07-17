const request = require('supertest');
const app = require('./App')
const { getStudents, createDetails, getStudentsById, getGood, getAverage, getExcellence, deleteById } = require('./operation')
const sequelize = require('./db-connect')

describe('Student Details Database', () => {
    test("Handling error on /getStudents", () => {
        return getStudents().catch((error) => {
            expect(error).toMatch("Error")
        })
    })

    test('database connectivity',()=>{
        return sequelize.catch((error) => {
            expect(error).toMatch("error")
        })
    })

    test('To test the Catch block for createDetails function', async () => {
        await request(app).post('/create').send({
            firstname: "bruce",
            lname: "wayne",
            marks: {
                tamil: 90,
                english: 0,
                maths: 100
            }
        })
        return createDetails().catch((error) => {
            expect(error).toMatch("error")
        })
    })

    test('To test the Catch block for getStudentsById function', async () => {
        await request(app).post('/getOneStudent').send({
            firstname: "bruce"
        })
        return getStudentsById().catch((error) => {
            expect(error).toMatch("error")
        })
    })

    test('To test the Catch block for updateMarks function', async () => {
        await request(app).post('/update-marks').send({
            firstname: "bruce"
        })
        return getStudentsById().catch((error) => {
            expect(error).toMatch("error")
        })
    })

    test('To test the Catch block for deleteById function', async () => {
        await request(app).delete('/deleteById').send({
        })
        return deleteById().catch((error) => {
            expect(error).toMatch("Error")
        })
    })

    test("Handling error on /getGood", () => {
        return getGood().catch((error) => {
            expect(error).toMatch("Error")
        })
    })
  })