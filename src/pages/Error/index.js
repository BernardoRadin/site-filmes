import './error.css';
import { Link } from 'react-router-dom';

function Error(){
    return(
        <div className="error">
            <h1 className="code">404</h1>
            <h1>Página não encontrada!</h1>
            <Link className="link" to="/">Acessar todos o filmes!</Link>
        </div>
    )
}

export default Error;