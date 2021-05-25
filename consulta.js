const express = require('express')
const axios = require('axios').default
const parser = require ('node-html-parser').parse
const router = express.Router()


router.get('/consulta', function(req, res){

    const query = req.query.busca
    const ranking = []
    var url="https://battlefieldtracker.com/bfv/leaderboards/stats/origin/KdRatio?country=br&page=1"
    var requisicao = axios.get(url)
    
    requisicao.then(function(resposta){
        
        var document = parser(resposta.data)
        var tabela = document.querySelector("table")
        var tr = tabela.querySelectorAll("tr").length

        if(query > tr.length){
            res.json("Valor de busca Invalido!!")
        }
        
        for(var i=1;i <tr;i++){
            var resultado = tabela.querySelectorAll("tr")[i]

            var rank = resultado.querySelector(".rank")
            var username = resultado.querySelector(".username")
            var highlight = resultado.querySelector(".stat.highlight")
            var collapse = resultado.querySelector(".stat.collapse")

           ranking[i] = {

                "Rank": rank.textContent.trim(),
                "Player": username.textContent.trim(),
                "K/D": highlight.textContent.trim(),
                "Rounds Played": collapse.textContent.trim()
                
           } 
           
           if(ranking[i].Rank == query){

            console.log(ranking[i])
            res.json(ranking[i])
           }
        } 
    })
})

module.exports = router