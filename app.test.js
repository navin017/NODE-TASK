const request = require('supertest');
const app = require('./App')


describe('Student Details Database', () => {
    test('Should get the students details from the database', async () => {
        await request(app).get('/getStudents').send({

            "data": [
                {
                    "id": 108,
                    "first_name": "kavin",
                    "last_name": "elango",
                    "Marks": []
                },
            ]
        }).expect(200)
    })

    test('Should Show the error message if there is no datas to fetch', async () => {
        await request(app).get('/getStudents').send({
        }).expect({
            message: "There is no datas to fetch from the databases",
            data: null
        })
    })

    test("Check if using the proper URL", async () => {
        await request(app).get('/getStudent').send({
        }).expect(404)
    })


    //To test the "/create"
    test('should navigate to /create with input data', async () => {
        await request(app).post('/create').send({
            fname: "bruce",
            lname: "wayne",
            marks: {
                tamil: 90,
                english: 0,
                maths: 100
            }
        }).expect(201, {
            student: { fname: 'bruce', lname: 'wayne' },
            marks: { tamil: 90, english: 0, maths: 100 },
            Message: 'Student name with their marks created successfully'
        })
    })

    test("Check if using the proper URL", async () => {
        await request(app).get('/creat').send({
        }).expect(404)
    })

    test('should navigate to /create without input data', async () => {
        await request(app).post('/create').send({
        }).expect({ "Message": "Please give the datas to create the student details" })
    })
    test('should navigate to /create without firstName', async () => {
        await request(app).post('/create').send({
            lname: "wayne",
            marks: {
                tamil: 90,
                english: 0,
                maths: 100
            }
        }).expect({ "Message": "The firstName of the student cannot be empty" })
    })

    test('should navigate to /create without lastName', async () => {
        await request(app).post('/create').send({
            fname: "wayne",
            marks: {
                tamil: 90,
                english: 0,
                maths: 100
            }
        }).expect({ "Message": "The Last Name of the student cannot be empty" })
    })


    test('should navigate to /create without firstName and lastName', async () => {
        await request(app).post('/create').send({

            marks: {
                tamil: 90,
                english: 0,
                maths: 100
            }
        }).expect({ "Message": "First Name and Last Name of the student must be filled" })
    })
    test('should navigate to /create without marks', async () => {
        await request(app).post('/create').send({
            fname: "bruce",
            lname: "wayne",
        }).expect({ "Message": "The Marks of the student cannot be empty" })
    })


    //To Test the getOneStudent Function 



    test('should navigate to /getOneStudent with input data', async () => {
        await request(app).get('/getOneStudent').send({
            id: 283
        }).expect({
            "data": {
                "id": 283,
                "first_name": "naveen",
                "last_name": "elango",
                "Marks": [
                    {
                        "ID": 92,
                        "student_id": 283,
                        "tamil": 100,
                        "english": 10,
                        "maths": 100
                    }
                ]
            },
            "message": "Student name fetched succefully",
            "code": 200
        })
    })

    test('should navigate to /getOneStudent withOut input data', async () => {
        await request(app).get('/getOneStudent').send({

        }).expect({ Message: "There is no student ID to get that students details" })
    })

    //To Test the getGood function 

    test('/good if there is data with good marks', async () => {
        await request(app).get('/good').send({}).expect({
            "data": {
                "id": 489,
                "first_name": "naveen",
                "last_name": "elango",
                "Mark": {
                    "ID": 198,
                    "student_id": 489,
                    "tamil": 100,
                    "english": 100,
                    "maths": 100
                }
            },
            "message": "Student name fetched succefully",
            "code": 200
        })
    })

    test(' /good if there no data with good marks', async () => {
        await request(app).get('/good').send({}).expect({
            message: "There is no data to fetch, as per your requirement ",
            data: null,
        })
    })


    //To Test the getGood function 

    test('/avg if there is data with good marks', async () => {
        await request(app).get('/avg').send({}).expect({
            "data": {
                "id": 284,
                "first_name": "bruce",
                "last_name": "wayne",
                "Mark": {
                    "ID": 93,
                    "student_id": 284,
                    "tamil": 90,
                    "english": 0,
                    "maths": 100
                }
            },
            "message": "Student name fetched succefully",
            "code": 200

        })
    })
    test('/avg if there is data withOut average marks', async () => {
        await request(app).get('/avg').send({}).expect({
            message: "There is no student with marks, as per your requirement ",
            data: null,
        })
    })

    //To Test the getExcellence function 
    test('/exl if there is data with good marks', async () => {
        await request(app).get('/exl').send({}).expect({

            "data": [
                {
                    "student_id": 426,
                    "total_mark": 300,
                    "student": {
                        "id": 426,
                        "first_name": "naveen",
                        "last_name": "elango"
                    }
                }
            ],
            "message": "Students name with marks greater than 280 fetched successfully",
            "code": 200

        })
    })

    test('/exl if there is data without good marks', async () => {
        await request(app).get('/exl').send({}).expect({

            code: 500,
            message: 'Error occurred while fetching Students name ',
            data: null
        })

    })



    //To Test the updateMarks function
    test('should navigate to /updateMarks with input data', async () => {
        await request(app).post('/update-marks').send({
            "firstName": "naveen",
            "updatedMarks": {
                "tamil": 100
            }
        }).expect({ "message": "Marks updated successfully" })
    })
    test('should navigate to /updateMarks with input data', async () => {
        await request(app).post('/update-marks').send({
            "updatedMarks": {
                "tamil": 100
            }
        }).expect({ Message: "Please provide the first Name of the student to update the marks" })
    })
    test('should navigate to /updateMarks with input data', async () => {
        await request(app).post('/update-marks').send({
            "firstName": "naveen",
        }).expect({ Message: "Please provide the marks of the student to update the marks" })
    })
    test('should navigate to /updateMarks with input data', async () => {
        await request(app).post('/update-marks').send({

        }).expect({ Message: "The field is empty" })
    })

    //To Test the deleteById function 


    test('should navigate to /deleteById with input data', async () => {
        await request(app).delete('/deleteById').send({
            id: 123
        }).expect({
            "code": 200,
            "DeleteStatus": 1,
            "message": "Student's details has been Deleted successfully"
        })
    })

    test('should navigate to /deleteById without input data', async () => {
        await request(app).delete('/deleteById').send({

        }).expect({
            "code": 500,
            "message": "Please give the existing student's Id to delete"
        })
    })

})