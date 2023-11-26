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

app.get("/admin", (req, res) => {
  res.render("admin");
  console.log("rendering admin page")
});

app.post("/runAlgorithm", (req, res) => {
  console.log("running algorithm")
  // read the json file and collect the names
  fs.readFile("Participants.json", (error, data) => {
    if (error) {
      console.log(error);
      return;
    }
    let list = JSON.parse(data);
    let names = list.map((entry) => entry.name);
    let families = list.map((entry) => entry.origin);
    console.log(names);
    console.log(families);
    const SSDic = names.reduce((acc, name, index) => {
      acc[name] = families[index];
      return acc;
    }, {});

    const shuffledNames = names.slice().sort(() => Math.random() - 0.5);

    while (names.some((secretSanta, index) => secretSanta === shuffledNames[index] || SSDic[secretSanta] === SSDic[shuffledNames[index]])) {
      shuffledNames.sort(() => Math.random() - 0.5);
    }

    const pairs = names.map((person, index) => ({ secretSanta: person, giftee: shuffledNames[index] }));

    fs.writeFile("SSList.json", JSON.stringify(pairs), (err) => {
      if (err) {
        console.log("Failed to write updated data to file");
        return;
      }
      console.log("Updated file successfully");
    });
  });
  console.log("algorithm complete")
  res.status(204).send(); //User stays on current page
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
      fs.readFile("Participants.json", (error, data) => {
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

app.post("/SSLookup", (req, res) => {
  //do lookup. if found, else return to the page
  let match = new Boolean(false);
  fs.readFile("Participants.json", (error, data) => {
    if (error) {
      console.log(error);
      return;
    }
    let participantList = JSON.parse(data);

    for (let i = 0; i < participantList.length; i++) {
      if (participantList[i].name === req.body.user && participantList[i].key === req.body.key) {
        fs.readFile("SSList.json", (error, data) => {
          if (error) {
            console.log(error);
            return;
          }

          let dataList = JSON.parse(data);

          dataList.forEach(function (secretSanta) {
            if (secretSanta.secretSanta === participantList[i].name) {
              console.log(secretSanta.giftee)
              let person = secretSanta.giftee;
              console.log(person);
              for (let j = 0; j < participantList.length; j++) {
                if (participantList[j].name === person) {
                  res.render("displayGiftee", { data: [participantList[j].name, participantList[j].wishlist] });
                }
              }
            }
          })
        })

        console.log("Match found")
        match = new Boolean(true)
        break;
      }
    }
  });
  if (!match) {
    res.redirect("/searchGiftee?=keyFound" + skip);
  }
});

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
  fs.readFile("Participants.json", (error, data) => {
    if (error) {
      console.log(error);
      return;
    }
    let newList = JSON.parse(data);
    newList.push(newData);

    fs.writeFile("Participants.json", JSON.stringify(newList), (err) => {
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


//redirects:
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
