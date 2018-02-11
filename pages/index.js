import Head from 'next/head';
import Geolocator from '../geolocator.js';

export default () => { 
  return (
  <div>
    <Head>
      <title>Silly little tracker</title>
      <meta charset="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
      <link href="https://fonts.googleapis.com/css?family=Questrial|Roboto" rel="stylesheet" />
    </Head>
    <Geolocator />
    <style jsx global>{`
      h1, h2, h3, h4, h5 {
        font-family: 'Questrial', sans-serif;
      }

      body {
        font-family: 'Roboto', sans-serif;
      }
    `}</style>
  </div>
  )
}


