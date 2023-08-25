require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to the MongoDB database!");
});

const PersonExample = require("./personSchema");

//create one Person
const personProto = new PersonExample({
  name: "Carole",
  age: 35,
  favoriteFoods: ["BubbleTea", "Ramen", "Beignets"],
});

personProto
  .save()
  .then((savedPerson) => {
    console.log("Saved person:", savedPerson);
  })
  .catch((err) => {
    console.error("Error saving person:", err);
  });

//create multible people
const arrayOfPeople = [
  {
    name: "Carole",
    age: 35,
    favoriteFoods: ["Ramen", "BubbleTea"],
  },
  {
    name: "Awa",
    age: 30,
    favoriteFoods: ["Sushi", "Salad"],
  },
  {
    name: "Saliou",
    age: 28,
    favoriteFoods: ["Burger", "Hummus"],
  },
];
PersonExample.create(arrayOfPeople)
  .then((createdPeople) => {
    console.log("Created people:", createdPeople);
  })
  .catch((err) => {
    console.error("Error creating people:", err);
  });

//find a person by name
const searchName = "Saliou";

PersonExample.find({ name: searchName })
  .then((peopleWithGivenName) => {
    console.log("People with given name:", peopleWithGivenName);
  })
  .catch((err) => {
    console.error("Error finding people:", err);
  });

//find a person by food
const searchFood = "Ramen";

PersonExample.findOne({ favoriteFoods: searchFood })
  .then((personWithGivenFood) => {
    console.log("Person with given food:", personWithGivenFood);
  })
  .catch((err) => {
    console.error("Error finding person:", err);
  });

//find the person by ID
const personIdToFind = "64e5146d609f2891e3276ba4";

PersonExample.findById(personIdToFind)
  .then((foundPerson) => {
    console.log("Person found by _id:", foundPerson);
  })
  .catch((err) => {
    console.error("Error finding person by _id:", err);
  });

//find a person by id and change the favorite food

const personID = "64e5156337dde2d66ff473dd";

PersonExample.findByIdAndUpdate(personID, {
  $push: { favoriteFoods: "Hamburger" },
})
  .then((foundPerson) => {
    console.log("Person with changed favorite food:", foundPerson);
  })
  .catch((err) => {
    console.error("Error finding person by _id:", err);
  });

//find a person by name and change the age
PersonExample.findOneAndUpdate({ name: "Carole" }, { age: 20 }, { new: true })
  .then((foundPerson) => {
    console.log("Person with changed age:", foundPerson);
  })
  .catch((err) => {
    console.error("Error finding person by name:", err);
  });

//find a person by ID and remove it
const personID = "64e8c2288ee290dd13073048";

PersonExample.findByIdAndRemove(personID)
  .then((removedPerson) => {
    console.log("removed Person:", removedPerson);
  })
  .catch((err) => {
    console.error("Error finding person by _id:", err);
  });

//finding all the people with the name Mary
PersonExample.deleteMany({ name: "Mary" })
  .then((removedPerson) => {
    console.log("removed Person:", removedPerson);
  })
  .catch((err) => {
    console.error("Error finding person by name:", err);
  });

//people who likes burritos
PersonExample.find({ likes: "Burrito" })
  .sort("name")
  .limit(2)
  .select("-age")
  .exec()
  .then((burritoLover) => {
    console.log("found person by liking Burrito:", burritoLover);
  })
  .catch((err) => {
    console.error("Error finding person by liking Burrito:", err);
  });
