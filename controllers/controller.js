import session from "express-session"

import userModel from "../model/userModel.js"

import bcrypt from 'bcrypt'
import { request } from "express"

class Controller{

    static login_get = (req,res)=>{

     //   req.session.isValid =true
      //  console.log(req.session)
      //  console.log(req.session.id)

        const myMsg = req.session.msg

        console.log(req.session)

        delete  req.session.msg

        console.log("======================================")

        console.log(session)

        res.render('login.ejs',{myMsg})
    }

    static login_post = async (req,res)=>{

        try{

            const form_data = req.body

            const existing_user = await userModel.findOne({email:form_data.email})

            if(!existing_user){
                req.session.msg = `${form_data.email} Please Signup First !!!`
              return   res.redirect('/signup')
            }

            const user_matched = await bcrypt.compare(form_data.pwd,existing_user.pwd)

            if(user_matched){

                req.session.isValid = true
                req.session.msg = `Welcome Dear ${existing_user.name} on Dasboard Page !!!`
              return  res.redirect('/dashboard')
            }
            else{

                req.session.msg = `Password is not Correct Dear ${existing_user.name}  !!!`             
              return  res.redirect('/login')
            }



        }catch(err){

            console.log(err)
            res.send(err)
        }




    }

    static dashboard_get = (req,res)=>{

        const myMsg = req.session.msg

        delete req.session.msg

        res.render('dashboard.ejs',{myMsg})
    }

    static logout_post = (req,res)=>{
 
        req.session.destroy((err)=>{

            if(err){
                throw err
            }
            else{

                res.redirect('/home')
            }

        })


    }

    static home_get = (req,res)=>{
        res.render('home.ejs')
    }

    static sigup_get = (req,res)=>{

        const myMsg = req.session.msg

        delete req.session.msg

        res.render('signup.ejs',{myMsg})
    }

    

    static signup_post = async (req,res)=>{

        try{
            
            const form_data = req.body

         

            console.log(form_data)

            // Cofirm that this is not an existing user

            let user = await userModel.findOne({email:form_data.email})

            if(user){

                req.session.msg = `${user.name} is an existing user please login !!!`
            
               return res.redirect('/login')
            
            }


            const hashedPwd = await bcrypt.hash(form_data.pwd,10)

            if(!user){

                user = new userModel({
                    name : form_data.name,
                    email :form_data.email,
                    pwd  : hashedPwd
                })

               const user_saved = await user.save()

               console.log(user_saved)

               req.session.msg = `Signup Successfull Please Login Dear  ${user.name} `
              
              return res.redirect('/login')

            }





        }catch(err){
            console.log(err)
            res.send(err)
        }


    }
}

export default Controller