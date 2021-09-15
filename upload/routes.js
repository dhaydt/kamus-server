import db from "../config/db.js";

export const index = function (req, res) {
  var message = "";
  if (req.method == "POST") {
    var post = req.body;

    var title = post.title;
    var posisi = post.posisi;
    var tipe = post.tipe;
    var code = post.code;
    var url = post.url;
    var end_date = post.end_date;
    var start_date = post.start_date;

    if (!req.files) {
      var sql =
        "INSERT INTO `adv` (`title`,`posisi`,`tipe`, `code`, `start_date`, `end_date`) VALUES ('" +
        title +
        "','" +
        posisi +
        "','" +
        tipe +
        "','" +
        code +
        "','" +
        start_date +
        "','" +
        end_date +
        "')";

      db.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          result(err, null);
        } else {
          // result(null, results);
          console.log("hasil", result);
          res.send(result);
        }
      });
    } else {
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
            "INSERT INTO `adv` (`title`,`images`, `url`, `tipe`, `posisi`, `start_date`, `end_date`) VALUES ('" +
            title +
            "','" +
            images +
            "','" +
            url +
            "','" +
            tipe +
            "','" +
            posisi +
            "','" +
            start_date +
            "','" +
            end_date +
            "')";

          db.query(sql, (err, result) => {
            if (err) {
              console.log(err);
              result(err, null);
            } else {
              // result(null, results);
              console.log("hasil", result);
              res.send(result);
            }
          });
        });
      } else {
        message =
          "This format not allowed, allowed format is .png, .jpeg, .jpg, .gif";
        res.send({ message: message });
      }
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
  var sql = "SELECT * FROM adv WHERE tipe = ? ORDER BY id DESC  LIMIT 10";

  db.query(sql, ["image"], function (err, result) {
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

// get iklan atas judul

export const getAtasJudul = function (req, res) {
  var sql =
    "SELECT * FROM adv WHERE tipe = ? AND posisi = ? ORDER BY id DESC  LIMIT 5";

  db.query(sql, ["image", "atas_judul"], function (err, result) {
    console.log(result);
    res.send(result);
  });
};

export const getBawahJudul = function (req, res) {
  var sql =
    "SELECT * FROM adv WHERE tipe = ? AND posisi = ? ORDER BY id DESC  LIMIT 5";

  db.query(sql, ["image", "bawah_judul"], function (err, result) {
    console.log(result);
    res.send(result);
  });
};

export const getAtasRelated = function (req, res) {
  var sql =
    "SELECT * FROM adv WHERE tipe = ? AND posisi = ? ORDER BY id DESC  LIMIT 5";

  db.query(sql, ["image", "atas_related"], function (err, result) {
    console.log(result);
    res.send(result);
  });
};

export const getAtasLainnya = function (req, res) {
  var sql =
    "SELECT * FROM adv WHERE tipe = ? AND posisi = ? ORDER BY id DESC  LIMIT 5";

  db.query(sql, ["image", "atas_lainnya"], function (err, result) {
    console.log(result);
    res.send(result);
  });
};

export const getAtasShared = function (req, res) {
  var sql =
    "SELECT * FROM adv WHERE tipe = ? AND posisi = ? ORDER BY id DESC  LIMIT 5";

  db.query(sql, ["image", "atas_shared"], function (err, result) {
    console.log(result);
    res.send(result);
  });
};

export const getSideAtas = function (req, res) {
  var sql =
    "SELECT * FROM adv WHERE tipe = ? AND posisi = ? ORDER BY id DESC  LIMIT 5";

  db.query(sql, ["image", "side_atas"], function (err, result) {
    console.log(result);
    res.send(result);
  });
};

export const getSideTengah = function (req, res) {
  var sql =
    "SELECT * FROM adv WHERE tipe = ? AND posisi = ? ORDER BY id DESC  LIMIT 5";

  db.query(sql, ["image", "side_tengah"], function (err, result) {
    console.log(result);
    res.send(result);
  });
};

export const getSideBawah = function (req, res) {
  var sql =
    "SELECT * FROM adv WHERE tipe = ? AND posisi = ? ORDER BY id DESC  LIMIT 5";

  db.query(sql, ["image", "side_bawah"], function (err, result) {
    console.log(result);
    res.send(result);
  });
};
