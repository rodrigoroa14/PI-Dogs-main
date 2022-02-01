import React from "react";
import './Paginado.css';


export default function Paginado ({dogsPerPage, allDogs, paginado}){
    const PageNumbers = []
    for(let i=1; i<= Math.ceil(allDogs/dogsPerPage);i++){
        PageNumbers.push(i)
    }

    return(
        <nav>
            <ul className="ul">
                {PageNumbers && PageNumbers.map(num => (    
                    <li key={num}>
                    <a className="container" onClick={()=>paginado(num)}>{num}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}