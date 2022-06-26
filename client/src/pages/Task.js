import Background from "../UI/Background";
import TaskList from "../UI/TaskList";
import { useRef, useEffect } from "react";
import classes from "./task.module.css";

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
    let currentUser;
    let currentUserTask;
    const tasknameRef = useRef();
    const get_currentUser = function() {
        fetch('http://localhost:5000/user/current')
        .then(res => res.json())
        .then(jsn => {
            if (jsn.msg === "Successful") {
                console.log(jsn.session)
                currentUser = jsn.session.name;
                currentUserTask = jsn.session.task;
                console.log("current user", currentUser)
    
            } else {
                console.log(jsn.msg)        
            }
        })
        .catch(err => console.log(err));
    }
    useEffect(()=>{
        get_currentUser();
    },[])
    function submit(event) {
        event.preventDefault();
        const id =  currentUserTask.length() +1;
        const task_add = {id:id, taskName:tasknameRef.current.value,ischecked: false};
        const update_tasks = currentUserTask.push(task_add);
        console.log(update_tasks);

        // await fetch(`http://localhost:5000/gettask/${username}`, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json'},
        //     body: JSON.stringify({task: update_tasks})
        // })
        // .then(res => res.json())
        // .then(dta => {
        //     console.log(dta);
    
        // })
        // .catch(err => console.log(err))



    }
    return(
        <div>
            <Background/>
            <h1>Task</h1>
            <TaskList tasks={tasks_test}></TaskList>
            <form onSubmit={submit} >
            <input className= {classes.input}  ref={tasknameRef} type="text" name="id" id="moreTask" placeholder ="Add another task" required></input>
            <button>+</button>
            </form>
        </div>
    )
    
}
export default TaskPage;