import React from "react";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getDogs, filterCreated, orderByName, getTemperaments, filterByTemperament, orderByWeight} from '../actions';
import {Link} from 'react-router-dom';
import Card from './Card';
import Paginado from "./Paginado.jsx";
import './Paginado.css'
import './Home.css'
import './Landing.css'
import './DogCreate.css'
import SearchBar from "./SearchBar";






export default function Home () {
    const dispatch = useDispatch();
    const allDogs = useSelector((state)=> state.dogs);
    const temperaments = useSelector((state) => state.temperaments);
    // console.log(temperaments)
    const [temperament, setTemperament] = useState('All')
    const [currentPage, setCurrentPage] = useState(1)
    const [orden, setOrden] = useState('')
    const [dogsPerPage, setDogsPerPage] = useState(8)
    const indexOfLastDog = currentPage * dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)

    const paginado = (numPage) => {
        setCurrentPage(numPage)
    }

    useEffect(()=> {
        dispatch(getDogs());
        dispatch(getTemperaments());
    }, [dispatch])
    


    function handleClick(e) {
      e.preventDefault()
      dispatch(getDogs());
      setTemperament('All')
    }
    function handleFilterTemps(e) {
        e.preventDefault()
        dispatch(filterByTemperament(e.target.value))
        setTemperament(e.target.value)
        setCurrentPage(1)
    }
    function handlefilterCreated(e){
        dispatch(filterCreated(e.target.value))
        setCurrentPage(1);
    }
    function handleSortAz(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }
    function handleSortWeight(e){
        e.preventDefault();
        dispatch(orderByWeight(e.target.value));
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }
    
    if (temperaments)  return (
        <div className="">
         <div className="botton">
          <h1 className="titulo">Dogs</h1>
          <Link to='/dog'><button className="button">Crear Mascota</button></Link>
          <div className="">
          <button className="button" onClick={e=> {handleClick(e)}}>
              recargar mascotas
          </button>
          </div>
          <div className="selectors">
              <select className="selector" onChange={e=> handleSortAz(e)}>
                  <option value="A-Z">Order to A-Z</option>
                  <option value="Z-A">Order to Z-A</option>
              </select>
              <select className="selector" onChange={e=> handleSortWeight(e)}>
                  <option value="hight">Order by higher weight</option>
                  <option value="less">Order by less weight</option>
              </select>
               <select className="selector" value={temperament} onChange={e=>handleFilterTemps(e)}>
                      <option value="All">Temperament</option>
                  {temperaments && temperaments?.map((e, index)=> 
                     (<option onClick={e=>handleClick(e)} key={index}>{e.name} </option>)
                  )}
                </select>

              <select className="selector" onChange={e=> handlefilterCreated(e)}>
                  <option value="all">Todos</option>
                  <option value="created">Creados</option>
                  <option value="api">Existentes</option>
              </select>

          </div>

          <SearchBar />
          </div>

        <div className="paginado">
        <Paginado dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginado={paginado} />
        </div>
        <div className="cards">
          {currentDogs?.map((e)=>{
              return(
                       <Link to={'/dogs/'+ e.id} >
                          <Card 
                          name={e.name} 
                          img={e.image} 
                          temperament={e.temperament?e.temperament: e.temperaments.map(e=>e.name)} 
                          key={e.id}
                          />
                       </Link>
              )
            })}
            </div>   
        </div>
    ) 
  
}