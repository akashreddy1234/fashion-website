"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

require("dotenv/config");

var _mongodb = _interopRequireDefault(require("./config/mongodb.js"));

var _cloudinary = _interopRequireDefault(require("./config/cloudinary.js"));

var _userRoute = _interopRequireDefault(require("./routes/userRoute.js"));

var _productRoute = _interopRequireDefault(require("./routes/productRoute.js"));

var _cartRoute = _interopRequireDefault(require("./routes/cartRoute.js"));

var _orderRoute = _interopRequireDefault(require("./routes/orderRoute.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// App Config
var app = (0, _express["default"])();
var port = process.env.PORT || 4000;
(0, _mongodb["default"])();
(0, _cloudinary["default"])(); // middlewares

app.use(_express["default"].json());
app.use((0, _cors["default"])({
  origin: 'https://fashion-website-ido4.vercel.app',
  credentials: true
})); // api endpoints

app.use('/api/user', _userRoute["default"]);
app.use('/api/product', _productRoute["default"]);
app.use('/api/cart', _cartRoute["default"]);
app.use('/api/order', _orderRoute["default"]);
app.get('/', function (req, res) {
  res.send("API Working");
});
app.listen(port, function () {
  return console.log('Server started on PORT : ' + port);
});