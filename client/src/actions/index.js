import axios from 'axios';


const URL = 'http://localhost:3001';

export function getDogs() {
    return async function(dispatch){
        var json = await axios.get(`${URL}/dogs`, {})
        return dispatch({
            type: 'GET_DOGS',
            payload: json.data
        })
    }
}

export function getDetail(id) {
    return async (dispatch) => {
      try{
      const json = await axios.get(`${URL}/dogs/${id}`);
      return dispatch({
        type: 'GET_DETAIL',
        payload: json.data,
      });
      }
      catch(err) {
        console.log(err)
      };
    };
  }
export function getTemperaments() {
    return  async (dispatch) => {
      const json = await axios.get(`${URL}/temperament`);
      return dispatch({
        type: 'GET_TEMPERAMENTS',
        payload: json.data,
      });
    };
  }

export const getByName = (name) => {
      return async (dispatch) => {
        const json = await axios.get(`${URL}/dogs?name=${name}`);
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
        const posted= await axios.post(`${URL}/dog`, payload, payload);
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
