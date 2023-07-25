import bcrypt from 'bcrypt';
import db from '../models/index';
import { raw } from 'body-parser';

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
let createUserService =async(data) =>{
    return new Promise (async(resolve,reject)=>{
        try{
            let hashPasswordfromBcypt = await hashpassword(data.pass)
            await db.User.create({
                email: data.email,
                password:hashPasswordfromBcypt,
                firstName: data.firstname,
                lastName: data.lastname,
                address: data.address,
                phonenumber:data.phonenumber,
                gender: data.gender ==="1"?true:false,
                roleId:data.roleid
            })
            resolve('create new success');
        }catch(e){
            reject(e);
        }
    })
    
}
let hashpassword = (pass)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let hash = await bcrypt.hashSync(pass, salt);
            resolve(hash)
        }catch(e){
            reject(e)
        }

    })

}
let getAllUser =()=>{
    return new Promise((resolve,reject)=>{
        try{
            let users=db.User.findAll({
                raw: true,
            });
            resolve(users)
        }catch(e){
            reject(e)
        }
    })
}
let getUserInfoById =(userId)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let user =await db.User.findOne({
                where: {id:userId},
                raw:true,
            })
            if(user){
                resolve(user)
            }else{
                resolve([])
            }
        }catch(e){
            reject(e)
        }
    })
    
}
let updateUserData = (data)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let user =await db.User.findOne({
                where:{id:data.id}
            })
            if(user){
                user.firstName=data.firstname;
                user.lastName=data.lastname;
                user.address=data.address;

                await user.save();
                let allUser = await db.User.findAll();
                resolve(allUser);
            }else{
                resolve();
            }

        }catch(e){
            reject(e)
        }
    })
    
}
let deleteUserById = (userId)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let user =await db.User.findOne({
                where: {id: userId}
            })
            if(user){
                await user.destroy();
            }
            resolve();//return
        }catch(e){
            reject(e)
        }
    })
}
module.exports ={
    createUserService:createUserService,
    getAllUser:getAllUser,
    getUserInfoById:getUserInfoById,
    updateUserData:updateUserData,
    deleteUserById:deleteUserById,
}