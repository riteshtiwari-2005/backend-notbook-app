const { default: mongoose } = require("mongoose");
const Todo = require("../model/Todo");
//create

exports.createTodo = async (req, res) => {
  try {
    const userid = req.user.checkuser._id;
 console.log(req.user)
    const { title, desc, completed = false } = req.body;

    if (!title || !desc) {
      return res.status(401).json({
        success: false,
        message: "Filed is required",
      });
    }

    const userdata = await Todo.create({
      title,
      desc,
      completed,
  user: new mongoose.Types.ObjectId(userid), // ✅ Proper conversion
    });
    // console.log(userdata);
    return res.status(200).json({
      success: true,
      userdata,
      message: "Todo Item Is Inserted",
    });
  } catch (e) {
    console.log(e)
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

//read
exports.FetchTodo = async (req, res) => {
  try {
    const userid = req.user.checkuser._id;
    
    console.log(req.user);
    const userdata = await Todo.find({ user: new mongoose.Types.ObjectId(userid) });

    return res.status(200).json({
      success: true,
      userdata,
      message: "Fetch Successfully",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};
//update
exports.UpdateTodo = async (req, res) => {
  try {
    const { title, desc, completed } = req.body;
    const noteid = req.params.note;
    if (!title || !desc || !noteid) {
      return res.status(401).json({
        success: false,
        message: "Filed is required",
      });
    }

    const userdata = await Todo.findOneAndUpdate(
      { _id: noteid },
      {
        title: title,
        desc: desc,
        completed: completed,
      },
      { new: true }
    );
    if (!userdata) return res.status(404).json({ message: "Todo not found" });

    return res.status(200).json({
      success: true,
      userdata,
      message: "Updated Successfully",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

//delete
exports.DeleteTodo = async (req, res) => {
  try {
    const noteid = req.params.note;
    if (!noteid) {
      return res.status(401).json({
        success: false,
        message: "Filed is required",
      });
    }

    const userdata = await Todo.findOneAndDelete(
      { _id: noteid },
      { new: true }
    );
    if (!userdata) return res.status(404).json({ message: "Todo not found" });

    return res.status(200).json({
      success: true,
      userdata,
      message: "Deleted Successfully",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};
