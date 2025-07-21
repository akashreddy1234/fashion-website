"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adminLogin = exports.registerUser = exports.loginUser = void 0;

var _validator = _interopRequireDefault(require("validator"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _userModel = _interopRequireDefault(require("../models/userModel.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createToken = function createToken(id) {
  return _jsonwebtoken["default"].sign({
    id: id
  }, process.env.JWT_SECRET);
}; // Route for user login


var loginUser = function loginUser(req, res) {
  var _req$body, email, password, user, isMatch, token;

  return regeneratorRuntime.async(function loginUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          _context.next = 4;
          return regeneratorRuntime.awrap(_userModel["default"].findOne({
            email: email
          }));

        case 4:
          user = _context.sent;

          if (user) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.json({
            success: false,
            message: "User doesn't exists"
          }));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(_bcryptjs["default"].compare(password, user.password));

        case 9:
          isMatch = _context.sent;

          if (isMatch) {
            token = createToken(user._id);
            res.json({
              success: true,
              token: token
            });
          } else {
            res.json({
              success: false,
              message: 'Invalid credentials'
            });
          }

          _context.next = 17;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.json({
            success: false,
            message: _context.t0.message
          });

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 13]]);
}; // Route for user register


exports.loginUser = loginUser;

var registerUser = function registerUser(req, res) {
  var _req$body2, name, email, password, exists, salt, hashedPassword, newUser, user, token;

  return regeneratorRuntime.async(function registerUser$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body2 = req.body, name = _req$body2.name, email = _req$body2.email, password = _req$body2.password; // checking user already exists or not

          _context2.next = 4;
          return regeneratorRuntime.awrap(_userModel["default"].findOne({
            email: email
          }));

        case 4:
          exists = _context2.sent;

          if (!exists) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.json({
            success: false,
            message: "User already exists"
          }));

        case 7:
          if (_validator["default"].isEmail(email)) {
            _context2.next = 9;
            break;
          }

          return _context2.abrupt("return", res.json({
            success: false,
            message: "Please enter a valid email"
          }));

        case 9:
          if (!(password.length < 8)) {
            _context2.next = 11;
            break;
          }

          return _context2.abrupt("return", res.json({
            success: false,
            message: "Please enter a strong password"
          }));

        case 11:
          _context2.next = 13;
          return regeneratorRuntime.awrap(_bcryptjs["default"].genSalt(10));

        case 13:
          salt = _context2.sent;
          _context2.next = 16;
          return regeneratorRuntime.awrap(_bcryptjs["default"].hash(password, salt));

        case 16:
          hashedPassword = _context2.sent;
          newUser = new _userModel["default"]({
            name: name,
            email: email,
            password: hashedPassword
          });
          _context2.next = 20;
          return regeneratorRuntime.awrap(newUser.save());

        case 20:
          user = _context2.sent;
          token = createToken(user._id);
          res.json({
            success: true,
            token: token
          });
          _context2.next = 29;
          break;

        case 25:
          _context2.prev = 25;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          res.json({
            success: false,
            message: _context2.t0.message
          });

        case 29:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 25]]);
}; // Route for admin login


exports.registerUser = registerUser;

var adminLogin = function adminLogin(req, res) {
  var _req$body3, email, password, token;

  return regeneratorRuntime.async(function adminLogin$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          try {
            _req$body3 = req.body, email = _req$body3.email, password = _req$body3.password;

            if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
              token = _jsonwebtoken["default"].sign(email + password, process.env.JWT_SECRET);
              res.json({
                success: true,
                token: token
              });
            } else {
              res.json({
                success: false,
                message: "Invalid credentials"
              });
            }
          } catch (error) {
            console.log(error);
            res.json({
              success: false,
              message: error.message
            });
          }

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.adminLogin = adminLogin;