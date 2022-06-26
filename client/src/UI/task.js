import classes from './task.module.css'

function Task(props) {
    return(
        <li>
            <h2>{props.taskName}</h2>
            <input type="checkbox" defaultChecked={props.defaultChecked} onChange={()=>console.log(props.id)}></input>
        </li>
    )
}

export default Task;