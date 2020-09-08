var express = require("express");
var router = express.Router();

const { ProjectModel } = require("../db/models");
const filter = {
  __v: 0,
};

//新增项目
router.post("/create", function (req, res) {
  const project = req.body;
  new ProjectModel(project).save((err, project) => {
    res.send({
      code: 0,
      data: project,
    });
  });
});

//获取项目信息
router.get("/project", function (req, res) {
  const projectId = req.cookies.projectId;
  if (!projectId) {
    return res.send({ code: 1, msg: "未选择项目" });
  }
  ProjectModel.findOne({ _id: projectId }, filter, (err, project) => {
    if (!project) {
      res.send({ code: 1, msg: "项目不存在" });
    } else {
      res.send({ code: 0, data: project });
    }
  });
});

//获取项目列表
router.get("/list", function (req, res) {
  ProjectModel.find({}, filter, function (err, projects) {
    res.send({ code: 0, data: projects });
  });
});

module.exports = router;
