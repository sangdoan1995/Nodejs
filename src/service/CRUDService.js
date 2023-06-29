import bcrypt from 'bcrypt';
import db from '../models/index';

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
module.exports ={
    createUserService:createUserService,
}