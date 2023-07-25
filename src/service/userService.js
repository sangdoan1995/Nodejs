import bcrypt from 'bcrypt';
import db from "../models/index";
import { raw } from 'body-parser';

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
let hashpassword = (pass) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hash = await bcrypt.hashSync(pass, salt);
            resolve(hash)
        } catch (e) {
            reject(e)
        }

    })

}

let handleUserLogin = (email, password) => {

    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};

            let isExist = await checkUserEmail(email);
            if (isExist) {
                //user already exist
                let user = await db.User.findOne({
                    where: { email: email },
                    attributes: ['email', 'roleId', 'password'],
                    raw: true

                });
                if (user) {
                    //compare password
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errcode = 0;
                        userData.errMessage = 'ok';
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errcode = 3;
                        userData.errMessage = 'wrong password';

                    }
                } else {

                    userData.errcode = 2;
                    userData.errMessage = `user not found`;
                }

            } else {
                userData.errcode = 1;
                userData.errMessage = 'your email not exist on sys';

            }
            resolve(userData);
        } catch (e) {
            reject(e);
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e);
        }
    })
}
let getAllUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = 'not exist';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: { exclude: 'password' },

                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: { exclude: 'password' },

                })
            }
            resolve(users)

        } catch (e) {
            reject(e)
        }
    })
}
let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // check email is exist
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errcode: 1,
                    errMessage: 'this email exist,plz try another email'
                })

            } else {
                let hashPasswordfromBcypt = await hashpassword(data.password)
                await db.User.create({
                    email: data.email,
                    password: hashPasswordfromBcypt,
                    firstName: data.firstname,
                    lastName: data.lastname,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender === "1" ? true : false,
                    roleId: data.roleid
                })
                resolve({
                    errcode: 0,
                    message: 'OK'
                });
            }

        } catch (e) {
            reject(e)
        }
    })
}
let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {

        let fetchUser = await db.User.findOne({

            where: { id: userId }
        })

        if (!fetchUser) {

            resolve({
                errcode: 2,
                errMessage: `the user isn't exist`
            })
        }

        await db.User.destroy({
            where: { id: userId }
        })
        resolve({
            errcode: 0,
            errMessage: `the user delete done`
        })

    })

}
let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                return resolve({
                    errcode: 3,
                    errMessage: 'Missing required parameter'
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.firstName = data.firstname;
                user.lastName = data.lastname;
                user.address = data.address;

                await user.save();

                resolve({
                    errcode: 0,
                    errMessage: 'Update user success'
                });
            } else {
                resolve({
                    errcode: 2,
                    errMessage: 'the user not exist'
                });
            }

        } catch (e) {
            reject(e)
        }
    })

}
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUser: getAllUser,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUser: updateUser
}