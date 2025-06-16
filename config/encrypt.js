const bc = require('bcrypt');

const encrypt = async(password)=>
{
    const salt = await bc.genSalt(10);
    const hash =  bc.hash(password,salt);
    return hash;
}
const compare = (password1,passsword2)=>
{
    return bc.compare(password1,passsword2);
}
module.exports =
{
    encrypt,
    compare
}