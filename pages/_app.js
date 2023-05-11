// Carga de estilos
import 'bootstrap/dist/css/bootstrap.css';
import '../node_modules/boxicons/css/boxicons.min.css'
import '../styles/globals.css'
import '../styles/header.css'
import '../styles/tvprogramme.css'

// Componentes
import Header from '../components/Header/Main'

// Redux
import { Provider } from 'react-redux'
import { store } from '../slices/index'

import { useEffect } from 'react';


function MyApp({ Component, pageProps }) {

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <Provider store={store}>
      <Header/>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
