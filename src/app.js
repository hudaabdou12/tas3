 
  const express = require ("express")

  const app = express()
   
  const port = process.env.port || 3000

  const path = require("path")
  
  const publicDirectory = (path.join(__dirname ,'../public'))
  app.use(express.static(publicDirectory))
 
  app.set('view engine' , 'hbs');

  const viewsDirectory = path.join (__dirname , '../temp1/views')
  app.set('views', viewsDirectory);
 
  var hbs = require('hbs');

 const partialsPath = path.join(__dirname , "../temp1/partials")
 hbs.registerPartials(partialsPath)


  app.get('/' , (req , res) => {
    res.render('index',{

    })
  })


const forcast = require ('./tools/forecast')
const geodata = require ('./tools/geocode')
app.get('/weather', (req, res) => {
  if (!req.query.address) {
      return res.send({
          error: 'you mast provide address'
      })
  }
  geodata(req.query.address, (error, data) => {

      if (error) {
          return res.send({ error })
      }
      forcast(data.longitude, data.latitude, (error, forcastData) => {
          if (error) {
              return res.send({ error })
          }
          res.send({
              forcast: forcastData,
              location: req.query.address,
              longitude: data.longitude,
              latitude:data.latitude
              
          })
      })
  })
})
 

  app.listen(port, () => {
    console.log(`app is listeing on port  ${port}`)
})

