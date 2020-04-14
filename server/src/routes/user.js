import express from 'express';

let userRouter = express.Router();

userRouter.get("/", async (req, res) => {
    const email = req.query.email;
    const password = req.query.password;

    const rs = await req.models.userModel.getUserByEmail(email);
    res.send(rs);
});

userRouter.post("/", async (req, res) => {
    const rs = await req.models.userModel.createUser(req.body);
    res.send(rs);
});

export default userRouter;
