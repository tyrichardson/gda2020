import React from 'react';
import {InlineShareButtons} from 'sharethis-reactjs';
import '../App/App.css';

//title comes from App.js

const Sharing = () => (
  <div id="sharethis">
  <div className="sharethis-inline-share-buttons">
    <InlineShareButtons
      config={{
        alignment: 'left',  // alignment of buttons (left, center, right)
        enabled: true,        // show/hide buttons (true, false)
        font_size: 12,        // font size for the buttons
        labels: 'null',        // button labels (cta, counts, null)
        language: 'en',       // which language to use (see LANGUAGES)
        networks: [           // which networks to include (see SHARING NETWORKS)
          'facebook',
          'twitter',
          'email',
        ],
        padding: 12,          // padding within buttons (INTEGER)
        radius: 4,            // the corner radius on each button (INTEGER)
        show_total: false,
        size: 40,             // the size of each button (INTEGER)

        // OPTIONAL PARAMETERS
        url: 'https://quiet-tor-41840.herokuapp.com/#/readPage', // (defaults to current url)
        image: `https://lh3.googleusercontent.com/-uJSgG2XuCgOzzlU3n5P8lYeRfIcv41nx-3lMFYqS53m4ITg3s27wGFkLgb7FwawMQb-rPQH_f4PIfG4xjBwv8ZU19ElhYGcOVlZtyGzkQ0feJfp81eyzXMiygoXWAZDs_zub_CDazw6UaMhrUYpGyrEEKQ_8LW39Cz9mXM_GfO7EdVfDsuq76lVipBGrOIgORlfdROaTJu4mmzCH2okmAptWhJ5SxkfNvhbEcqHPqQzgbM-40Jm4W7RfCmwDnp3nKWAc1335t1CqKA402gbV6nrjBmvtf4SQOVW0A0HFvPpFjYFizx3v4xRGfqZBJdAQy5OU3MdoEyfIXDNV3AOSxG-RozmzEwSt4InkgVKYNgy4JodIZ_LOsVvWwVEecN9Topf47AwNAmvuwm5G_fL4sx__oGkk6Bypa0PxFu9La17PlqBHiHi3iJsKxUwIVZhMl_7ucQvKnw3pobbZFiI4tJILLbBMBlXNnyIKxMRe5t-f4LyvBNFa_FNvuJx1sbogWUk-eJoJfqdci8SGv2Oid7MS3PRy0Gxo4qI9jrWDaYT7KGdN5QeF1YaF2QTSHQkar65YP3ivziddgF9g7Uy0H0G0V9DZZnnxcuADkPKmkCQ8Z9Lp_R40MCmTX0P7lW5tOFp0djMfTV8u_2HXszUzfYbbXCNOTf2iqTXG9JyKtlhVMFoki2W0Ef8o8U0LA=s64-no?authuser=0`,  // (defaults to og:image or twitter:image)
        description: 'Good Deeds Anonymous is a web-development project by Ty Richardson hosted on heroku.com',       // (defaults to og:description or twitter:description)
        title: 'Sharing Good Deeds Anonymous, a web-development project by Ty Richardson hosted on heroku.com',            // (defaults to og:title or twitter:title)
        message: '"So shines a good deed in a weary world: " https://quiet-tor-41840.herokuapp.com/#/readPage',     // (only for email sharing)
        subject: 'Sharing Good Deeds Anonymous, a web-development project by Ty Richardson hosted on heroku.com'  // (only for email sharing)
        //username: 'custom twitter handle' // (only for twitter sharing)
      }}
    />
  </div>
  </div>
);

export default Sharing;
