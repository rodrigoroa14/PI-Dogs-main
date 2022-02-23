import React from "react";
import {useState, useEffect} from "react"
import {Link, useNavigate} from "react-router-dom";
import { postDogs, getTemperaments } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import './DogCreate.css'


function validate(input) {
    let errors = {};
    let arr = []
    if(!input.name){
        errors.name = "name is required"
    }else if(parseInt(input.name)){
        errors.name = "name shouldn't be a number"
    }
     if(!input.height){
        errors.height = "height is required"
    }
     if(!input.weight){
        errors.weight = "weight is required"
    }
     if(!input.life_span) {
        errors.life_span = "life span is required"
    }
     if(input.temperament.length===0) {
        errors.temperament = "enter at least one temperament"
    } else{
        if(input.height){
            arr = input.height.split(" ")
            if(arr.length !== 3 || arr[1] !== '-'){
                errors.height = 'enter a min range height and max range height separate with " - "'
            } else if(Number(arr[0]) > Number(arr[2]) || Number(arr[0] < 0) || Number(arr[2])< 0){
                errors.height = 'height invalid. Please try again'
          } 
            
        }
        if(input.weight){
            arr = input.weight.split(" ")
            if(arr.length !== 3 || arr[1] !== '-'){
                errors.weight = 'enter a min range weight and max range weight separate with " - "'
              } else if(Number(arr[0]) > Number(arr[2])){
                errors.weight = 'weight invalid. Please try again'
            }
        }
        if(input.life_span){
            arr = input.life_span.split(" ")
            if(arr.length < 3 || arr[1] !== '-'){
                errors.life_span = 'enter a min range age and max range age separate with " - "'
              } else if(Number(arr[0]) > Number(arr[2])){
                errors.life_span = 'life span invalid. Please try again'
            }
        }
    }
    return errors
}

export default function DogCreate(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const temperaments = useSelector((state)=> state.temperaments)
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        name: "",
        height: "",
        weight: "",
        life_span: "",
        image: "",
        temperament: [] 
    })

function handleChange(e){
    setInput({
        ...input,
        [e.target.name] : e.target.value
       
    })

 }
 useEffect(()=> {
     setErrors(validate(input))
 }, [input])
function handleSelect(e){
    console.log(e.target.value)
    setInput({
        ...input,
        temperament: !input.temperament.includes(e.target.value) ? 
        [...input.temperament, e.target.value] :
        [...input.temperament]
        
        
    })
}
function handleSubmit(e){
    e.preventDefault()
    dispatch(postDogs(input))
    alert('Dog create successfully')
    setInput({
        name: "",
        height: "",
        weight: "",
        life_span: "",
        image: "",
        temperament: [] 
    })
    navigate('/home')
}
function handleDelete(t){
    setInput({
        ...input,
        temperament: input.temperament.filter(tem => tem !== t)
    })
}


useEffect(()=> {
    dispatch(getTemperaments())
}, [dispatch])


return(
    <div className="fond">
        <Link to="/home"><button className="button">Volver</button></Link>
        <h1>Create a Dog</h1>
        <form onSubmit={(e)=> handleSubmit(e)} className="form">
            <div className="inputs">
                <label>Name:</label>
                <input className="input"
                type="text" 
                value={input.name}
                name="name"
                onChange={handleChange}
                />
                {errors.name && (
                    <span className="error">{errors.name}</span>
                )}
            </div>
            <div className="inputs">
                <label>Height:</label>
                <input className="input"
                type="text"
                value={input.height}
                name="height"
                onChange={handleChange}
                />
                {errors.height && (
                    <span className="error">{errors.height}</span>
                )}
            </div>
            <div className="inputs">
            <label>Weight:</label>
                <input className="input"
                type="text"
                value={input.weight}
                name="weight"
                onChange={handleChange}
                />
                {errors.weight && (
                    <span className="error">{errors.weight}</span>
                )}
            </div>
            <div className="inputs">
            <label>Life Span:</label>
                <input className="input"
                type="text"
                value={input.life_span}
                name="life_span"
                onChange={handleChange}
                />
                {errors.life_span && (
                    <span className="error">{errors.life_span}</span>
                )}
            </div>
            {/* <div className="inputs">
            <label>Image:</label>
                <input className="input"
                type="text"
                value={input.image}
                name="image"
                onChange={handleChange}
                />
            </div>     */}
            
            <span>Temperaments:</span>
            <select className="input" onChange={(e)=>handleSelect(e)} >
                {temperaments.map((t)=> (
                    <option value={t.name}>{t.name}</option>
                ))}
            </select>
            {errors.temperament && (
                    <span className="error">{errors.temperament}</span>
                )}
            
            <div>
             <h4>
                {input.temperament.map(e => e + " ")}
             </h4>
            </div>
            <button className="button" disabled={Object.keys(errors).length > 0} type="submit" >Create Dog</button>
        
        </form>
        {input.temperament.map(e=>
            <div>
                <p>{e.name}</p>
                <button  onClick={()=>handleDelete(e)}>X</button>
            </div>
            )}
    </div>
)
}