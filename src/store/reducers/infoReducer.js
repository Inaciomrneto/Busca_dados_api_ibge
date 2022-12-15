import { SET_INFO } from "../actions/actionsTypes";

const initialState ={
  infoRegiao: {},
}

const infoReducer = (state = initialState, action) => {
  switch(action.type){
    case SET_INFO:
      return{
        infoRegiao: { 
          microrregiao: action.payload.microrregiao, 
          mesorregiao: action.payload.mesorregiao,
          uf: action.payload.uf,
          regiao: action.payload.regiao,
        },
      };
      default:
        return state;
  };
}

export default infoReducer;