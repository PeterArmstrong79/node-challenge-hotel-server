const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

//Use this array as your (in-memory) data store.
const bookings = require("./bookings.json");

let nextId = bookings.length +1;

app.get("/", function (request, response) {
  response.send("Hotel booking server.  Ask for /bookings, etc.");
});

app.get("/bookings", function (request, response) {
  response.send(bookings);
});

app.get("/bookings/:id", function (request, response) {
  const booking = bookings.find((singleBooking) => singleBooking.id == request.params.id);
  if(booking === undefined) {
    response.sendStatus(404);
  } else {
    response.send(booking);
  }
});

app.post("/bookings", function (request, response) {
  const newBooking = request.body;
  newBooking.id = nextId ++;
  bookings.push(newBooking);
  response.sendStatus(200);
})

app.delete("/bookings/:id", function (request, response) {
  const index = bookings.findIndex((removeBooking) => removeBooking.id == request.params.id);
  if (index > -1) {
    bookings.splice(index, 1);
    response.sendStatus(204);
  } else {
    response.sendStatus(404);
  }
  
})    
// TODO add your routes and helper functions here

const listener = app.listen(process.env.PORT || 4000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
