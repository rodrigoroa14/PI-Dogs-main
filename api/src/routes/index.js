const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const {Dog, Temperament} = require('../db');



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () => {
    const apiUrl = await axios.get('https://api.thedogapi.com/v1/breeds?api_key=bc35800b-06a0-461a-8d92-090c912a408c');
    const apiInfo = await apiUrl.data.map(e => {
        return {
            name: e.name,
            id: e.id,
            height: e.height.metric,
            weight: e.weight.metric,
            life_span: e.life_span,
            temperament: [e.temperament].join().split(',').map(e => e.trim()),
            image: e.image.url
        }
    })
    return apiInfo;
}

const getDbInfo = async () => {
    return await Dog.findAll({
        include:{
            model: await Temperament,
            atributes: ['name'],
            through: {
                attributes: [],
            }
        }
    })
}
const getAllDogs = async () => {
const apiInfo = await getApiInfo();
const DbInfo = await getDbInfo();
const InfoTotal = apiInfo.concat(DbInfo)
return InfoTotal
}

router.get('/dogs', async (req,res)=> {
    const name = req.query.name;
    let TotalDogs = await getAllDogs();
    if(name){
        let DogName = await TotalDogs.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
        DogName.length ? res.status(200).send(DogName) : res.status(404).send('raza no encontrada')
    } else {
        res.status(200).send(TotalDogs)
    }
})
router.get('/temperament', async (req, res) => {
    const tempApi = await axios.get('https://api.thedogapi.com/v1/breeds?api_key=bc35800b-06a0-461a-8d92-090c912a408c');
    const temp = tempApi.data.map(e => e.temperament).join().split(',')
    // const Trim = temp.map(e => e.trim())
    temp.forEach(e => {
        Temperament.findOrCreate({
            where: {name: e}
        })
    });
    const AllTemps = await Temperament.findAll();
    // console.log(AllTemps)
    res.status(200).send(AllTemps)
})

router.post('/dog', async (req, res) => {
    try{
        const { name, height, weight, life_span, createdInDb, temperament } = req.body;
        if (!name || !height || !weight)
          return res.status(404).send("El nombre, altura y peso son requeridos");
        const creatingDog = await Dog.create({
          name,
          height,
          weight,
          life_span,
        });
        let tempDb = await Temperament.findAll({
            where: {name: temperament}
        })
         await creatingDog.addTemperament(tempDb)
       
        res.status(200).send(creatingDog)
        //"Perro creado exitosamente!"
      }
    
      catch(err){
        console.log(err)
        res.status(404).send(err)
      }
    
})
router.get('/dogs/:id', async (req,res)=> {
    const id = req.params.id;
    if(id){
    const allDogs = await getAllDogs();
    const FilteredDogs = allDogs.filter(e => e.id == id);
    FilteredDogs.length ? res.status(200).send(FilteredDogs) : res.status(404).send('El ID ingresado no existe')
   }
})

module.exports = router;
