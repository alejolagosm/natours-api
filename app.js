const express = require("express");
const fs = require("fs");

const app = express();

// app.get('/', (req, res) => {
//     res.status(200).json({
//         message: 'Hello World from the server',
//         app: "Natours"
//     });
// })

// app.post('/', (req, res) => {
//     res.send("You can post to this website")
// });

const tours = JSON.parse(
  fs.readFileSync(path.join(__dirname, "/dev-data/data/tours-simple.json"))
);

app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
