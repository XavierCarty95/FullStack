const MongoClient = require('mongodb').MongoClient;
const mongoose = require("mongoose");



// Connection URL
mongoose.connect('mongodb://localhost/fruitsDB',{ useNewUrlParser: true });

const fruitsSchema = new mongoose.Schema({
name : {
  type : String,
  required: [true, "Please check your data entry no name specified"]
},
rating: {
  type : Number,
  min: 1,
  max: 10
},
review: String


});



const Fruit = mongoose.model("Fruit" , fruitsSchema);

const fruit = new Fruit ({

  rating : 34,
  review : "Pretty solid fruit"
})
fruit.save();

const banana = new Fruit ({
  name: "Banana",
  rating: 5,
  review: "I dont like bananas that much"
})
const orange  = new Fruit ({
  name: "Orange",
  rating: 7,
  review: "I dont fuck with oranges that much"
});
const kiwi = new Fruit ({
  name: "Kiwi",
  rating: 2,
  review: "I dont like kiwis that much"
})


Fruit.find(function(err, fruits){
  if (err) {
    console.log(err)
  } else {


      console.log(fruits);
    }

})

Fruit.deleteOne({ name :"Kiwi"}, function(err){
  if (err){
    console.log(err)
  } else {
    console.log("Successfully deleted the document")
  }
})


// Fruit.insertMany([banana, orange , kiwi], function(err){
//   if (err) {
//     console.log(err)
//   } else {
//     console.log("Successfully saved all fruits to the db");
//   }
// });
const peopleSchema = new mongoose.Schema({
  name: String,
  age : Number,
  favouriteFruit : fruitsSchema
});
const Peoples = mongoose.model("People", peopleSchema)

const pineapple = new Fruit({
  name: "Pineapple",
  score:9,
  review: "Great fruit"
});

const mango = new Fruit({
  name: "Pineapple",
  score:9,
  review: "Great fruit"
});



pineapple.save();
const peoples = new Peoples ({
  name: "Amy",
  age: 10,
  favouriteFruit: pineapple

})


peoples.save();
Fruit.find(function(err, fruits){
  if (err) {
    console.log(err)
  } else {
        mongoose.connection.close();
      fruits.forEach(function(fruit){
        console.log(fruit.name)
      })
    }

})


const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Find some documents
  collection.find({}).toArray(function(err, fruits) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(fruits);
    callback(fruits);
  });
