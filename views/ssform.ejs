const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const { name } = require("ejs");
const fs = require("fs");
var http = require("http");

const PORT = 3000;
// const HOST = '0.0.0.0';
const app = express();

const adminPass = "Ng0SecretS4nta23";

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", (req, res) => {
  res.render("index");
});

app.get("/admin", (req, res) => {
  res.render("admin");
});

app.post("/runAlgorithm", (req, res) => {
  if (req.body.adminPassword === adminPass) {
    // read the json file and collect the names
    fs.readFile("Participants.json", (error, data) => {
      if (error) {
        console.log(error);
        return;
      }
      let list = JSON.parse(data);
      let names = list.map((entry) => entry.name);
      let families = list.map((entry) => entry.origin);
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
      });
    });
    res.redirect("/admin?=Complete");
  } else {
    res.redirect("/admin?=wrongPass");
  }


});

app.post("/ssform", (req, res) => {
  if (req.body.agreedge) {
    //checks to see if user is able to move onto the form page
    res.render("ssform");
  }
  res.status(204).send(); //keeps user on current page
});

app.post("/searchGiftee", (req, res) => {
  //checks to see if user is able to move onto the view searchGiftee page
  if (req.body.agreedge) {
    if (new Date() < new Date("2025-12-13")) {
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
        // send that object over to searchGiftee
        res.render("searchGiftee", { data: names });
      });
    }
  } else {
    res.status(204).send(); //keeps user on current page
  }
});

app.post("/sslookup", (req, res) => {
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
              let person = secretSanta.giftee;
              for (let j = 0; j < participantList.length; j++) {
                if (participantList[j].name === person) {
                  res.render("displayGiftee", { data: [participantList[j].name, participantList[j].wishlist] });
                }
              }
            }
          })
        })
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

      //   res.render("confirmation", { key: key });
      res.redirect("/confirmation?key=" + key);
    });
  });
});

app.get("/confirmation", (req, res) => {
  res.render("confirmation", { key: req.query.key });
});

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});
