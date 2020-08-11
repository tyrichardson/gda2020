import React from 'react';
import './Footer.css'

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const Footer = () => (
  <footer>
    <h4>"How far that little candle throws his beams! So shines a good deed in a weary world.”</h4>
    <h5>Attributions</h5>
    <p className="footerP">latitudes and longitudes provided via ZIP codes from: <br />
    <a href="http://public.opendatasoft.com/explore/dataset/us-zip-code-latitude-and-longitude/api">public.opendatasoft.com/explore/dataset/us-zip-code-latitude-and-longitude/api</a></p>
  </footer>
);

export default Footer;
