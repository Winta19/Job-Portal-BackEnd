const prisma = require("../prismaClient");
const getlocation =  async (req , res)=>{
   try {
    const locations = await prisma.location.findMany({});
    res.status(200).send(locations);
   } catch (error) {
    console.log('error',error);
    
    res.status(501).send(error);
   }
}

const createlocation =  async (req , res)=>{
    const {name,address} = req.body;
    try {
     const location = await prisma.location.create({
        data:{
            name:name,
            address:address
        }
     });
     res.status(201).send(location);
    } catch (error) {
     console.log('error',error);
     
     res.status(501).send(error);
    }
 }


module.exports = {getlocation,createlocation}
