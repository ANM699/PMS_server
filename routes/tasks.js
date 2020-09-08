var express = require('express');
var router = express.Router();

const { TaskModel } = require('../db/models');
const filter = {
  __v: 0,
};

//新增任务
router.post('/create', function (req, res) {
  const task = req.body;
  new TaskModel(task).save((err, task) => {
    res.send({
      code: 0,
      data: task,
    });
  });
});

//获取指定用户故事下的任务
router.get('/list', function (req, res) {
  const storyId = req.body.storyId;
  if (!storyId) {
    return res.send({ code: 1, msg: '请选择用户故事' });
  }
  TaskModel.find({ storyId }, filter, (err, tasks) => {
    res.send({ code: 0, data: tasks });
  });
});

module.exports = router;
