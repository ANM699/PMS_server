var express = require('express');
var router = express.Router();

const { StoryModel } = require('../db/models');
const filter = {
  __v: 0,
};

//新增用户故事
router.post('/create', function (req, res) {
  const story = req.body;
  new StoryModel(story).save((err, story) => {
    res.send({
      code: 0,
      data: story,
    });
  });
});

//获取指定项目下的用户故事
router.get('/list', function (req, res) {
  const projectId = req.cookies.projectId;
  if (!projectId) {
    return res.send({ code: 1, msg: '未选择项目' });
  }
  StoryModel.find({ projectId }, filter, (err, stories) => {
    res.send({ code: 0, data: stories });
  });
});

module.exports = router;
