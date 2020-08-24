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

//获取项目列表
router.get("/projectList", function (req, res) {
  ProjectModel.find({}, filter, function (err, projects) {
    res.send({ code: 0, data: projects });
  });
});

module.exports = router;