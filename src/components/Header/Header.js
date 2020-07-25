import React from 'react';
import {InlineShareButtons} from 'sharethis-reactjs';

//title comes from App.js

const Header = ({ title }) => (
  <div className="header">
    <div>
      <h1 className="appTitle">{ title }</h1>

        <InlineShareButtons
          config={{
            alignment: 'left',  // alignment of buttons (left, center, right)
            enabled: true,        // show/hide buttons (true, false)
            font_size: 16,        // font size for the buttons
            labels: 'cta',        // button labels (cta, counts, null)
            language: 'en',       // which language to use (see LANGUAGES)
            networks: [           // which networks to include (see SHARING NETWORKS)
              'whatsapp',
              'messenger',
              'facebook',
              'twitter'
            ],
            padding: 12,          // padding within buttons (INTEGER)
            radius: 4,            // the corner radius on each button (INTEGER)
            show_total: false,
            size: 40,             // the size of each button (INTEGER)
 
            // OPTIONAL PARAMETERS
            url: 'https://mighty-ridge-81043.herokuapp.com/', // (defaults to current url)
            image: '',  // (defaults to og:image or twitter:image)
            description: 'Good Deeds Anonymous',       // (defaults to og:description or twitter:description)
            title: 'Good Deeds Anonymous',            // (defaults to og:title or twitter:title)
            message: 'Good Deeds Anonymous',     // (only for email sharing)
            subject: 'Good Deeds Anonymous',  // (only for email sharing)
            //username: 'custom twitter handle' // (only for twitter sharing)
          }}
        />
    </div>
    <div>
      <p>We all benefit from hearing about good things we do for each other.</p>
      <p>To share your stores, click Sign In and register -- anonymously.</p>
    </div>

  </div>
);

export default Header;
