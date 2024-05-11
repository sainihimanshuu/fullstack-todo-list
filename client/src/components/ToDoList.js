import {useState, useEffect} from "react"
import TaskEntryArea from "./TaskEntryArea.js"


export default function ToDoList(){
    const [list, setList]=useState([])

    const [currTask, setCurrTask]=useState("") //for entry textbox

    const [isAddItemClicked, setIsAddItemClicked]=useState(false) //for opening up comment box to take entry

    useEffect(() => {
        const fetchData =  async () => {
            const result = await fetch("/api")
            const jsonRes = await result.json()

            setList(jsonRes)
        }

        fetchData()
    }, [])

    function handleAddItem(){
        setIsAddItemClicked(true)
    }

    function handleCancel(){
        setIsAddItemClicked(false)
    }

    // function handleMarkAsDone(taskId){
    //     setItemList(prevItemList => prevItemList?.map(item => item.id===taskId?{...item, isDone:!item.isDone}:item))
    // }

    // function handleDeleteTask(taskId){
    //     setItemList(prevItemList => prevItemList.filter(item => item.id!==taskId))
    // }

    const handleMarkAsDone = async (id) => {

        for(let i=0;i<list.length;i++)
            if(list[i].id===id)
                list[i].isDone=!list[i].isDone

        const dataToUpdate=list

        const response=await fetch("/api", {
            method:"PUT", 
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              },
            body: JSON.stringify(dataToUpdate)
        })

        if (response.ok){
            const fetchData =  async () => {
                const result = await fetch("/api")
                const jsonRes = await result.json()
    
                setList(jsonRes)
            }
            
            fetchData()
        }
    }


    const handleDeleteTask = async (id) => {
        
        const response = await fetch(`/api/${id}`, {
            method: 'DELETE'
        })

        if (response.ok){
            const fetchData =  async () => {
                const result = await fetch("/api")
                const jsonRes = await result.json()
    
                setList(jsonRes)
            }
    
            fetchData()
        }
    }

    // function handleEnter(){
    //     if(currTask !== ""){
    //         setItemList(prevItemList => [...prevItemList, {
    //             id: Date.now(),
    //             text: currTask, 
    //             isDone: false
    //         }])
    //     }
    //     setCurrTask("")
    //     setIsAddItemClicked(false)
    // }
    const handleEnter = async () => {
        const myData={
            id: Date.now(),
            text: currTask,
            isDone: false
        }

        const response= await fetch("/api", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(myData)
        })

        if (response.ok){
            const fetchData =  async () => {
                const result = await fetch("/api")
                const jsonRes = await result.json()
    
                setList(jsonRes)
            }
    
            fetchData()
        }

        setCurrTask("")
        setIsAddItemClicked(false)
    }

    function handleEntry(event){
        const {value}=event.target
        //console.log(value)
        setCurrTask(value)
    }

    const strikethroughStyle = {
        textDecoration: 'line-through'
    }

    return(
        <div className="to-do-list">
            <h1>TO DO LIST</h1>
            <ul>
            {
                list.map(item => 
                    <li className="tasks" key={item.id}>
                        <p className="text">{item.isDone? <p style={strikethroughStyle}>{item.text}</p> : item.text}</p>  
                        <button className="done-btn" onClick={() => handleMarkAsDone(item.id)}>Done</button>
                        <button className="delete-task-btn" onClick={() => handleDeleteTask(item.id)}>Delete</button>
                    </li>
                )
            }
            </ul>
            <button className="add-btn" onClick={handleAddItem}>Add item</button>
            {isAddItemClicked && <TaskEntryArea handleCancel={handleCancel} handleEnter={handleEnter} handleEntry={handleEntry} />}
        </div>
    )
}