import React from "react";
import {Link} from 'react-router-dom';
import './Landing.css'

export default function LandingPage() {
    return(
        <div className="entry">
            <h1 className="text">Bienvenidos</h1>
            <div className="wrap">
             <Link to= '/home'>
                 <button className="button">Ingresar</button>
             </Link>
            </div>
        </div>
    )
}