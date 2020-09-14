const {User} = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserController {

    static showAll(req,res, next){
        User.findAll()
        .then(function(users){
            res.status(201).json(users)
        })
        .catch ((err) =>{
            res.status(500).json({
                message: "Gagal memuat User"
            })
        })
    }


    static register(req,res, next){
        User.findOne({where: {email: req.body.email}})
        .then((data)=>{
            if( !data ){
                let newUser = {
                    email: req.body.email,
                    password: req.body.password,
                    nama: req.body.nama,
                    alamat: req.body.alamat
                }
                User.create(newUser)
                .then((user)=>{
                    res.status(201).json(user)
                })
                .catch ((err) =>{
                    res.status(400).json({
                        err, message: "error"
                    })
                })
            } else {
                res.status(500).json({
                    message: "Username sudah ada"
                })
            }
        })
    }

    static login(req,res, next){
        // console.log(req.method, req.url, req.body)
        User.findOne({where: {email: req.body.email}})
        .then((user)=>{
            if( user && bcrypt.compareSync(req.body.password, user.password) ){
                const token = jwt.sign({
                    nama: user.nama,
                    alamat: user.alamat
                }, 'admin' )
                var decoded = jwt.verify(token, 'admin');
                res.status(200).json({token: token,
                    decode: decoded
                })
            } else {
                res.status(400).json("Username or password salah")
            }
        })
        .catch ((err) =>{
            res.status(500).json({
                message: "Gagal Login"
            })
        })
    }
}

module.exports = UserController