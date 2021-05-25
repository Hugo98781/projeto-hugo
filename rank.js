const express = require('express')
const axios = require('axios').default
const parser = require ('node-html-parser').parse
const router = express.Router()


router.get('/rank', function(req, res){

    
    const ranking = []

    var url="https://battlefieldtracker.com/bfv/leaderboards/stats/origin/KdRatio?country=br&page=1"
    var requisicao = axios.get(url)
    
    requisicao.then(function(resposta){
        
        var document = parser(resposta.data)
        var tabela = document.querySelector("table")
        var tr = tabela.querySelectorAll("tr").length
        
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
           
           
        }
        console.log(ranking)
        res.json(ranking)
        
    })

})

module.exports = router