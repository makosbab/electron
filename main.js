const {app, BrowserWindow} = require('electron') 
const url = require('url') 
const path = require('path')  
var MongoClient = require('mongodb').MongoClient;
let win  

function createWindow() { 
   win = new BrowserWindow({width: 800, height: 600}) 
   win.loadURL(url.format ({ 
      pathname: path.join(__dirname, 'index.html'), 
      protocol: 'file:', 
      slashes: true 
   }));
   MongoClient.connect("mongodb://localhost:27017/testdb", function(err, client) {
      if(!err) {
          var db = client.db("testdb")  
          console.log("We are connected");
          var collection = db.collection('monsters');
          var oneMonster = collection.findOne({"name" : "Aboleth"}, function(err, result){
              console.log(result);
          });
          
      }
      });
}  

app.on('ready', createWindow) 