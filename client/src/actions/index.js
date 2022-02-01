import axios from 'axios';  

export function getDogs() {
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/dogs', {})
        return dispatch({
            type: 'GET_DOGS',
            payload: json.data
        })
    }
}

export function getDetail(id) {
    return async (dispatch) => {
      const json = await axios.get(`http://localhost:3001/dogs/${id}`);
      return dispatch({
        type: 'GET_DETAIL',
        payload: json.data,
      });
    };
  }
export function getTemperaments() {
    return  async (dispatch) => {
      const json = await axios.get("http://localhost:3001/temperament");
      return dispatch({
        type: 'GET_TEMPERAMENTS',
        payload: json.data,
      });
    };
  }

export const getByName = (name) => {
      return async (dispatch) => {
        const json = await axios.get(`http://localhost:3001/dogs?name=${name}`);
        return dispatch({
          type: 'GET_BY_NAME',
          payload: json.data,
        });
      };
    };
export function filterCreated(payload){
    return{
        type: 'FILTER_CREATED',
        payload
    }
}
export function postDogs(payload){
    return async function (dispatch){
        const posted= await axios.post('http://localhost:3001/dog', payload);
        return posted
    }
}
export function orderByName(payload) {
    return {
      type: 'ORDER_BY_NAME',
      payload,
    }
}
export function orderByWeight(payload) {
  return {
    type: 'ORDER_BY_WEIGHT',
    payload
  }
}
export function filterByTemperament(payload) {
  return {
    type: 'FILTER_BY_TEMPERAMENT',
    payload,
  };
}
