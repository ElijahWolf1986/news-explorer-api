const { JWT_LOCAL_SECRET = 'JWT_SECRET' } = process.env;
const { bdlocaladdress = 'mongodb://localhost:27017/mestodb' } = process.env;
module.exports = {
  JWT_LOCAL_SECRET,
  bdlocaladdress,
};
