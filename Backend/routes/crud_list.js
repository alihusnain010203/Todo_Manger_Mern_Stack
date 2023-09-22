const router = require('express').Router();
const User = require('../models/user.js');
const List = require('../models/list.js');
const { route } = require('./authentication.js');
const user = require('../models/user.js');

router.post('/addTask', async (req, res) => {
    try {
        const { title, body, id } = req.body;
        const existingUser = await User.findById(id);

        if (existingUser) {
            const newlist = new List({ title, body });
            newlist.user = existingUser._id; // Set the user field to the user's _id
            await newlist.save();

            existingUser.list.push(newlist._id); // Push the list's _id into the user's list array
            await existingUser.save();
            console.log(newlist._id);
            res.status(200).json({ message: "Task added", id: newlist._id });
        } else {
            res.status(401).send("Invalid user");
        }
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({ message: "An error occurred" });
    }
});
// Use Find By id

router.post('/findByid', async (req, res) => {
    const { id } = req.body; // Extract 'id' from the request body
    const user = await User.findById(id);

    if (user) {
        console.log(user);
        res.status(200).json({ email: user.email });
    } else {
        res.status(200).json({ message: "Not" });
    }
});

// Update
router.put('/updateTask/:taskId', async (req, res) => {
    try {
        const { title, body } = req.body;
        const updatedList = await List.findByIdAndUpdate(
            req.params.taskId,
            { title, body },
            { new: true } // To get the updated document after the update
        );
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({ message: "An error occurred" });
    }
});
//   Delete
router.delete('/deleteTask/:taskId', async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const { id } = req.body;
        const user = await User.findByIdAndUpdate({ _id: id }, { $pull: { list: taskId } })
        if (user) {
            await List.findByIdAndDelete(taskId);
            res.status(200).json({ message: "Deleted" })
        }
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({ message: "An error occurred" });
    }
});
// Get all tasks
router.get('/gettasks/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        const tasks = await List.find({ user: userId })
            .sort({ createdAt: -1 }); // Sort by createdAt field in descending order (newest first)


        res.status(200).json({ tasks });



    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({ message: "An error occurred" });
    }
});

module.exports = router;

module.exports = router;

