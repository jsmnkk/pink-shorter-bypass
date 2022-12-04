const axios = require('axios');
const global_proxy = require("node-global-proxy").default;
const readline = require("readline-sync");

global_proxy.setConfig({
  http: "http://192.168.40.32:7071"
});
global_proxy.start();

async function x(url) {
        var url = readline.question("Linknya coyy : ");
        var res = (await axios.get(url)).request.socket._httpMessage.socket._httpMessage.res.responseUrl;
        console.log(res)
}
x()
