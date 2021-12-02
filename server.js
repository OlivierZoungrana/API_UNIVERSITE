import express from "express"
import routes from "./src/routes/studentRoutes.js"
import mongoose from "mongoose"
import bodyParser from "body-parser"
const app = express();
const PORT = 8082


mongoose.Promise = global.Promise

mongoose.connect('mongodb+srv://olivier:olive@cluster0.to70a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{ useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  routes(app)







app.get("/", (req, res)=>
res.send("Bonjour à tous")
)
app.listen(PORT, (req, res)=>
console.log(`vous etes bien connecté au port ${PORT}`)
)

