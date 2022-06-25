import classes from './cardwrapper.module.css';

function CardWrapper(props) {
    return (
        <div className={props.name === 'no' ? classes.card2:classes.card} onClick={()=>console.log(props)}>
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