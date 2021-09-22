request = require('request');
const graph = require('fbgraph');
const e = require('express');
const axios = require('axios')

const postFetch = (req, res) => {

  graph.get("me?fields=name,email,gender,birthday", function (err, response) {

    console.log('---response---', response)
    res.send(response)
  })

}
module.exports = postFetch