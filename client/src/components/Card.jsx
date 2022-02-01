import React from "react";
import './Card.css'

export default function Card({name, img, temperament, temperaments, id}){
  // console.log(temperament)

    return(
        <div key={id} className="card">
            <div className="">
              <h3>{name}</h3>
            </div>
            <div>
              <img src={img} alt='img not found' className="img"/>
            </div>
            <u>Temperament</u> <br />
            {temperament
              ? temperament.map((el) => "  " + el + "")
              : temperaments?.map((el) => el.name + ",")}
              
        </div>
    )
}