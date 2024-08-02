const express = require('express');
const router = express.Router();

router.post('/foodData', (req,res)=>{

    try{
        res.send([global.food_item , global.food_category]);
        console.log("fooddata load")
    }catch(err){
        console.log(err)
    }
})


module.exports = router;
