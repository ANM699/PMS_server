var express = require("express");
var router = express.Router();

const md5 = require("blueimp-md5");
const { UserModel } = require("../db/models");
const filter = {
  password: 0,
  __v: 0,
}; //查询时过滤指定的属性

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

//用户注册
router.post("/register", function (req, res) {
  const { username, password } = req.body;
  UserModel.findOne(
    {
      username,
    },
    filter,
    (err, user) => {
      if (user) {
        res.send({
          code: 1,
          msg: "该用户名已经被注册",
        });
      } else {
        new UserModel({
          username,
          password: md5(password),
          // email,
        }).save((err, user) => {
          res.cookie("userId", user._id, {
            maxAge: 1000 * 60 * 60 * 24,
          });
          res.send({
            code: 0,
            data: user,
          });
        });
      }
    }
  );
});

//用户登录
router.post("/login", function (req, res, next) {
  const { username, password } = req.body;
  UserModel.findOne(
    {
      username,
      password: md5(password),
    },
    filter,
    (err, user) => {
      if (user) {
        const userId = user._id;
        res.cookie("userId", userId, {
          maxAge: 1000 * 60 * 60 * 24,
        });
        // const data = { username, type: user.type, _id: user._id };
        res.send({
          code: 0,
          data: user,
        });
      } else {
        res.send({
          code: 1,
          msg: "用户名或密码错误",
        });
      }
    }
  );
});

//获取用户信息
router.get("/user", function (req, res) {
  const userId = req.cookies.userId;
  if (!userId) {
    return res.send({ code: 1, msg: "请先登录" });
  }
  UserModel.findOne({ _id: userId }, filter, (err, user) => {
    if (!user) {
      res.send({ code: 1, msg: "用户不存在" });
    } else {
      res.send({ code: 0, data: user });
    }
  });
});

module.exports = router;
