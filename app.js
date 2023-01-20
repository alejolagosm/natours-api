const express = require("express");
const fs = require("fs");
const { request } = require("http");

const app = express();

app.use(express.json());

//Custom middleware that gets executed before all the route handlers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  req.requestTime = new Date().toISOString;
  next();
});

const tours = JSON.parse(
  fs.readFileSync(path.join(__dirname, "/dev-data/data/tours-simple.json"))
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  const id = req.params.id * 1;

  const tour = tours.find((tour) => tour.id === id);

  if (!tour) {
    res.status(404).json({
      status: "error",
      message: "Tour not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  const tour = req.body;
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, tour);
  tours.push(newTour);
  fs.writeFile(
    path.join(__dirname, "/dev-data/data/tours-simple.json"),
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  const id = req.params.id;
  const tour = tours.find((tour) => tour.id === id);

  if (!tour) {
    res.status(404).json({
      status: "error",
      message: "Tour not found",
    });
  }

  const tourInfo = req.body;
  const newTour = { ...tour, tourInfo };
  const idx = tours.findIndex((tour) => tour.id === id);
  tours[idx] = newTour;

  fs.writeFile(
    path.join(__dirname, "/dev-data/data/tours-simple.json"),
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const deleteTour = (req, res) => {
  const id = req.params.id;
  const idx = tours.findIndex((tour) => tour.id === id);

  if (!idx) {
    res.status(404).json({
      status: "error",
      message: "Tour not found",
    });
  }

  tours.splice(idx, 1);

  fs.writeFile(
    path.join(__dirname, "/dev-data/data/tours-simple.json"),
    JSON.stringify(tours),
    (err) => {
      res.status(204).json({
        status: "success",
        data: null,
      });
    }
  );
};

app.route("/api/v1/tours").get(getAllTours).post(createTour);

app
  .route("/api/v1/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

const port = 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
