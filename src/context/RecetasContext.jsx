import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const RecetasContext = createContext();

const RecetasProvider = (props) => {

    const [recetas, guardaRecetas] = useState([]);
    const [busqueda, buscarReceta ] = useState({
        nombre: '',
        categoria: ''
    });
    
    const [ consultar, guardarConsultar ] = useState(false);

    const {nombre, categoria } = busqueda;

    useEffect(() => {

        if(consultar){
            const obtenerRecetas = async () => {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;
                
                const resultado = await axios.get(url);
                guardaRecetas(resultado.data.drinks)
            }
            obtenerRecetas();
        }      
    }, [busqueda, categoria, consultar, nombre])
    
    return ( 
        <RecetasContext.Provider
            value={{
                buscarReceta,
                guardarConsultar,
                recetas
            }}
        >
            {props.children}
        </RecetasContext.Provider>

     );
}
 
export default RecetasProvider;