import Head from 'next/head';
import App from '../App.js';

export default () => { 
  return (
  <div>
    <Head>
      <title>Silly little tracker</title>
      <meta charset="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
      <link href="https://fonts.googleapis.com/css?family=Questrial|Roboto" rel="stylesheet" />
    </Head>
    <App />
    <style jsx global>{`
      body {
        background: #34A7E8;
        color: #FAFBFB;
        font-family: 'Questrial', sans-serif;
        max-height: 100%;
      }
    `}</style>
  </div>
  )
}


