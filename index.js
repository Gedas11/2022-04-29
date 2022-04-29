import express from 'express'
import {dirname} from 'path'
import { fileURLToPath } from 'url'

//Express objekto inicijavimas
const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))
const credentials = {
  login: 'vilius@bit.lt',
  password: 'labas1234'
}

app.get('/', (req, res) => {
    //res.status(404) - Grąžinamas užklausos statusas
    //res.send('<form><input /></form>') - Hardkodintas html kodas 

    res.sendFile(__dirname + '/templates/forma.html')
})

app.get('/login-submit', (req, res) => {
    //https://domenas.com/?parametras=Test&parametras2=Gavom%20antra%20parametra
    //Pries Pirma parametra visuomet zymimas klaustuko simbolis, o po jo, kiekvienas parametras zymimas & simboliu
    //req.query perduodami url query parametrai

    if(parseInt( Object.keys(req.query).length ) > 0) {
      if(
        req.query.login != '' &&
        req.query.password != '' &&
        req.query.login === credentials.login &&
        req.query.password === credentials.password
      ) {
        res.redirect('http://localhost:3000/clients')
      } else {
        res.send('Neteisingi prisijungimo duomenys')
      }

    } else {
      res.redirect('http://localhost:3000/') //Peradresavimas
    }
})

app.get('/clients', (req, res) => {
  //let database 

  // let html = '<table>'
  //   database.forEach(value => {
  //     html += '<tr>'
  //     html += '<td></td>'
  //     html += '<td></td>'
  //     html += '<td></td>'
  //     html += '<td></td>'
  //     html += '<td></td>'
  //     html += '</tr>'
  //   })
  // html += '</table>'
  res.send('Klientai') 
})

app.get('/params/:perduodamas', (req, res) => {
  //req.params perduodami parametrai irasyti po pasvyrojo bruksnio adrese
  //req.query perduodami url query parametrai

  console.log(req.params.perduodamas)
  res.send('<h1>Params</h1>')
})

//Metodai kuriuos naudosime siame kurse
//.get()
//.post()
//.delete()
//.put()

//Sukuria serveri priskiriant jam routerius
app.listen(3000)