const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("./db");

const SECRET_KEY = process.env.SECRET_KEY;

// const login = async (username, password) => {

// }

// async function login(username, password) {
//   return Promise((resolve, reject) => {
//     const query = "SELECT * FROM users WHERE username = ?";

//     db.query(query, [username], (err, result) => {
//       if (err) {
//         reject(err);
//       }
//       if (result.length === 0) {
//         reject("User not found");
//       }
//       const user = result[0];
//       bcrypt.compare(password, user.password, (err, res) => {
//         if (err) {
//           reject(err);
//         }
//         if (!res) {
//           reject("Invalid password");
//         }
//         const token = jwt.sign({ id: user.id }, SECRET_KEY);
//         resolve(token);
//       });
//     });
//   });
// }

async function login(username, password) {
  return Promise((resolve, reject) => {
    const query = "SELECT * FROM users WHERE username = ?";

    db.query(query, [username], (err, result) => {
      if (err) {
        reject(err);
      }
      if (result.length === 0) {
        reject("User not found");
      }
      const user = result[0];
      bcrypt.compare(password, user.password, (err, res) => {
        if (err) {
          reject(err);
        }
        if (!res) {
          reject("Invalid password");
        }
        const token = jwt.sign({ id: user.id }, SECRET_KEY, {
          expiresIn: "1h",
        });
        resolve(token);
      });
    });
  });
}

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        reject(err);
      }
      resolve(decoded);
    });
  });
};

module.exports = { login, verifyToken };
