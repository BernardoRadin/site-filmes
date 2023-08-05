import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './style.css';

function Filme(){
    const { id } = useParams();
    const [filme, setFilme] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
        async function loadFilme() {
            var url = "https://api.themoviedb.org/3/";
            let apikey = API_KEY;
            let language = "pt-BR";
      
            var response = await fetch(`${url}movie/${id}?language=${language}&api_key=${apikey}`)

            if(response.status == 404){
                navigate("/",{replace: true});
                return;
            }

            let json = await response.json();
            setFilme(json);
            setLoading(false);
        }
      
        loadFilme();
        
        return () =>{
        }

    },[navigate,id])

    function salvarFilme(){
        const lista = localStorage.getItem("@filmes");

        let filmessalvos = JSON.parse(lista) || [];

        //Verifica pelo menos 1 item no array
        if(filmessalvos.some( (filmessalvos) => filmessalvos.id === filme.id)){
            toast.warn('Filme já está na lista');
            return;
        }


        filmessalvos.push(filme);
        localStorage.setItem("@filmes", JSON.stringify(filmessalvos));
        toast.success('Filme salvo com sucesso!');
    }

    if(loading){
        return(
            <div className="loading">
                Carregando filme...
            </div>
        )
    }

    return(
        <div className="container">
            <h1>{filme.title}</h1>
            <div className="filme">
                <img className="img" src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt="" /><br/>
                {filme.genres.map((generos) => {
                    return(
                        <label className="genero" key={generos.id}>{generos.name}</label>
                    )
                })}
                <label className="nota">{"Nota: "+filme.vote_average}</label>
                <br/><h3>Sinopse: </h3>
                <p className="overview">{filme.overview}</p>
                <button className="salvar" onClick={salvarFilme}>Salvar</button>
                <a target="_blank" href={`https://www.youtube.com/results?search_query=${filme.title}`}><button className="trailer">Trailer</button></a>
            </div>
        </div>
    )
}

export default Filme;