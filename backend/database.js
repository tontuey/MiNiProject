const bcrypt = require('bcrypt')

let users = {
    users: [
        { id: 1, username: 'warodom', password: '$2b$10$0AsMSQaUB0AlLnKzgeUOfOE.hWUodtuR4NOU954XLVy2gy3lBWsdO', email: 'wwarodom@gmail.com' },
        { id: 2, username: 'john', password: '$2b$10$1Bu4tImM/Ms9rtU.8/n/COWpzUAGFB6YlsO5xZqFih1JUxafyFFXa', email: 'john@gmail.com' },
    ]
}
let Recipes = {
    list : [
        {id:1,name:"ไข่เจียวฟูกรอบ",ingredients:"ไข่ไก่ 2 ฟอง,ซอสปรุงรส 2 ช้อนชา,น้ำมัน 1/2 กระทะ",cooking :"1.ตีไข่และปรุงรส 2.เทน้ำมันใส่กระทะตั้งให้น้ำมันร้อน 3.พอน้ำมันเดือดนำกระชอนมากรองไข่ใส่กระทะให้ไข่ฟู พอไข่เริ่มมีสีเหลืองทองแล้วพลิกไข่อีกด้าน แล้วเจียวให้สุก พร้อมจัดเสิร์ฟ",cost :20},
        {id:2,name:"หมูทอดน้ำปลา",ingredients:"สะโพกหมูหั่นเป็นเส้น 1/2 กิโลกรัม,น้ำปลา 3 ช้อนโต๊ะ,พริกไทยดำ 1 ช้อนชา,น้ำมัน 1/2 กระทะ",cooking :"1.นำหมูไปล้างแล้วหั่น 2.หมักด้วยน้ำปลาและพริกไทย 3.เทน้ำมัน เปิดไฟกลางจนน้ำมันร้อนแล้ว",cost :50},
        {id:3,name:"หมูทอด",ingredients:"สะโพกหมูหั่นเป็นเส้น 1/2 กิโลกรัม,น้ำปลา 3 ช้อนโต๊ะ,พริกไทยดำ 1 ช้อนชา,น้ำมัน 1/2 กระทะ",cooking :"1.นำหมูไปล้างแล้วหั่น 2.หมักด้วยน้ำปลาและพริกไทย 3.เทน้ำมัน เปิดไฟกลางจนน้ำมันร้อนแล้ว",cost :40}
    
    ]
    
}
const SECRET = 'your_jwt_secret'
const NOT_FOUND = -1

exports.Recipes = Recipes
exports.users = users 
exports.SECRET = SECRET
exports.NOT_FOUND = NOT_FOUND

exports.setUsers = function(_users) { 
  users = _users;
}

// === validate username/password ===
exports.isValidUser = async (username, password) => { 
    const index = users.users.findIndex(item => item.username === username) 
    return await bcrypt.compare(password, users.users[index].password)
}

// return -1 if user is not existing
exports.checkExistingUser = (username) => {
    return users.users.findIndex(item => item.username === username)
}