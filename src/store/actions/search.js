import api from '../../services/api';
import {SET_INFO} from './actionsTypes';

export const ActSearchInfo = (municipioSelecionado) => async (dispatch) => {
  const response = await api.get(`/localidades/municipios/${municipioSelecionado}/distritos`);
  const infoRegiao = response?.data[0]?.municipio?.microrregiao;
  const payload = {microrregiao: infoRegiao?.nome, mesorregiao: infoRegiao?.mesorregiao?.nome, uf: infoRegiao?.mesorregiao?.UF?.sigla, regiao: infoRegiao?.mesorregiao?.UF?.regiao?.nome};
  return dispatch({
    type: SET_INFO, 
    payload,
  });
}