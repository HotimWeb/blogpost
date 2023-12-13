import express from "express";
import bodyParser from "body-parser";
import {dirname} from "path";
import { fileURLToPath } from "url";
import path from "path";
import { name } from "ejs";
const _dirname = dirname(fileURLToPath(import.meta.url));

const port = 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set('view engine', 'ejs');
app.set('views', path.join(_dirname, 'views'));

// create a variable making userAuthorized false
var userAuthorized = false;
// create your own middleware

function passwordCheck(req, res, next){
    let newUser = [];
    let newUserPassword = [];
    const newName = req.body["new-name"];
    const newPassword = req.body["new-password"];
    newUser.push(newName);
    newUserPassword.push(newPassword);
    if(newUser.includes(newName) && newUserPassword.includes(newPassword)){
        userAuthorized = true;
    }
    else{
        userAuthorized = false;
    }
    next();
}
// call the function
app.use(passwordCheck);

app.get("/", (req, res) =>{
    res.render("index.ejs", { 
        imageUrl: '/images/logo',
    });
});

app.post("/login", (req, res) =>{
    res.render("login.ejs");
});

// creating a password

app.post("/create", (req, res)=>{
    if(userAuthorized){
        // res.render(_dirname + "/views/secret.ejs");
        res.render(_dirname+ "/views/login");
    }else{
        res.render("index.ejs");
    }
});
// const name = req.body["new-name"];
app.post("/submit", (req, res)=>{
    if(userAuthorized){
        console.log("hey there");
        var nameOfUser = req.body["new-name"];
        res.render(_dirname + "/views/secret.ejs");
    }
    else{
        res.render("index.ejs");
    }
});
app.post("/post", (req, res)=>{

})

app.listen(port, ()=>{
    console.log(`website displayin at ${port}`); 
});