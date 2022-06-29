import Background from "../UI/Background";
import TaskList from "../UI/TaskList";
import { useRef, useEffect,useState } from "react";
import classes from "./task.module.css";
import {useHistory } from "react-router-dom";

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
    const history = useHistory();
    const [curUser, setCurUser] = useState("loading")
    const [curTask, setCurTask] = useState(-1)
    const [curClick, setCurClick] = useState(-1)
    const [curDelete, setCurDelete] = useState(-1)
    const tasknameRef = useRef();
    const get_currentUser = async function() {
        fetch('/user/current')
        .then(res => res.json())
        .then(jsn => {
            if (jsn.msg === "Successful") {
                // console.log(jsn.session)
                setCurUser(jsn.session.name);
                setCurTask(jsn.session.task);
                console.log("current user", jsn.session)
    
            } else {
                console.log(jsn.msg)        
            }
        })
        .catch(err => console.log(err));
    }

    function callback(id) {
        setCurClick(id);
        console.log(id);
        const clickedTask = curTask[id];
        const newTask = {id:id,taskName:clickedTask.taskName,ischecked:!clickedTask.ischecked};
        const update_task_click = curTask;
        update_task_click[id] = newTask;
        updateTask(curUser,update_task_click);
        setCurTask(update_task_click);
        console.log(curTask)
    }

    function delete_task(number) {
        setCurDelete(number);
        console.log(number);
        let modified_task=curTask;
        console.log("modified_task");
        console.log(modified_task[number]);
        for (let i=number; i<curTask.length;i++) {
            modified_task[i].id = modified_task[i].id-1;
        }
        modified_task.splice(number,1);
        // console.log(modified_task);
        updateTask(curUser,modified_task);
        
    }

    const updateTask = async function(username, task) {
        let msg;
        await fetch("/update_tasks", {
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
        const id =  curTask.length;
        console.log(id);
        const task_add ={id:id, taskName:tasknameRef.current.value,ischecked: false};
        const update_tasks = curTask;
        update_tasks.push(task_add)
        // console.log(update_tasks);
        // console.log(task_add);
        // console.log("update")
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
    
    function back(){
        history.push("/main");
    }
    return(
        <div>
            <Background/>
            <button onClick={back}>Back</button>
            <h1>Task</h1>
            <TaskList tasks={curTask} callback={callback} delete_task={delete_task}></TaskList>
            <form onSubmit={submit} >
            <input className= {classes.input}  ref={tasknameRef} type="text" name="id" id="moreTask" placeholder ="Add another task" required></input>
            <button>+</button>
            </form>
        </div>
    )
    
}
export default TaskPage;