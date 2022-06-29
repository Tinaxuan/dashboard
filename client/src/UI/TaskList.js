import Task from "./task";

function TaskList(props) {
    if(props.tasks === -1) {
        return null;
    }
    return(
        <ul>
        {props.tasks.map((task) => (
            <Task
            key={task.id}
            id={task.id}
            taskName={task.taskName}  
            defaultChecked={task.ischecked}  
            callback={props.callback}
            delete_task={props.delete_task}
            />
        ))}
    </ul>   
    )
}

export default TaskList;