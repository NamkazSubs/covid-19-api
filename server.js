const express = require('express')
const app = express()
const port = 4000
const axios = require('axios')
let corona = 'https://api.kawalcorona.com/'
let covid = 'https://covid19.mathdro.id/api/countries/'
const path = require('path')



app.get('/region', function(req, res) {

    var data = []
    axios.get(corona+'')
    .then(function (response) {
        response.data.forEach(element => {

            console.log(element.attributes.Country_Region)
            var nama_negara = element.attributes.Country_Region
            var positiv = element.attributes.Confirmed
            var sembuh = element.attributes.Recovered
            var meninggal = element.attributes.Deaths

            data_array = 
                {
                    'nama_negara': nama_negara,
                    'terkonfirmasi': positiv,
                    'sembuh': sembuh,
                    'meninggal': meninggal
                }
            
            data.push(data_array)
            
        });
        res.json(data)
    })
    .catch(function (error) {
        res.send('Data Tidak Bisa Di Muat, Mohon Tunggu Beberapa Saat Lagi...')
    //   console.log(error);
    })

})




app.get('/region/:negara', function(req, res) {
    var negara = req.params.negara


    axios.get(covid+negara)
    .then(function (response) {
        var data = 
                {
                    'nama_negara': negara,
                    'terkonfirmasi': response.data.confirmed.value,
                    'sembuh': response.data.recovered.value,
                    'meninggal': response.data.deaths.value
                }

        res.json(data)
        // console.log(response.data);
    })
    .catch(function (error) {
        // handle error
        // console.log(error)
       res.send('Data Tidak Ditemukan Di Database JHU')
    })

})



app.get('/region/indonesia/provinsi', function(req, res) {
    
    var data = []
    axios.get(corona+'indonesia/provinsi')
    .then(function (response) {

        response.data.forEach(element => {

            // console.log(element.attributes)
            var provinsi = element.attributes.Provinsi
            var positiv = element.attributes.Kasus_Posi
            var sembuh = element.attributes.Kasus_Semb
            var meninggal = element.attributes.Kasus_Meni

            data_array = 
                {
                    'provinsi': provinsi,
                    'kasus_positiv': positiv,
                    'kasus_sembuh': sembuh,
                    'kasus_kematian': meninggal
                }
            
            data.push(data_array)
        });
        res.json(data)
    })
    .catch(function (error) {
        res.send('Data Tidak Bisa Di Muat, Mohon Tunggu Beberapa Saat Lagi...')
    })
})

app.get('', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
})


app.get('*', function(req, res){
    res.send('Halaman Tidak Bisa Dimuat')
});
  

app.listen(port, () => console.log(`Berjalan Di port 4000`))