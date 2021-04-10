const  userModel = require('../model/User')
const bcrypt = require('bcrypt')

exports.register = (data) =>
new Promise((resolve, reject) =>{
//console.log(data)
userModel.findOne({
    UserName: data.UserName
}).then(adauser => {
    if (adauser){
        resolve({
            status: false,
            pesan: 'USERNAME SUDAH DI DAFTARKAN'
        })
    }else {
        bcrypt.hash(data.Password, 10, (err, hash) =>{
            data.Password = hash
            userModel.create(data)
            .then(() =>{
            //console.log('berhasil insert')
            resolve({
                status:  true,
                pesan : 'Input Data User Telah Berhasil'
            })
            }).catch((e) =>{
            //console.log(e)
            //console.log('gagal insert')
            reject({
                status: false,
                pesan: 'Galat Insert Data Baru'
            })
            })
        })    
    }
})

})