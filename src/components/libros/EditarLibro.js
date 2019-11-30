import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Spinner from '../layout/Spinner';

class EditarLibro extends Component {

//crear los refs
tituloInput = React.createRef();
ISBNInput = React.createRef();
editorialInput = React.createRef();
existenciaInput = React.createRef();

    //Edita el libro en la Base de datos
    editarLibro = e => {
        e.preventDefault();

        //Crear el objeto que va a actualizar
        const libroActualizado = {
            titulo : this.tituloInput.current.value,
            ISBN : this.ISBNInput.current.value,
            editorial : this.editorialInput.current.value,
            existencia : this.existenciaInput.current.value,
            prestados : [],

        }

        //Extraer firestore, history  de props
        const { libro, history, firestore } = this.props

        //Almacenar en la bse de datos con firestore
        firestore.update({
            collection: 'libros',
            doc: libro.id
        }, libroActualizado ).then( history.push('/libros') )


    }

    render() {

        const { libro } = this.props;

        if( !libro ) return <Spinner /> 

        return (



            <div className="row">
                
                <div className="col-12 mb-4">
                    <Link to={'/libros'} className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left"></i>
                    Volver al Listado
                    </Link>
                </div>

                <div className="col-12">
                    <h2>
                        <i className="fas fa-user"></i>{' '}
                        Editar Libro
                    </h2>
                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">
                            <form
                                onSubmit={this.editarLibro}
                            >
                                <div className="form-group">
                                    <label>Titulo:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="titulo"
                                        placeholder="Titulo del libro"
                                        required
                                        ref={this.tituloInput}
                                        defaultValue={libro.titulo}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>ISBN:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="ISBN"
                                        placeholder="ISBN del libro"
                                        required
                                        ref={this.ISBNInput}
                                        defaultValue={libro.ISBN}
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <label>Editorial:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="editorial"
                                        placeholder="Nombre del Editorial"
                                        required
                                        ref={this.editorialInput}
                                        defaultValue={libro.editorial}
                                        
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Código:</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="existencia"
                                        placeholder="Existencia de libros"
                                        required
                                        ref={this.existenciaInput}
                                        defaultValue={libro.existencia}
                                        
                                    />
                                </div>
                                
                                <input 
                                    type="submit"
                                    value="Editar Libro"
                                    className="btn btn-success"
                                />

                            </form>
                        </div>
                    </div>
                </div>
            </div>
            

        );
    }
}


EditarLibro.propTypes ={
    firestore : PropTypes.object.isRequired
}

export default compose(
    firestoreConnect( props => [
        {
            collection: 'libros',
            storeAs : 'libro',
            doc : props.match.params.id
        }
    ]),
    connect(({ firestore: { ordered }}, props) =>({
        libro : ordered.libro && ordered.libro[0]
    }))

)(EditarLibro);