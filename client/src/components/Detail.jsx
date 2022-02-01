import React from "react";
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { getDetail, getTemperaments } from "../actions";
import { useEffect } from "react";

export default function Detail(props){
    const dispatch = useDispatch();
    const DogDetail = useSelector((state) => state.detail)
    // const temperaments = useSelector((state)=> state.temperaments)
    const {id} = useParams();
    

    useEffect(()=> {
        dispatch(getDetail(id));
        dispatch(getTemperaments());
    }, [dispatch])


    return(
        <div>
            {
                DogDetail.length > 0 ?
                <div>
                    <h1>{DogDetail[0].name}</h1>
                    <img src={DogDetail[0].img? DogDetail[0].img : DogDetail[0].image}/>
                    <ul>
                        <li>
                            <h4>Height: {DogDetail[0]?.height + ' cm'}</h4>
                        </li>
                        <li>
                            <h4>Weight: {DogDetail[0]?.weight + ' kg'}</h4>
                        </li>
                        <li>
                            <h4>Life Span: {DogDetail[0]?.life_span}</h4>
                        </li>
                        
                        <li>
                            <h4>Temperament: {DogDetail[0]?.temperament? DogDetail[0].temperament.map(e=> e + " ") :
                                DogDetail[0]?.temperaments?.map(e=> e.name + " ")}
                            </h4>
                        </li>
                    </ul>
                </div>
             : 
            (<p>Loading...</p>
            )}
            <Link to='/home'>
              <button className="button">back Home</button>
            </Link>

        </div>
    )
}