const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const googleMapsKey = 'AIzaSyAwSQzeRvW2Tyl6G-p6yWedTWs372rd_F0';

const url = `https://maps.googleapis.com/maps/api/js?key=${googleMapsKey}`;

router.get('/', (req, res) => {
   if(req.isAuthenticated()){
        console.log('googleMaps get url ', url);
        let queryText = 'SELECT "lat", "lng" FROM "story";';
        pool.query(queryText)
        .then((result) => {
            getMap = {
                result: result.rows,
                url: url,
            }
            res.send(getMap);
        }).catch((error) => {
            res.sendStatus(500);
        });
    }
});

router.get('/latLong', (req, res) => {
  //  if(req.isAuthenticated()){
        console.log('latLong route ', req.query.name);
        let queryText = 'SELECT "lat", "lng" FROM "story" WHERE "id" = $1;';
        pool.query(queryText, [req.query.name])
        .then((result) => {            
            let lat = parseFloat(result.rows[0].lat);
            let long = parseFloat(result.rows[0].lng);
            console.log('staticMap result.rows ', lat, long);
            let urlStatic = `http://maps.googleapis.com/maps/api/staticmap?&size=300x200&zoom=10&style=visibility:on&style=feature:water|element:geometry|visibility:on&style=feature:landscape|element:geometry|visibility:on&markers=anchor:center|icon:https://bit.ly/30zAhoz|${lat},${long}&key=${googleMapsKey}`;
            console.log('googleMapsRouter latLong result', urlStatic);
            res.send(urlStatic);
        })
        .catch((error) => {
           res.sendStatus(500);
        }); 
  //  }
});

module.exports = router;