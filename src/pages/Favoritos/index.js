import {useEffect, useState } from 'react';
import './favoritos.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Favoritos(){
    const [filmes, setFilmes] = useState([]);

    useEffect(()=>{

        const lista = localStorage.getItem('@filmes');
        setFilmes(JSON.parse(lista) || "");

    },[])

    function excluirFilme(id){
        let filtro = filmes.filter( (item) => { 
            return (item.id  !== id)
        })    
        setFilmes(filtro);
        localStorage.setItem("@filmes", JSON.stringify(filtro));
        toast.success("Filme removido com sucesso!");
    }

    return(
        <div className="filmes-favoritos">
            <h1> Filmes salvos</h1>

            {filmes.length === 0 && <p className="aviso"> Você tem nenhum filme salvo! </p>}

                <ul>
                    {filmes.map((filme) => {
                        return(
                        <li key={filme.id}>
                                <span className="titulo">{filme.title}</span>
                                <div>
                                    <Link to={`/filme/${filme.id}`}><button className="button">Ver detalhes</button></Link>
                                    <button className="button" onClick={() => excluirFilme(filme.id)}> Excluir </button>
                                </div>
                        </li>
                        )
                    })}
                </ul>
        </div>
    )
}

export default Favoritos;