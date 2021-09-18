const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
app.use(bodyParser());

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "universitydatabase"
});

connection.connect((err) => {
    if (err) throw err;
    console.log("Connected successfully to MySql server")
});


app.get("/", (req, res) => {
    res.send("Hello From The Server");
})


function validateFName(fname) {
    let errors = [];
    if (fname.length == 0) {
        errors.push("First Name Is Null");
    }

    if (fname.length > 50) {
        errors.push("First Name Length Can Not Exceed 50 Characters.");
    }

    return errors;
}

function validateLName(lname) {
    let errors = [];
    if (lname.length == 0) {
        errors.push("Last Name Is Null");
    }

    if (lname.length > 50) {
        errors.push("Last Name Length Can Not Exceed 50 Characters.");
    }

    return errors;
}

function validateBirthDate(date) {
    let errors = [];
    if (date === undefined || date === "") {
        errors.push("Birth Date is Null");
    }

    return errors;
}

function validateContactNo(contactno) {
    let errors = [];

    // check whether contact no is empty or not
    if (contactno.length == 0) {
        errors.push("Contact Number Is Null");
    }

    // cheaks whether contact no length is less then 10 character
    if (contactno.length < 10) {
        errors.push("Contact Number Must Be Of 10 Digits");
    }

    // checks whether contact no length is more then 10 character
    if (contactno.length > 10) {
        errors.push("Contact No Must Be of 10 Digits");
    }

    // Using regular expression check whether contactno is only containing digits or not
    if (!(/[0-9]/g.test(contactno))) {
        errors.push("Contact Number Must Contain Digits Only");
    }

    return errors;
}

function validateEmail(email) {
    let errors = [];

    // checks whether email is empty or not
    if (email.length == 0) {
        errors.push("Email Is Null");
    }

    // checks whether email length is more then 100 or not
    if (email.length > 100) {
        errors.push("Email Can not exceed 100 Character");
    }


    // checks whether email is valid or not usinf regular expression
    if (!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g.test(email))) {
        errors.push("Email Is Not Valid");
    }

    return errors;
}

function validateSemester(semester) {
    let errors = [];
    if (semester.length == 0) {
        errors.push("Semester Is Null");
    }

    if (semester > 8) {
        errors.push("Invalid Semester");
    }

    return errors;
}

function validateCourse(course) {
    let errors = [];
    if (course !== "B.Tech Computer Engineering" && course !== "B.Tech Information Technology") {
        errors.push("Invalid Course");
    }
    return errors;
}


app.post("/api/student", (req, res) => {
    console.log("Requesey..	");
    let fname = req.body.fname;
    let lname = req.body.lname;
    let email = req.body.email;
    let contactno = req.body.contactno;
    let birthdate = req.body.birthdate;
    let semester = req.body.semester;
    let course = req.body.course;

    let errFName = validateFName(fname); // will validate first name
    let errLName = validateLName(lname); // will validate last name
    let errEmail = validateEmail(email); // will validate email
    let errContactNo = validateContactNo(contactno); // will validate contact no
    let errBirthDate = validateBirthDate(birthdate); // will validate birthdate
    let errSemester = validateSemester(semester); // will validate semester
    let errCourse = validateCourse(course); // will validate course

    if (errFName.length || errLName.length || errEmail.length || errContactNo.length || errBirthDate.length || errSemester.length || errCourse.length) {
        res.json(200, {
            msg: "Validation Failed",
            errors: {
                fname: errFName,
                lname: errLName,
                email: errEmail,
                contactno: errContactNo,
                birthdate: errBirthDate,
                semester: errSemester,
                course: errCourse
            }
        });
    }
    else {
        let query = `INSERT INTO STUDENTS (fname, lname, birthdate, contactno, email, semester, course) VALUES ('${fname}', '${lname}', '${birthdate}', '${contactno}', '${email}', '${semester}', '${course}')`;

        connection.query(query, (err, result) => {
            if (err) {
                // status code 500 is for Internal Server Error
                res.json(500, {
                    msg: "Some thing went wrong please try again"
                })
            }

            // if we reach till this point means record is inserted succesfully


            res.json(200, {
                msg: "Student Registered Succesfully",
            })
        })

    }
});


app.get("/api/students", (req, res) => {
    let query = "SELECT * FROM STUDENTS";

    connection.query(query, (err, result) => {
        if (err) {
            res.json(500, {
                msg: "Internal Server Error Please Try Again"
            })
        }

        res.send(200, {
            msg: "All the data fetched successfully",
            data: result
        })
    })
})

app.listen(3000, () => {
    console.log("Server started ...");
});