import db from '../models/index';
import createUser from '../service/CRUDService';
let getHomePage =async(req, res)=>{
    try{
        let data = await db.User.findAll();
        // console.log('-----------------');
        // console.log(data);
        // console.log('-----------------');
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    }catch(e){
        console.log(e)
    }
    

}
let getAboutPage =(req, res)=>{
    return res.render('test/about.ejs');

}
let getCRUD =(req,res)=>{
    return res.render('crud.ejs');
}
let postCRUD =async(req,res)=>{
    let message = await createUser.createUserService(req.body);
    console.log(message);
    return res.send('the program to post');
}
let displayGetCRUD=async(req,res)=>{
    
    let data = await createUser.getAllUser();
    console.log('------------------------');
    console.log(data)
    console.log('------------------------');
    return res.render('displayCRUD.ejs');
}
module.exports = {
    getHomePage: getHomePage,
    getAboutPage:getAboutPage,
    getCRUD:getCRUD,
    postCRUD:postCRUD,
    displayGetCRUD:displayGetCRUD,
}