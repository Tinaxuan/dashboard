import classes from './cardwrapper.module.css';
import {Link} from 'react-router-dom';

function CardWrapper(props) {
    return (
        <div className={props.name === 'no' ? classes.card2:classes.card} onClick={()=>console.log(props)}>
            <Link to={props.link}>
            <div className={classes.card_title}>
                <h2>{props.title}</h2>
            </div>
            <div className={classes.card_content}>
                {props.children}
            </div>
            </Link>
        </div>
    )
}

export default CardWrapper;