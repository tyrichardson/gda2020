import React from 'react';
import {InlineShareButtons} from 'sharethis-reactjs';
import '../App/App.css';

//title comes from App.js

const Sharing = () => (
  <div className="sharing">
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
        url: '', // (defaults to current url)
        image: '',  // (defaults to og:image or twitter:image)
        description: 'Sharing from Good Deeds Anonymous',       // (defaults to og:description or twitter:description)
        title: '',            // (defaults to og:title or twitter:title)
        message: '"So shines a good deed in a weary world."',     // (only for email sharing)
        subject: 'Sharing from Good Deeds Anonymous',  // (only for email sharing)
        //username: 'custom twitter handle' // (only for twitter sharing)
      }}
    />
  </div>
);

export default Sharing;
