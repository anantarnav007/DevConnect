const express = require('express')
const router = express.Router()

router.get('/test', (req,res)=>{
    res.json({message : 'user method GET works'})
})

module.exports = router