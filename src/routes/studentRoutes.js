import {addStudent, getStudent, getStudentById, updateStudent, deleteStudent} from "../controllers/studentController.js"

const routes = (app)=>{
    app.route("/student")
        .get((req, res, next)=>{
        next()
        }, getStudent)
        .post(addStudent)
    app.route("/student/:studentId")
        .get(getStudentById)
        .put(updateStudent)
        .delete(deleteStudent)
}

export default routes