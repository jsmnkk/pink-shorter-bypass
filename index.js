const express = require('express')
const app = express()
const axios = require('axios')
const bodyParser = require('body-parser');
const fs = require('fs')


app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded());

app.get('/', async function (req, res) {
  try {
    res.render(__dirname + "/views/index.html", {
      result: false,
      link: ""
    });
  } catch (error) {
    console.log(error)
    res.render(__dirname + "/views/error.html")
  }
})

app.post('/', async function (req, res) {
  try {
    var url;
    if (/(http|https):\/\/(.*)/.test(req.body.link)) {
      url = req.body.link.match(/(https|http):\/\/pink.my.id\/(.*)/)[0]
    } else {
      url = 'https://'.concat(req.body.link.match(/pink.my.id\/(.*)/)[0])
    }
    var result = (await axios.get(url)).request.socket._httpMessage.socket._httpMessage.res.responseUrl
    //console.log('di sini ngepost')
    res.render(__dirname + "/views/index.html", {
      result: true,
      link: result
    });
    //res.send(result)
    console.log('Requested link : ' + (req.body.link) + '\nBypass Result : ' + result)
  } catch (error) {
    if (error.code === 'ERR_BAD_REQUEST') {
      var result = error.request.socket._httpMessage.socket._httpMessage.res.responseUrl
      res.render(__dirname + "/views/index.html", {
        result: true,
        link: result
      });
      console.log('Requested link : ' + (req.body.link) + '\nBypass Result : ' + result)
    } else {
      console.log(error)
      res.render(__dirname + "/views/error.html")
    }
  }
})


app.engine('html', require('ejs').renderFile);
app.use('/static', express.static('public'))

const port = process.env.PORT || 3000
app.listen(port,
  () => console.log("Listening on : " + port));