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

const staticMapIcon = `https://lh3.googleusercontent.com/-uJSgG2XuCgOzzlU3n5P8lYeRfIcv41nx-3lMFYqS53m4ITg3s27wGFkLgb7FwawMQb-rPQH_f4PIfG4xjBwv8ZU19ElhYGcOVlZtyGzkQ0feJfp81eyzXMiygoXWAZDs_zub_CDazw6UaMhrUYpGyrEEKQ_8LW39Cz9mXM_GfO7EdVfDsuq76lVipBGrOIgORlfdROaTJu4mmzCH2okmAptWhJ5SxkfNvhbEcqHPqQzgbM-40Jm4W7RfCmwDnp3nKWAc1335t1CqKA402gbV6nrjBmvtf4SQOVW0A0HFvPpFjYFizx3v4xRGfqZBJdAQy5OU3MdoEyfIXDNV3AOSxG-RozmzEwSt4InkgVKYNgy4JodIZ_LOsVvWwVEecN9Topf47AwNAmvuwm5G_fL4sx__oGkk6Bypa0PxFu9La17PlqBHiHi3iJsKxUwIVZhMl_7ucQvKnw3pobbZFiI4tJILLbBMBlXNnyIKxMRe5t-f4LyvBNFa_FNvuJx1sbogWUk-eJoJfqdci8SGv2Oid7MS3PRy0Gxo4qI9jrWDaYT7KGdN5QeF1YaF2QTSHQkar65YP3ivziddgF9g7Uy0H0G0V9DZZnnxcuADkPKmkCQ8Z9Lp_R40MCmTX0P7lW5tOFp0djMfTV8u_2HXszUzfYbbXCNOTf2iqTXG9JyKtlhVMFoki2W0Ef8o8U0LA=s64-no?authuser=0`

router.get('/latLong', (req, res) => {
        console.log('latLong route ', req.query.name);
        let queryText = 'SELECT "lat", "lng" FROM "story" WHERE "id" = $1;';
        pool.query(queryText, [req.query.name])
        .then((result) => {            
            let lat = parseFloat(result.rows[0].lat);
            let long = parseFloat(result.rows[0].lng);
            console.log('staticMap result.rows ', lat, long);
            let urlStatic = `http://maps.googleapis.com/maps/api/staticmap?&size=300x200&zoom=10&style=visibility:on&style=feature:water|element:geometry|visibility:on&style=feature:landscape|element:geometry|visibility:on&markers=anchor:center|icon:${staticMapIcon}|${lat},${long}&key=${googleMapsKey}`;
            console.log('googleMapsRouter latLong result', urlStatic);
            res.send(urlStatic);
        })
        .catch((error) => {
           res.sendStatus(500);
        }); 
});

module.exports = router;