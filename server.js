var express = require('express'); //import express framework
var mongodb = require('mongodb');
var mydb;
var pdb;

var app = express() //app is using the express framework
var uri = 'mongodb://chickenlittle:butter@ds255797.mlab.com:55797/population_db';
var mockDataList = [{
  id: 0,
  title: 'Landlord kicking us out without notice',
  text: 'Lorem Ipsum',
  tags: ['legal', 'property']
}, {
  id: 1,
  title: 'Partner is suing the company',
  text: 'Lorem Ipsum',
  tags: ['legal', 'lawsuits']
}];

var generalJSON = [];
var specializedJSON = [];

var cfenv = require("cfenv")//

var appEnv = cfenv.getAppEnv() 
// start the server on the given port and binding host, and print
// url to server when it starts

app.listen(appEnv.port, '0.0.0.0', function() {
    console.log("server starting on " + appEnv.url)
});
mongodb.MongoClient.connect(uri, function(err, db) {
  
  if(err) throw err;
  console.log("success");
  /*
   * First we'll add a few songs. Nothing is required to create the 
   * songs collection; it is created automatically when we insert.
   */
  mydb = db.db('population_db');
  pdb = mydb.collection('population_db');
   console.log("connect success!!!!");
   

   // Note that the insert method can take either an array or a dict.

  //  cs = pdb.find({}, { Classification : 3 }, function (err, data) {
  //   console.log("im here at 54");
  //   console.log("data being"+ data);
    
    
  // });
} );
app.get('/', function(req, res){
  console.log('CALLED')
  res.send('HI');//image should be a url
})
app.get('/api/UpdateQ', function(req, res){
  res.set("Access-Control-Allow-Origin", "*");
  console.log('CALLED update')
//oh damn
<<<<<<< HEAD

//Extract last 5 entries from individual_db
idb.find({}).limit(5).toArray(function (err, docs) {

  //Use child_process to run a Python script --> does inference based on last 5 entries in individual DB
  var spawn = require("child_process").spawn;
  var process = spawn('python', ['VitalsLSTM.py', 'infer', docs, 'model.json', 'model.h5']);

  //Listen for output from python script --> if output is not null, generate new DB entry
  process.stdout.on('data', function (data) {
    console.log('done')
    return res.json(data);
  }, this);
});

=======
>>>>>>> 72db8c041ef0d2ee93d37c357059e10e6688ddb7
pdb.find( {Classification:3}).limit(10).toArray(function(err, docs) {
  return res.json(docs)
}, this);

//ohohoh
  //res.send(tor);//image should be a url
})
app.get('/api/GetChannels', function(
  req, res){
  res.set("Access-Control-Allow-Origin", "*"); //cors
  var category = req.query.category;
  var general = ['Legal', 'Supply', 'Bill Management', 'Storage', 'Payments', 'Shift Management', 'Distribution', 'Project Management', 'Inventory'];
  var specialized = ['Salons / Barbershops', 'Restaurants', 'Florists', 'Bed n Breakfast', 'Meal to go', 'Music lessons', 'Tutoring']
  var images = ['https://static.pexels.com/photos/235988/pexels-photo-235988.jpeg', 'https://static.pexels.com/photos/158729/rock-pattern-background-texture-158729.jpeg',
        'https://static.pexels.com/photos/207277/pexels-photo-207277.jpeg', 'https://static.pexels.com/photos/55813/geranium-wave-water-rings-55813.jpeg',
      'https://static.pexels.com/photos/479333/pexels-photo-479333.jpeg', 'https://static.pexels.com/photos/109364/pexels-photo-109364.jpeg',
    'https://static.pexels.com/photos/96426/pexels-photo-96426.jpeg', 'https://static.pexels.com/photos/97909/pexels-photo-97909.jpeg', 'https://static.pexels.com/photos/115526/pexels-photo-115526.jpeg']
console.log(general.length);
console.log(specialized.length);

  for(var i = 0; i < general.length; i++)
    generalJSON.push({channelname: general[i], id: i, imagelink: images[i]})

  for(var i = 0; i < specialized.length; i++)
    specializedJSON.push({channelname: specialized[i], id: i, imagelink: images[i]})

  if(category == 'General'){
    console.log('general')
    res.json(generalJSON);
    }
  else if(category == 'Specialized'){
    console.log('specialized');
    res.json(specializedJSON);
    }

});

app.get('/api/GetListOfPost', function(req, res){
  res.set("Access-Control-Allow-Origin", "*")  //doenst send anything
  var channel = req.query.channel; //dont need this there are diff qurery is for get and body is for post

  if(channel == 'Legal')
    res.json(mockDataList)  //transform and then send

});

app.get('/api/GetPost', function(req, res){
  res.set("Access-Control-Allow-Origin", "*")
  for(var i = 0; i < mockDataList; i++)
    if(mockDataList[i].id == req.query.postid)
      res.send(mockDataList[i]);
});

app.get('/api/GetUser', function(req, res){
  res.set("Access-Control-Allow-Origin", "*")
  res.json(
    {
      name: 'Ava Lovelace',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus egestas facilisis pulvinar. Mauris felis dolor, maximus eget odio nec, ullamcorper commodo nulla. Phasellus fringilla sem eu enim ullamcorper dignissim. Sed auctor erat quis justo elementum pharetra eu a est. Duis ac nisi nisl. Sed ornare leo sed eros iaculis hendrerit. Fusce posuere mauris metus, non mattis dolor suscipit et. Phasellus eu eleifend mauris. Cras eu metus sit amet erat convallis blandit a in nisi. Cras dapibus diam ut ante convallis feugiat.',
      tags: ['Barber', 'Garage', 'Brewery'],
      communities: [{communityname: 'Salons / Barbershops', id: 0}, {communityname: 'Restaurants', id: 1}, {communityname: 'Garages', id: 2}],
      content: [{title: 'Lorem', main: 'Lorem Ipsum'},{title: 'Lorem', main: 'Lorem Ipsum'},{title: 'Lorem', main: 'Lorem Ipsum'}]
    }
  )
});
