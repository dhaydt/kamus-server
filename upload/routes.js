import db from "../config/db.js";

export const index = function (req, res) {
  var message = "";
  if (req.method == "POST") {
    var post = req.body;
    console.log(req);

    var title = post.title;
    var details = post.detail;

    if (!req.files) {
      return res.status(400).send;
      ("No Image Found");
    }

    var file = req.files.images;
    var images = file.name;

    if (
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/gif"
    ) {
      file.mv("public/images/client/" + file.name, function (err) {
        if (err) {
          return res.status(500).send(err);
        }
        var sql =
          "INSERT INTO `adv` (`title`,`images`,`details`) VALUES ('" +
          title +
          "','" +
          images +
          "','" +
          details +
          "')";

        db.query(sql, function (err, result) {
          res.send(result);
        });
      });
    } else {
      message =
        "This format not allowed, allowed format is .png, .jpeg, .jpg, .gif";
      res.send({ message: message });
    }
  } else {
    res.send("Success");
  }
};

// export const profile = (res) => {
//   db.query("SELECT * FROM adv ORDER BY id", (err, hasil) => {
//     if (err) {
//       res(err, null);
//       console.log(err);
//     } else {
//       res(null, hasil);
//       console.log(hasil);
//     }
//   });
// };

export const profile = function (req, res) {
  var message = "";
  // var id = req.params.id;
  var sql = " SELECT * FROM `adv`";
  db.query(sql, function (err, result) {
    // if (result.length <= 0) message = "image not found!";

    res.send({ data: result, message: message });
  });
};

export const getImg = function (req, res) {
  var message = "";
  var id = req.params.id;
  var sql = "SELECT * FROM `adv` WHERE `id`='" + id + "'";
  db.query(sql, function (err, result) {
    if (result.length <= 0) message = "img not found!";
    res.contentType("image/jpeg");
    console.log(result);
    res.send({ data: result, message: message });
  });
};

export const getLastId = function (req, res) {
  var sql = "SELECT MAX(id) AS lastId FROM adv";

  db.query(sql, function (err, result) {
    console.log(result);
    res.send({ data: result });
  });
};

export const getSecondId = function (req, res) {
  var sql = "SELECT * FROM adv ORDER BY id DESC LIMIT 1,1";

  db.query(sql, function (err, result) {
    console.log(result);
    res.send(result);
  });
};

export const getThirdId = function (req, res) {
  var sql = "SELECT * FROM adv ORDER BY id DESC LIMIT 2,1";

  db.query(sql, function (err, result) {
    console.log(result);
    res.send(result);
  });
};
