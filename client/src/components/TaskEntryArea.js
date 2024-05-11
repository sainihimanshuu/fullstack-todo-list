export default function TaskEntryArea(props){
    return(
        <div>
            <input type="text" className="task-entry" placeholder="Enter task" onChange={props.handleEntry}></input>
            <button className="cancel-btn" onClick={props.handleCancel}>Cancel</button>
            <button className="enter-btn" onClick={props.handleEnter}>Enter</button>
        </div>
    )
}