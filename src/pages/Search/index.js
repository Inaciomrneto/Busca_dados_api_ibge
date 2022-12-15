import { useState, useEffect } from 'react';
import api from '../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { ActSearchInfo } from '../../store/actions/search';

import './styles.css';


function Search() {

  const [estados, setEstados] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState('');
  const [municipioSelecionado, setMunicipioSelecionado] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('/localidades/estados');
        setEstados(response.data);
      }catch(error){
        console.log(error);
      }
    })();
  }, []);

  const infoRegiaoStore = useSelector(state => state.infoReducer.infoRegiao);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get(`/localidades/estados/${estadoSelecionado}/municipios`);
        setMunicipios(response.data);
      }catch(error){
        console.log(error);
      }
    })();
  }, [estadoSelecionado]);

  function handleSelectEstado(event) {
    event.preventDefault();
    const {value} = event.target;
    setEstadoSelecionado(value);
  }

  function handleSelectMunicipio(event) {
    event.preventDefault();
    const {value} = event.target;
    setMunicipioSelecionado(value);
  }

  useEffect(() => {
    async function getInfo(){ 
      try {
        dispatch(ActSearchInfo(municipioSelecionado));
      }catch(error){
        console.log(error);
      }
    }
    getInfo();
  }, [municipioSelecionado]);

  return(
    <div className="container">
      <h1>Buscar informações IBGE</h1>
      <form>
        <div className='InputSelect'>
          <label htmlFor="estado">Estado</label>
          <select name="estado" id="estado" onChange={handleSelectEstado}>
            <option value="">Selecione um Estado</option>
            {estados.map((estado) =>(<option key={estado.sigla} value={estado.sigla} >{estado.nome} ({estado.sigla})</option>))} 
          </select>
        </div>
        
        <div className='InputSelect'>
          <label htmlFor="municipio">Cidade</label>
          <select name="municipio" id="municipio" onChange={handleSelectMunicipio}>
            <option value="">Selecione uma cidade</option>
            {municipios.map((municipio) =>(<option key={municipio.id} value={municipio.id}>{municipio.nome}</option>))}
          </select>
        </div>
      </form>
      {!infoRegiaoStore ? null : (
      <div className='resultados'>
        <div className='resultados-item'>
          <h3>Microrregiao</h3>
            <p>{infoRegiaoStore.microrregiao}</p>
        </div>
        <div className='resultados-item'>
          <h3>Mesorregiao</h3>
          <p>{infoRegiaoStore.mesorregiao}</p>
        </div>
        <div className='resultados-item'>
          <h3>UF</h3>
          <p>{infoRegiaoStore.uf}</p>
        </div>
        <div className='resultados-item'>
          <h3>Região</h3>
          <p>{infoRegiaoStore.regiao}</p>
        </div>
      </div>)}
    </div>
  )
};


export default Search;