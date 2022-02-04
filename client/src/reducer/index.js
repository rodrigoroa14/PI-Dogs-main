
const initialState = {
    dogs: [],
    backup: [],
    temperaments: [],
    detail: [],
    
}

function rootReducer (state= initialState, action) {
    switch(action.type){
        case 'GET_DOGS':
            return{
                ...state,
                dogs: action.payload,
                backup: action.payload
                };
        case 'GET_DETAIL':
                return {
                  ...state,
                  detail: action.payload,
                };
        case 'GET_TEMPERAMENTS':
                return {
                     ...state,
                    temperaments: action.payload
                };
        case 'FILTER_BY_TEMPERAMENT':
                const allDogs = state.backup;
                const temperamentsFiltered =
                  action.payload === "All"
                  ? allDogs
                  : allDogs.filter((e) => 
                   e.temperament?.includes(action.payload) 
                  );
                  const dbFilter = 
                  allDogs.filter(e=> {
                      if(e.createdInDb === true) {
                         return e.temperaments.map(e=> e.name).includes(action.payload)}})
                  const totalFilter = temperamentsFiltered.concat(dbFilter)
                  
                    return {
                        ...state,
                        dogs: totalFilter
               
                };
        
        case 'GET_BY_NAME':
                return {
                    ...state,
                    dogs: action.payload,
                };
        case 'POST_DOG':
                return {
                    ...state,
                }
        case 'FILTER_CREATED':
                const allDogos = state.backup;
                const createdFilter = action.payload === 'created'? allDogos.filter(e=> e.createdInDb) : allDogos.filter(e=> !e.createdInDb)
                return{
                    ...state,
                    dogs: action.payload === 'all' ? state.backup : createdFilter
                }
        case 'ORDER_BY_NAME':
                let sortedArr = action.payload === 'A-Z' ?
                state.dogs.sort(function(prev, next) {
                    if(prev.name>next.name) {
                        return 1;
                    }
                    if(prev.name<next.name){
                        return -1
                    }
                    return 0
                }) :
                state.dogs.sort(function(prev, next) {
                    if(prev.name>next.name) {
                        return -1
                    }
                    if(prev.name<next.name){
                        return 1
                    }
                    return 0
                })
            return {
                ...state,
                dogs: sortedArr
            }
            case 'ORDER_BY_WEIGHT':
                let dogui = state.backup
                let sortedArray = action.payload === 'less' ?
                    dogui.sort(function(prev, next) {
                    return Number(prev.weight.split("-")[0]) - Number(next.weight.split("-")[0])
                }) :
                    dogui.sort(function(prev, next) { 
                    return Number(next.weight.split("-")[0]) - Number(prev.weight.split("-")[0])
                })
            return {
                ...state,
                dogs: sortedArray
            }
            default: 
            return state
    }
}

export default rootReducer