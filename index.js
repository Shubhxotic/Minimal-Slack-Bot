var axios= require("axios");
var Slackbot= require("slackbots");

var bot= new Slackbot({
    token: "<Your-Token>",
    name: "Joke Bot"
})

bot.on('start', function(){
    var params= {
        icon_emoji : ":laughing:"
    };
    bot.postMessageToChannel('temp',"Hey! Want to hear some joke? Type @JokeBot 'tell me a joke' or 'chucknorris' ",params);
    // bot.postMessageToUser("shubham97","Hey! Want to hear some joke?",params);
})

bot.on("error" , (err) => { console.log(err); });

bot.on("message", data => {
    if(data.type!="message"){
        return;
    }
    // console.log(data);
    handleMessage(data.text);
});

function handleMessage(msg){
    console.log("Message == ",msg);
    if(msg.includes(' chucknorris') || msg.includes(' Chuck Norris')){
        axios.get("http://api.icndb.com/jokes/random").then(function(res){
            console.log(res.data.value.joke);
            bot.postMessageToUser("@shubham97", res.data.value.joke).then(function(d){
                console.log(d);
            });
            var params = {
                icon_emoji : ":sad:"
            }
            bot.postMessageToChannel("temp",res.data.value.joke,params);
        })
    }
    else if(msg.includes(' tell me a joke')){
        axios.get("http://api.yomomma.info/").then(function(res){
            console.log(res.data.joke);
            bot.postMessageToUser("@shubham97", res.data.joke).then(function(d){
                console.log(d);
            });
            var params = {
                icon_emoji : ":laughing:"
            }
            bot.postMessageToChannel("temp","Fun Fact: "+res.data.joke,params);
        })
    }
}
