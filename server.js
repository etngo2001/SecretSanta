const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const { name } = require("ejs");
const fs = require("fs");
var http = require("http");

const PORT = 8080;
// const HOST = '0.0.0.0';
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
  console.log("rendering index page");
});
app.post("/", (req, res) => {
  res.render("index");
  console.log("rendering index page");
});

app.post("/SSForm", (req, res) => {
  if (req.body.agreedge) {
    //checks to see if user is able to move onto the form page
    res.render("SSForm");
    console.log("rendering SSForm page");
  }
  res.status(204).send(); //keeps user on current page
});

app.post("/searchGiftee", (req, res) => {
  //checks to see if user is able to move onto the view searchGiftee page
  if (req.body.agreedge) {
    if (new Date() < new Date("2023-11-24")) {
      res.render("time-gate");
    } else {
      // read the json file and collect the names
      fs.readFile("SSList.json", (error, data) => {
        if (error) {
          console.log(error);
          return;
        }
        let list = JSON.parse(data);
        let names = list.map((entry) => entry.name);
        console.log(names);
        // send that object over to searchGiftee
        res.render("searchGiftee", { data: names });
        console.log("rendering searchGiftee page");
      });
    }
  } else {
    res.status(204).send(); //keeps user on current page
  }
});

app.get("/searchGiftee", (req, res) => {
    if (new Date() < new Date("2023-11-24")) {
        res.render("time-gate");
      } else {
        // read the json file and collect the names
        fs.readFile("SSList.json", (error, data) => {
          if (error) {
            console.log(error);
            return;
          }
          let list = JSON.parse(data);
          let names = list.map((entry) => entry.name);
          // send that object over to searchGiftee
          res.render("searchGiftee", { data: names });
          console.log("rendering searchGiftee page");
        });
      }
})

app.post("/SSLookup", (req, res) => {
    //do lookup. if found, else return to the page
    let match = new Boolean(false);
    fs.readFile("SSList.json", (error, data) => {
        if (error) {
          console.log(error);
          return;
        }
        let JSONlist = JSON.parse(data);

        for(let i = 0; i < JSONlist.length; i++) {
            if(JSONlist[i].name == req.body.user && JSONlist[i].key == req.body.key) {
                match = new Boolean(true);
                console.log("Match found")
                break;
            }
        }
      });
    if(match) {
        res.render("displayGiftee");
    } else {
        //if not, redirect to searchGiftee
        res.redirect("/searchGiftee?=keyFound" + match);
    }
    
})

app.post("/submit-list", (req, res) => {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const keyLength = 5;

  let key = "";
  if (req.body.key) {
    key = req.body.key;
  } else {
    for (let i = 0; i < keyLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      key += characters.charAt(randomIndex);
    }
  }

  let newData = {
    name: req.body.name,
    origin: req.body.origin,
    key: key,
    wishlist: {
      wish1: req.body.wish1,
      wish2: req.body.wish2,
      wish3: req.body.wish3,
    },
  };
  console.log(newData);
  fs.readFile("SSList.json", (error, data) => {
    if (error) {
      console.log(error);
      return;
    }
    let newList = JSON.parse(data);
    newList.push(newData);

    fs.writeFile("SSList.json", JSON.stringify(newList), (err) => {
      if (err) {
        console.log("Failed to write updated data to file");
        return;
      }
      console.log("Updated file successfully");

      //   res.render("confirmation", { key: key });
      res.redirect("/confirmation?key=" + key);
      console.log(
        "rendering form submission confirmation page and key display"
      );
    });
  });
});

app.get("/confirmation", (req, res) => {
  res.render("confirmation", { key: req.query.key });
});

//TODO:
// MOVE TO SS FORM
// MOVE TO VIEW YOUR GIFTEE
// FUNCTION FOR KEY CHECK/PASSWORD CHECK ON THE VIEW YOUR GIFTEE
// MOVE TO GUESS YOUR SS FORM
// FUNCTION FOR KEY CHECK/PASSWORD CHECK WHEN GUESSING YOUR SS
// FORM HANDLING - WHEN THEY SUBMIT THEIR FORM, TAKE THE DATA IN AND SAVE IT TO THE JSON
// CREATE A PAGE THAT CONFIRMS THAT THE LIST HAS BEEN received and present the user their key

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});
