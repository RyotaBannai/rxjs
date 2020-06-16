import React, {useState} from "react";
import '../../sass/Article.scss';

export default function Article (props){
    const { title, content, id, deleteArticle } = props;
    const [toggle, setToggle] = useState(false);
    return(
        <div className="col-md-4">
            <h2>{title}</h2>
            <p> {toggle ? content : null}</p>
            <button type='button' className='btn btn-light' onClick={() => setToggle(!toggle)}>
                {toggle ? 'Hide Info' : 'More Info'}</button>
            <a className="btn btn-default" href="#" >
                <button type='button' className='btn btn-info'>Jump to Article</button>
            </a>
            <button type='button' className='btn btn-danger' onClick={() => deleteArticle(id)}>Delete Article</button>
        </div>
    )
}