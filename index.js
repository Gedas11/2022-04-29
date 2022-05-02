// import express from 'express'
// import {dirname} from 'path'
// import { fileURLToPath } from 'url'
// import fs from 'fs/promises'

// //Express objekto inicijavimas
// const app = express()
// const __dirname = dirname(fileURLToPath(import.meta.url))
// const credentials = {
//   login: 'gedas@bit.lt',
//   password: 'taram12345'
// }

// app.get('/', (req, res) => {
//     //res.status(404) - Grąžinamas užklausos statusas
//     //res.send('<form><input /></form>') - Hardkodintas html kodas 

//     res.sendFile(__dirname + '/templates/forma.html')
// })

// app.get('/client-submit', async (req, res) => {
//     //https://domenas.com/?parametras=Test&parametras2=Gavom%20antra%20parametra
//     //Pries Pirma parametra visuomet zymimas klaustuko simbolis, o po jo, kiekvienas parametras zymimas & simboliu
//     //req.query perduodami url query parametrai

//     if(parseInt( Object.keys(req.query).length ) > 0) {
//       if(
//         req.query.login != '' &&
//         req.query.password != '' &&
//         req.query.login === credentials.login &&
//         req.query.password === credentials.password
//       ) {
//         res.redirect('http://localhost:3000/clients')
//       } else {
//         res.send('Neteisingi prisijungimo duomenys')
//       }

//     } else {
//       res.redirect('http://localhost:3000/') //Peradresavimas
//     }
// })

// app.get('/clients', (req, res) => {
//   //let database 

//   // let html = '<table>'
//   //   database.forEach(value => {
//   //     html += '<tr>'
//   //     html += '<td></td>'
//   //     html += '<td></td>'
//   //     html += '<td></td>'
//   //     html += '<td></td>'
//   //     html += '<td></td>'
//   //     html += '</tr>'
//   //   })
//   // html += '</table>'
//   res.send('Klientai') 
// })

// app.get('/params/:perduodamas', (req, res) => {
//   //req.params perduodami parametrai irasyti po pasvyrojo bruksnio adrese
//   //req.query perduodami url query parametrai

//   console.log(req.params.perduodamas)
//   res.send('<h1>Params</h1>')
// })

// //Metodai kuriuos naudosime siame kurse
// //.get()
// //.post()
// //.delete()
// //.put()

// //Sukuria serveri priskiriant jam routerius
// app.listen(3000)

// Antra dalis:
// Išssaugokite užpildytus duomenis database.json faile. 
// Sukurkite routerį "/clients", kuriame atvaizduokite database.json failo turinį. 

// Trečia dalis
// Patobulinkite "/clients" routerį ir apdorokite database.json failo turinį paversdamį stringą į objektą ir visas reikšmes patalpinkite lentelėje.

import express from 'express'
import {dirname} from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs/promises'

//Express objekto inicijavimas
const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/templates/forma.html')
})

app.get('/client-submit', async (req, res) => {
    if(parseInt( Object.keys(req.query).length ) > 0) {

      let json = []

      try {
          const data = await fs.readFile('./database.json', 'utf8')

          let parsedJson = JSON.parse(data)

          parsedJson.push(req.query)

          json = parsedJson
      
      } catch {
          json.push(req.query)

          console.log('Duomenu bazes failas sukurtas')
      }
      
      //Informacijos issaugojimas faile
      
      await fs.writeFile('./database.json', JSON.stringify(json))

      res.send('Duomenys sėkmingai priimti')
    } else {
      res.send('Nėra gauta jokių duomenų')
    }
})

app.get('/clients', async (req, res) => {
  const data = await fs.readFile('./database.json', 'utf8')

  let masyvas = JSON.parse(data)
  let html = `<table>
              <thead>
                <th>Vardas</th>
                <th>Pavardė</th>
                <th>Adresas</th>
                <th>Telefonas</th>
                <th>El. paštas</th>
              </thead> 
              <tbody>           
              `
  
    masyvas.forEach(value => {
      html +=  `<tr>
                  <td>${value.vardas}</td>
                  <td>${value.pavarde}</td>
                  <td>${value.adresas}</td>
                  <td>${value.telefonas}</td>
                  <td>${value.elpastas}</td>
                </tr>`
    })

  html += '</tbody></table>'

  res.send(html)
})

//Sukuria serveri priskiriant jam routerius
app.listen(3000)