const { app, BrowserWindow } = require('electron')
const url = require('url')
const path = require('path')
var MongoClient = require('mongodb').MongoClient;
const MongoDbUrl = "mongodb://localhost:27017/testdb"
let win;
var db = MongoClient.connect(MongoDbUrl, { useNewUrlParser: true });

function createWindow() {
   win = new BrowserWindow({ width: 800, height: 600 })
   win.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
   }));

   // const db = await MongoClient.connect(MongoDbUrl)
   // try {
   //       var collection = await db.collection('monsters');
   //       var oneMonster = collection.findOne({"name" : "Aboleth"}, function(err, result){
   //       console.log(result);
   //       });
   // } catch (error) {

   // }

   var attrMod = (attr) => Math.floor((attr - 10) / 2);

   function retrieveCreature(cName, callback) {
      db.then(
         client => {
            const db = client.db("testdb");
            console.log("We are connected!");
            const collMonsters = db.collection('monsters');

            collMonsters.findOne({ "name": cName }, (err, creature) => {
               callback(creature);
            });
         }
      )
   }


   var retrieveImprov = (cType, callback) => {

      db.then(
         client => {
            const db = client.db("testdb");
            const collImprovs = db.collection('improvement');

            collImprovs.findOne({ "type": cType }, (err, impr) => {

               callback(impr);
            });
         }
      );
   };

   retrieveCreature("Aboleth", (creature) => {
      creature.hitPoints = creature.hitDice.avgHitPoints;
      creature.strMod = () => attrMod(creature.str);
      creature.dexMod = () => attrMod(creature.dex);
      creature.conMod = () => attrMod(creature.con);
      creature.intMod = () => attrMod(creature.int);
      creature.wisMod = () => attrMod(creature.wis);
      creature.charMod = () => attrMod(creature.char);
      //    creature.baseAttackModifier = function(){
      //       let lookup = creatureImprovement.find(function(impr){
      //           return impr.type == creature.type;
      //       });
      //       return Math.floor(creature.hitDice.numOfHitDice * lookup.attackBonus);
      //   }
      //    creature.attackModifierMelee = creature.baseAttackModifier() + creature.abilities[0].modifier + sizeModifiers[5].sizeModifier;
      console.log(creature.strMod());
   });


   retrieveImprov("Élőhalott", improv => {
      console.log(improv);
   });

}

app.on('ready', createWindow) 