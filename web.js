const fetch = require('node-fetch')


fetch(
    "https://gtduit.com/", {
        method: "POST",
        credentials: "same-origin",
        body: new URLSearchParams({
            clickarlink: 'meruchannn',
            referer: ''
        })
    }
).then(x => console.log(x))