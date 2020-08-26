//1.连接数据库
//引入mongoose
const mongoose = require("mongoose");
//连接指定数据库
mongoose.connect("mongodb://localhost:27017/pms", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//获取连接对象
const conn = mongoose.connection;
//绑定连接完成的监听
conn.on("connected", function () {
  console.log("数据库连接成功");
});

//2.得到对应特定集合的Model并向外暴露
//定义Schema

//用户
const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String },
  memo: { type: String },
});
//定义Model
const UserModel = mongoose.model("user", userSchema);
//向外暴露Model
exports.UserModel = UserModel;

//项目
const projectSchema = mongoose.Schema({
  projectName: { type: String, require: true },
  startDate: { type: Date, require: true },
  endDate: { type: Date, require: true },
  description: { type: String, require: true },
});
const ProjectModel = mongoose.model("project", projectSchema);
exports.ProjectModel = ProjectModel;
