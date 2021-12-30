const mysql = require('../shared/connect');

exports.getStudent = async (req,res,next) => {
    mysql.connection.query("Select * from student", (err, result)=> {
        if(err) res.status(500).send({msg: err})
        res.send(result)
    })
}

exports.createStudent = async (req,res,next) => {
    const query = `Insert into student (Name, Email, Address, days_present, mark) values ('${req.body.name}', '${req.body.email}', '${req.body.address}', '${req.body.daysPresent}', '${req.body.mark}')`
    mysql.connection.query(query, (err, result)=> {
        if(err) res.status(500).send({msg: err})
        res.send(result)
    })
}

