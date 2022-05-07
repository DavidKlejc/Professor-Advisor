let mysql = require('mysql');
let config = require('./config.js');

let connection = mysql.createConnection(config);

let getData = (professorName, course) => {
    let sqlRequest = `SELECT Rating FROM ISQ_DATA WHERE ProfessorName=` + professorName + ` AND Course=` + course;
    return sqlRequest;
}
