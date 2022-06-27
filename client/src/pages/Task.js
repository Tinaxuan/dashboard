import Background from "../UI/Background";
import TaskList from "../UI/TaskList";
import { useRef, useEffect,useState } from "react";
import classes from "./task.module.css";

const tasks_test= [
        {
            id:"1",
            taskName: "start1",
            ischecked: false,
        },
        {
            id:"2",
            taskName: "start2",
            ischecked: false,
        },
        {
            id:"3",
            taskName: "start3",
            ischecked: false,
        },
    ]



function TaskPage() {
    const [curUser, setCurUser] = useState("loading")
    const [curTask, setCurTask] = useState(-1)
    const [curClick, setCurClick] = useState(-1)
    const tasknameRef = useRef();
    const get_currentUser = async function() {
        fetch('http://localhost:5000/user/current')
        .then(res => res.json())
        .then(jsn => {
            if (jsn.msg === "Successful") {
                console.log(jsn.session)
                setCurUser(jsn.session.name);
                setCurTask(jsn.session.task);
                console.log("current user", curUser)
    
            } else {
                console.log(jsn.msg)        
            }
        })
        .catch(err => console.log(err));
    }

    function callback(id) {
        setCurClick(id);
        console.log(id);
        const clickedTask = curTask[id-1];
        const newTask = {id:id,taskName:clickedTask.taskName,ischecked:!clickedTask.ischecked};
        const update_task_click = curTask;
        update_task_click[id-1] = newTask;
        updateTask(curUser,update_task_click);
        setCurTask(update_task_click);
        console.log(curTask)


    }

    const updateTask = async function(username, task) {
        let msg;
        await fetch("http://localhost:5000/update_tasks", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({username: username, task: task })
            })
            .then(res => res.json())
            .then(dta => {
                console.log(dta)
                msg = dta.msg;
            })
            .catch(err => console.log(err))
        return msg
    }

    useEffect(()=>{
        get_currentUser();
    },[])


    function submit(event) {
        event.preventDefault();
        const id =  curTask.length +1;
        console.log(id);
        const task_add ={id:id, taskName:tasknameRef.current.value,ischecked: false};
        const update_tasks = curTask;
        update_tasks.push(task_add)
        console.log(update_tasks);
        console.log(task_add);
        updateTask(curUser,curTask);
        window.location.reload();
        get_currentUser();

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
            <TaskList tasks={curTask} callback={callback}></TaskList>
            <form onSubmit={submit} >
            <input className= {classes.input}  ref={tasknameRef} type="text" name="id" id="moreTask" placeholder ="Add another task" required></input>
            <button>+</button>
            </form>
        </div>
    )
    
}
export default TaskPage;