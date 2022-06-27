

function Task(props) {
    function update_checkbox() {
        console.log("from kid:"+ props.id);
        props.callback(props.id);
    }
    
    return(
        <li style={{ display: 'flex', alingItems: 'center', justifyContent: 'space-between', padding:'10px 20px', margin:10, background: '#ffffff70'}}>
            <h2>{props.taskName}</h2>
            <input style={{ margin:'auto 10px'}} 
            type="checkbox" 
            defaultChecked={props.defaultChecked} 
            onChange={()=>update_checkbox()}
            ></input>
        </li>
    )
}

export default Task;