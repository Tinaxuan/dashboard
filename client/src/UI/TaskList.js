import Task from "./task";

function TaskList(props) {
    return(
        <ul>
        {props.tasks.map((task) => (
            <Task
            key={task.id}
            id={task.id}
            taskName={task.taskName}  
            defaultChecked={task.ischecked}  
            />
        ))}
    </ul>   
    )
}

export default TaskList;