import { createStore, combineReducers, compose } from 'redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';

//Configurar firestore
const firebaseConfig = {
    apiKey: "AIzaSyAgRBT2vKOwp9vcyl3XOa-6gNTF3G7SZjE",
    authDomain: "bibliostore-705a6.firebaseapp.com",
    databaseURL: "https://bibliostore-705a6.firebaseio.com",
    projectId: "bibliostore-705a6",
    storageBucket: "bibliostore-705a6.appspot.com",
    messagingSenderId: "1050260422587",
    appId: "1:1050260422587:web:cddb8ba705a166c8330e9e",
    measurementId: "G-R2LPNEF8GR"
}


//Inicializar firebase
firebase.initializeApp(firebaseConfig);


//Configuracion de react-redux
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true
}

//crear el enhancer con compose de redux y firestore
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
)(createStore);

// Reducers
//TODO: Revisar proyectos 
const rootReducer = combineReducers({
    firebase : firebaseReducer,
    firestore : firestoreReducer
})

//state inicial
const initialState = {};


//Create el store
const store = createStoreWithFirebase(rootReducer, initialState, compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;



























