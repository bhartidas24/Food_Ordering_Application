const mongoose = require('mongoose');
const mongoDB = "mongodb://localhost:27017/Bharti_Resto";
const {MongoClient} = require('mongodb')

mongoose.connect(mongoDB, {
  useNewUrlParser: "true",
});

mongoose.connection.on("error", (err) => {
  console.log("err", err);
});

mongoose.connection.on("connected", async(err, res) => {
  console.log("mongoose is connected");
  const client = new MongoClient("mongodb://localhost:27017");
        let result = await client.connect();
        let db = result.db("Bharti_Resto");
        let collection = db.collection("Food_data");
        let fooddata = await collection.find({}).toArray();
        global.food_item = fooddata;

        // console.log(fooddata);

        let collections = db.collection("Food_categories");
        let foodcat = await collections.find({}).toArray();
        global.food_category = foodcat;
});




