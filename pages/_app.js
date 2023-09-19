// Carga de estilos
import 'bootstrap/dist/css/bootstrap.css';
import '../node_modules/boxicons/css/boxicons.min.css'
import '../styles/globals.css'
import '../styles/header.css'
import '../styles/tvprogramme.css'

// Componentes
import Header from '../components/Header/Main'
import Footer from '../components/Footer/Main';

// Redux
import { Provider } from 'react-redux'
import { store } from '../slices/index'

import { useEffect } from 'react';

// Estilos Programme Individual
import './programme/styles.css';

// Google Analytics
import { GoogleAnalytics } from "nextjs-google-analytics";

import Head from 'next/head';


function MyApp({ Component, pageProps }) {

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <Provider store={store}>
      <Head>
        <link rel="icon" href="/img/favicon.png" />
      </Head>
      <GoogleAnalytics trackPageViews />
      <Header/>
      <Component {...pageProps} />
      <Footer/>
    </Provider>
  )
}

export default MyApp
