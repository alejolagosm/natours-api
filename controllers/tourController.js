const fs = require("fs");

// Reading data from the db
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
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

exports.createTour = (req, res) => {
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

exports.updateTour = (req, res) => {
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

exports.deleteTour = (req, res) => {
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
    "./dev-data/data/tours-simple.json",
    JSON.stringify(tours),
    (err) => {
      res.status(204).json({
        status: "success",
        data: null,
      });
    }
  );
};
