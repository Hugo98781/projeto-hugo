const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080
const rank = require('./rank')
const consulta = require('./consulta')


app.use(rank)

app.use(consulta)

app.listen(PORT, function(){
    console.log("Servidor pronto para uso!")
})