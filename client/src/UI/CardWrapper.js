import classes from './cardwrapper.module.css';
import {useHistory} from 'react-router-dom';

function CardWrapper(props) {
    const history = useHistory();
    return (
        <div className={props.name === 'no' ? classes.card2:classes.card} onClick={props.name === 'no'? null :()=>history.push(props.link)}>
            
            <div className={classes.card_title}>
                <h2>{props.title}</h2>
            </div>
            <div className={classes.card_content}>
                {props.children}
            </div>
        </div>
    )
}

export default CardWrapper;