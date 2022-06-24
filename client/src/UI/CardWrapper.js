import classes from './cardwrapper.module.css';

function CardWrapper(props) {
    return (
        <div className={classes.card}>
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