import { useEffect, useState } from 'react';
import './home.css';
import { Link } from 'react-router-dom';

function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  var image = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    async function loadFilmes() {
      var url = "https://api.themoviedb.org/3/";
      let apikey = API_KEY;
      let language = "pt-BR";
      let page = "1";

      const response = await fetch(`${url}movie/now_playing?language=${language}&page=${page}&api_key=${apikey}`);
      const json = await response.json();

      //console.log(json.results.slice(0, 10));

      setFilmes(json.results.slice(0,15));
      setLoading(false);

    }

    loadFilmes();
  }, [])

  if(loading){
    return(
      <div className="loading">
        Carregando...
      </div>
    )
  }

  return (
    <div>
        <div className="lista-filmes">
            {filmes.map((filme)=>{
                return(
                    <article key={filme.id}>
                        <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt="" /><br/>
                        <Link className="link" to={`/filme/${filme.id}`}><button className="botao">Acessar</button></Link>
                    </article>
                )
            })}
            <div className="clear"></div>
        </div>
    </div>
  )
}

export default Home;
