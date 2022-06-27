import STask from "./STask";
//better to use the old code reuse. later might change
function STasklist(props) {
    return(
        <div>
        {props.tasks.map((task) => (
            <STask
            key={task.id}
            id={task.id}
            taskName={task.taskName}  
            />
        ))}
    </div>   
    )
}

export default STasklist;