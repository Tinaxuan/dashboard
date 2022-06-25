import Background from "../UI/Background";
import TaskList from "../UI/TaskList";

const tasks_test= [
        {
            id:"1",
            taskName: "start1",
            ischecked: true,
        },
        {
            id:"2",
            taskName: "start2",
            ischecked: true,
        },
        {
            id:"3",
            taskName: "start3",
            ischecked: false,
        },
    ]



function TaskPage() {
    return(
        <div>
            <Background/>
            <h1>Task</h1>
            <TaskList tasks={tasks_test}></TaskList>
        </div>
    )
    
}
export default TaskPage;