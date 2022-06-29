import classes from "./task.module.css"

function Task(props) {
    function update_checkbox() {
        console.log("from kid:"+ props.id);
        props.callback(props.id);
    }

    function delete_task() {
        console.log("try to delete"+ props.id)
        props.delete_task(props.id);
    }
    
    return(
        <div style={{padding:'10px 20px', margin:10, background: '#ffffff70'}}>
            <li style={{ display: 'flex', alingItems: 'center', justifyContent: 'space-between'}}>
                <h2>{props.taskName}</h2>
                <input style={{ margin:'auto 10px'}} 
                type="checkbox" 
                defaultChecked={props.defaultChecked} 
                onChange={()=>update_checkbox()}
                ></input>
                
            </li>
            <button className={classes.button28}onClick={()=>delete_task()}>delete</button>
        </div>
    )
}

export default Task;