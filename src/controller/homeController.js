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
let displayGetCRUD =async(req,res)=>{
    let data = await createUser.getAllUser();
    return res.render('displayCRUD.ejs',{
        dataTable:data
    })

}
let getEditCRUD=async(req,res)=>{
    let userId=req.query.id;
    if(userId){
        let userData =await createUser.getUserInfoById(userId);
        // check user data not found
        

        // let user data
        return res.render('editCRUD.ejs',{
            user:userData
        });
    }else{
        return res.send('user not found!');
    }

    
}
let putCRUD =async(req,res)=>{
    let data =req.body;
    let allUser= await createUser.updateUserData(data);
    return res.render('displayCRUD.ejs',{
        dataTable:allUser
    })
}
let deleteCRUD=async(req,res)=>{
    let id =req.query.id;
    if(id){
        await createUser.deleteUserById(id);
        return res.send('delete the user succeed')
    }
    else{
        return res.send('user not found!');
    }
    

}

module.exports = {
    getHomePage: getHomePage,
    getAboutPage:getAboutPage,
    getCRUD:getCRUD,
    postCRUD:postCRUD,
    displayGetCRUD:displayGetCRUD,
    getEditCRUD:getEditCRUD,
    putCRUD:putCRUD,
    deleteCRUD:deleteCRUD,
}