const { Marks } = require('./db-details')
const { studentsDetails } = require('./db-details')
const { sequelize } = require('./db-connect')
const { Sequelize, DataTypes } = require('sequelize')


//To Get data of all the students
const getStudents = async () => {

    let result = await (studentsDetails).findAll({
        include: Marks,
    })
    return JSON.parse(JSON.stringify(result));

}

//To Get data of a particular the students

const getStudentsById = async (id) => {
    try {
        let result = await studentsDetails.findOne({
            where: { id },
            include: [Marks],
        })
        console.log(result, "^^^^^^^^^^^^")
        return JSON.parse(JSON.stringify(result));
    } catch (err) {
        console.log("Error..: ", err);
    }
}

//To Create a new student details into the database

const createDetails = async (fname, lname, marks) => {
    try {
        const student = await studentsDetails.create({
            first_name: fname,
            last_name: lname,
        });

        console.log("Student name stored successfully:", student.first_name);

        const newMarksData = await Marks.create({
            tamil: marks.tamil,
            english: marks.english,
            maths: marks.maths,
            student_id: student.id
        });
        console.log("Marks record created and associated with the student.");
        return JSON.parse(JSON.stringify(newMarksData));
    } catch (err) {
        console.log("Error occurred:", err);
    }
};

//To Update the mark of the existing student by using the first name of the student

const updateMarks = async (firstName, updatedMarks) => {
    try {
        const student = await studentsDetails.findOne({
            where: { first_name: firstName },
        });

        await Marks.update(updatedMarks, {
            where: { student_id: student.id },
        });
      
    } catch (err) {
        console.log("Error occurred:", err);
    }
}

//To Get the students who are all scored more than 250 marks

const getGood = async () => {

    const marks = await Marks.findAll({
        include: studentsDetails,
        attributes: [
            'student_id',
            [
                sequelize.literal('SUM(tamil) + SUM(english) + SUM(maths)'),
                'total_mark',
            ],
        ],
        group: 'student_id',
        having: sequelize.literal('total_mark >= 250'),
    });
    return JSON.parse(JSON.stringify(marks));
}

//To Get the students who are all scored more than 200 marks

const getAverage = async () => {

    const marks = await Marks.findAll({
        include: studentsDetails,
        attributes: [
            'student_id',
            [
                sequelize.literal('SUM(tamil) + SUM(english) + SUM(maths)'),
                'total_mark',
            ],
        ],
        group: 'student_id',
        having: sequelize.literal('total_mark >= 180 && total_mark < 250'),
    });
    return JSON.parse(JSON.stringify(marks));

};

//To Get the students who are all scored more than 280 marks
const getExcellence = async () => {

    const marks = await Marks.findAll({
        include: studentsDetails,
        attributes: [
            'student_id',
            [
                sequelize.literal('SUM(tamil) + SUM(english) + SUM(maths)'),
                'total_mark',
            ],
        ],
        group: 'student_id',
        having: sequelize.literal('total_mark >=280 '),
    });
    return JSON.parse(JSON.stringify(marks));

};

// To Delete the particular student by using their ID
const deleteById = async (id) => {
    try {
       let result = await studentsDetails.destroy({
            include: [
                {
                    model: studentsDetails,
                },
            ],
            where: { id: id },
        })
        return JSON.parse(JSON.stringify(result));
    } 
    catch (err) {
        console.log("Error.........", err)
    }
}

module.exports = {
    getStudents: getStudents,
    getStudentsById: getStudentsById,
    deleteById: deleteById,
    getGood: getGood,
    createDetails: createDetails,
    updateMarks: updateMarks,
    getAverage: getAverage,
    getExcellence: getExcellence
}
