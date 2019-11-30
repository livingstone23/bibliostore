import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';


//Componentes
import Suscriptores from './components/subscriptores/Suscriptores';
import NuevoSuscriptor from './components/subscriptores/NuevoSuscriptor';
import MostrarSuscriptor from './components/subscriptores/MostrarSuscriptor';
import EditarSuscriptor from './components/subscriptores/EditarSuscriptor';

import Libros from './components/libros/Libros';
import EditarLibro from './components/libros/EditarLibro';
import MostrarLibro from './components/libros/MostrarLibro';
import NuevoLibro from './components/libros/NuevoLibro';
import PrestamoLibro from './components/libros/PrestamoLibro';


//Navegacion
import Navbar from './components/layout/Navbar';


function App() {
  return (
   <Provider store={store}>
      <Router>
        <Navbar />
        <div className="container">
          <Switch>

                <Route exact path="/libros" component={Libros} />
                <Route exact path="/libros/mostrar/:id" component={MostrarLibro} />
                <Route exact path="/libros/nuevo" component={NuevoLibro} />
                <Route exact path="/libros/editar/:id" component={EditarLibro} />
                <Route exact path="/libros/prestamo/:id" component={PrestamoLibro} />

                <Route exact path="/suscriptores" component={ Suscriptores }/>
                <Route exact path="/suscriptores/nuevo" component={ NuevoSuscriptor }/>
                <Route exact path="/suscriptores/mostrar/:id" component={ MostrarSuscriptor }/>
                <Route exact path="/suscriptores/editar/:id" component={ EditarSuscriptor }/>
                
          </Switch>
        </div>
      </Router>
   </Provider>
    


  );
}

export default App;
