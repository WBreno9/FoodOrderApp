import express from 'express';

let userRouter = express.Router();

userRouter.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const rs = await req.models.userModel.getUserByEmail(email);
    res.send(rs);
});

userRouter.post("/", async (req, res) => {
    const rs = await req.models.userModel.createUser(req.body);
    res.send(rs);
});

userRouter.get("/me", async (req, res) => {
    res.send('you');
});

export default userRouter;
