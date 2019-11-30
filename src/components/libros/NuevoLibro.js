import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';


class NuevoLibro extends Component {

    //Definicion del codigo inicial
    state = { 
        titulo: '',
        ISBN: '',
        editorial: '',
        existencia: '',
        prestados: []
    }

    //Agregar un nuev o libro a la base de datos
    agregarLibro = e => {
        e.preventDefault();

        //extraer los valores del state
        const nuevoLibro = { ...this.state };

        //extraer firestore de props
        const { firestore, history } = this.props

        //Guardar en la base de datos
        firestore.add({ collection: 'libros'}, nuevoLibro)
            .then( () => history.push('/libros') )
    }

    //Extra los valorers del input y los coloca en el state
    leerData = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }


    render() {
        return (
           <div className="row">
               <div className="col-12 mb-4">
                   <Link to="/libros" className="btn btn-secondary">
                       <i className="fas fa-arrow-circle-left"></i>{' '}
                       Volver al Listado 
                   </Link>
               </div>
           
                <div className="col-12">
                    <h2>
                        <i className="fas fa-book"></i>{' '}
                        Nuevo Libro
                    </h2>
                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">
                            <form
                                onSubmit={this.agregarLibro}
                            >
                                <div className="form-group">
                                    <label>Titulo:</label>
                                    <input 
                                            type="text"
                                            className="form-control"
                                            name="titulo"
                                            placeholder="Titulo o Nombre del Libro"
                                            required
                                            onChange={this.leerData}
                                            value={this.state.titulo}
                                            
                                            
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Editorial:</label>
                                    <input 
                                            type="text"
                                            className="form-control"
                                            name="editorial"
                                            placeholder="Editorial del Libro"
                                            required
                                            onChange={this.leerData}
                                            value={this.state.editorial}
                                            
                                    />
                                </div>

                                <div className="form-group">
                                    <label>ISBN:</label>
                                    <input 
                                            type="text"
                                            className="form-control"
                                            name="ISBN"
                                            placeholder="ISBN del Libro"
                                            required
                                            onChange={this.leerData}
                                            value={this.state.ISBN}
                                           
                                            
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Existencia:</label>
                                    <input 
                                            type="number"
                                            min="0"
                                            className="form-control"
                                            name="existencia"
                                            placeholder="Cantidad en existencia"
                                            required
                                            onChange={this.leerData}
                                            value={this.state.existencia}
                                            
                                            
                                    />
                                </div>

                                    <input type="submit" value="Agregar Libro" className="btn btn-success" />
                                    
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

NuevoLibro.propTypes ={
    firestore : PropTypes.object.isRequired,
}

export default firestoreConnect()( NuevoLibro );