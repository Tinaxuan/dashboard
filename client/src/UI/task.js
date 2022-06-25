import classes from './task.module.css'

function Task(props) {
    return(
        <li>
            <h2>{props.taskName}</h2>
            <input type="checkbox" defaultChecked={props.ischecked} onClick={console.log(props.id)}></input>
        </li>
    )
}

export default Task;