import userService from "../service/userService";

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errcode: 1,
            message: 'Missing Input'
        })
    }

    let userData = await userService.handleUserLogin(email, password);

    //check email exist
    //compare password
    //return userInfo
    //access_token:JWT json web token
    return res.status(200).json({
        errcode: userData.errcode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}


    })
}
let handleGetAllUser = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            errcode: 1,
            errMessage: 'missing require param id',
            users
        })
    }
    let users = await userService.getAllUser(id);
    return res.status(200).json({
        errcode: 0,
        errMessage: 'ok',
        users
    })

}
let handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    console.log(message);
    return res.status(200).json(message)
}
let handleDeleteUser = async (req, res) => {
    if (!req.query.id) {
        return res.status(200).json({
            errcode: 1,
            message: 'Missing required parameter'
        })
    }
    let message = await userService.deleteUser(req.query.id);
    console.log(message);
    return res.status(200).json(message)
}
let handleEditUser = async (req, res) => {
    let data = req.body;
    let message = await userService.updateUser(data);
    return res.status(200).json(message);
}
module.exports = {
    handleLogin: handleLogin,
    handleGetAllUser: handleGetAllUser,
    handleCreateNewUser: handleCreateNewUser,
    handleDeleteUser: handleDeleteUser,
    handleEditUser: handleEditUser
}