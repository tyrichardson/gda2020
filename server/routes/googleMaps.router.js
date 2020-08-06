const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const googleMapsKey = 'AIzaSyAwSQzeRvW2Tyl6G-p6yWedTWs372rd_F0';

const url = `https://maps.googleapis.com/maps/api/js?key=${googleMapsKey}`;

router.get('/', (req, res) => {
    if(req.isAuthenticated()){
        console.log('googleMaps get url ', url);
        res.send(url);
    }
});

router.get('/latLong', (req, res) => {
  //  if(req.isAuthenticated()){
        console.log('latLong route ', req.query.name);
        let queryText = 'SELECT "lat", "long" FROM "story" WHERE "id" = $1;';
        pool.query(queryText, [req.query.name])
        .then((result) => {
            let lat = parseFloat(result.rows[0].lat);
            let long = parseFloat(result.rows[0].long);
            console.log('staticMap result.rows ', lat, long);
            let urlStatic = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=6&size=400x400&scale=1&format=png&maptype=terrain&key=${googleMapsKey}`;
            console.log('googleMapsRouter latLong result', urlStatic);
            res.send(urlStatic);
        })
        .catch((error) => {
           res.sendStatus(500);
        }); 
  //  }
});

module.exports = router;