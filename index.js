import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from 'url';

const app = express ();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended : true})); 
app.use(express.static("public"));

function dateGen() {//date generator
    let weekdays = ["Sunday", "Monday", "Tuesday", 'Wednesday', "Thursday","Friday","Saturday"];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const d = new Date();
    let year=d.getFullYear();
    let month=months[d.getMonth() + 1];
    let date=d.getDate();
    let day=weekdays[d.getDay()];
    return (day+", "+ date+" "+month+" "+year);
}

let newItems = [];

app.get("/", (req, res) => {
    res.render("index.ejs", {
        displayDate: dateGen(),
        newListItem: newItems,
    });
});

app.post("/",(req,res) => {
    let newItem = req.body.newItem;
    newItems.push(newItem);
    res.redirect("/");
})

app.post("/delete", (req,res) => {
    if(req.body.delTask) {
       const index =  newItems.indexOf(req.body.delTask);
       if(index > -1) {
            newItems.splice(index,1);
       }
    }
    res.redirect("/");
});

app.get("/calendar", (req,res) => {
    res.render("calendar.ejs");
})

app.listen (port, () => {
    console.log(`Listening on server ${port}`);
})



