import STask from "./STask";

function STasklist(props) {
    return(
        <ul>
        {props.tasks.map((task) => (
            <STask
            key={task.id}
            id={task.id}
            taskName={task.taskName}  
            />
        ))}
    </ul>   
    )
}

export default STasklist;