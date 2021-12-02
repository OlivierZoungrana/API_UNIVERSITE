import mongoose from "mongoose"
import bcrypt, {hash} from "bcrypt"
import {studentSchema} from '../models/studentModel.js'
const minPassword = 8 
const EMAIL_REGEX= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX= /^(?=.*\d).{4,8}$/;
const student = mongoose.model("student", studentSchema)

export const addStudent = (req, res)=>{
    let password = req.body.password
    let email = req.body.email
    let name = req.body.name
    if(password.length <=minPassword || password.length >12){
        return res.status(400).json({'error': 'password invalid doit etre compris entre 8 et 12 caractere'})
    }
    if(email==null||name==null||password==null){
        return res.status(400).json({'error': 'vous avez oublié des paramètres'})
    }

    if(!EMAIL_REGEX.test(email)){
        return res.status(400).json({'error': 'votre email est incorrecte'})
    }

    if(!PASSWORD_REGEX.test(password)){
        return res.status(400).json({'error': 'password invalide'})
    }
    bcrypt.hash(req.body.password,10)
    .then(hash=>{
        const newStudent = new student({
            name: req.body.name,
            prenom: req.body.prenom,
            email: req.body.email,
            password:hash
        })

        newStudent.save()
        .then(()=>res.status(200).json({message: 'student crée'}))
        .catch(error=>res.status(400).json({error}))
    })
    .catch(error=>res.status(500).json({error}))
}

export const getStudent = (req, res)=>{

    student.find((err, student)=>{
        if(err){
            res.send(err)
        }
        res.json(student)
    })
}

export const getStudentById= (req,res)=>{

    student.findById(req.params.studentId,(err,student) =>{
        if(err){
            res.send(err)
        }
        res.json(student)
    })
}

export const updateStudent= (req, res)=>{

    student.findByIdAndUpdate({_id: req.params.studentId}, req.body, {new: true}, (err, student)=>{
        if(err){
            res.send(err)
        }
        res.json(student)
    })
}

export const deleteStudent = (req, res)=>{


    student.remove({_id:req.params.studentId}, req.body, (err, student)=>{

        if(err){
            res.send(err)
        }
        res.json(student)
        
    })
}