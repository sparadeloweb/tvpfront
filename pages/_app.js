// Carga de estilos
import 'bootstrap/dist/css/bootstrap.css';
import '../node_modules/boxicons/css/boxicons.min.css'
import 'nprogress/nprogress.css';
import '../styles/globals.css'
import '../styles/header.css'
import './programme/styles.css';
import '../styles/tvprogramme.css'

// Componentes
import Header from '../components/Header/Main'
import Footer from '../components/Footer/Main';

// Redux
import { Provider } from 'react-redux'
import { store } from '../slices/index'

import { useEffect } from 'react';

// Google Analytics
import { GoogleAnalytics } from "nextjs-google-analytics";

import Head from 'next/head';

// Cambios de Rutas
import Router from 'next/router';
import NProgress from 'nprogress';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

// Transiciones de páginas
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function MyApp({ Component, pageProps, router }) {
  return (
    <Provider store={store}>
      <Head>
        <link rel="icon" href="/img/favicon.png" />
      </Head>
      <GoogleAnalytics trackPageViews />
      <Header />
      <TransitionGroup>
        <CSSTransition
          key={router.route}
          classNames="page-transition"
          timeout={300}
        >
          <Component {...pageProps} />
        </CSSTransition>
      </TransitionGroup>
      <Footer />
    </Provider>
  );
}


export default MyApp
