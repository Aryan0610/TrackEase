import BrandName from '../img/BrandName.svg'

import './Dashboard.css'

import { useEffect, useState } from 'react';  
import { useNavigate } from "react-router-dom";
import { supabase } from "../server/supabase";
import { addNewTask, addNewTaskSection, deleteTaskSection, getTaskSections, getTasks } from '../server/supabaseConfig';

import AcceptBtn from '../img/AcceptBtn.svg'
import RejectBtn from '../img/RejectBtn.svg'
// import OptionsBtn from '../img/OptionsBtn.svg'
import DeleteBtn from '../img/DeleteBtn.svg'
import AddTaskBtn from '../img/AddTaskBtn.svg'

function Dashboard() {
    const navigate = useNavigate()
    
    //defining use states
    const [checkAuth, setCheckAuth] = useState(null)
    const [user, setUser] = useState(null)
    const [taskSections, setTaskSections] = useState('')
    const [selectedTaskSection, setSelectedTaskSection] = useState('All')
    const [tasks, setTasks] = useState([])

    //check if a user is logged in or elese redirect to signup
    useEffect(() => {
        async function fetchData() {
            const { data, error } = await supabase.auth.getUser()
            if (data.user) {
                setCheckAuth(true)
                setUser(data)
            } else {
                setCheckAuth(false)
                navigate('/signup') 
            }

            if (error) console.log(error)
        }

        fetchData()
    }, [navigate])

    //if a user is logged in display sidepanel and main dashboard
    if (checkAuth) {
        return (
            <div className='DashboardContainer'>
                <SidePanel user={user} taskSections={taskSections} setTaskSections={setTaskSections} selectedTaskSection={selectedTaskSection} setSelectedTaskSection={setSelectedTaskSection}/>
                <MainDashboard user={user} selectedTaskSection={selectedTaskSection} tasks={tasks} setTasks={setTasks}/>
            </div>
        )
    } else {
        // return (
        //     <Navigate to='/signup'/>
        // )
    }
}

function SidePanel({user, taskSections, setTaskSections, selectedTaskSection, setSelectedTaskSection}) {
    const navigate = useNavigate()

    // const [taskSections, setTaskSections] = useState('')

    useEffect(() => {
        //get tasksections and set it to tasksection use effect
        getTaskSections(user, setTaskSections)

        //if user logs out redierct to login
        async function Unsubscribe() {
            await supabase.auth.onAuthStateChange((event, session) => {
                if (event === 'SIGNED_OUT') {
                    console.log('user has logged out')
                    navigate('/login') 
                }
            });
        }

        Unsubscribe()
    }, [navigate, user]);

    //handle log out button click
    const handleLogOut = async () => {
        await supabase.auth.signOut();
    };

    let TaskSectionDiv

    function handleDeleteTaskSection(taskName) {
        let prevTaskSection

        if (taskSections) {
            prevTaskSection = taskSections[0].task_sections.split(',')
        }

        for (let i=0; i<prevTaskSection.length; i++) {
            if (prevTaskSection[i] === taskName) {
                prevTaskSection.splice(i, 1)
            }
        }

        deleteTaskSection(user, prevTaskSection.join(','))
        getTaskSections(user, setTaskSections)
    }

    if (taskSections) {
        let taskSectionSubDivs = taskSections[0].task_sections.split(',')
        TaskSectionDiv = taskSectionSubDivs.map((item, index) => (
            <button key={index} className={`sidePanelBtn taskSectionBtn ${item === selectedTaskSection ? 'selectedTaskSectionBtn' : ''}`} onClick={() => setSelectedTaskSection(item)}>{item} <div onClick={() => {handleDeleteTaskSection(item)}} className='NotVisible'><img src={DeleteBtn} alt='Delete'/></div></button>
        ))
    }

    const [taskSectionBtnStatus, setTaskSectionBtnStatus] = useState(false)
    const [taskSectionText, setTaskSectionText] = useState('')

    function handleAddNewTaskSection() {
        let prevTaskSection

        if (taskSections) {
            prevTaskSection = taskSections[0].task_sections.split(',')
        }

        prevTaskSection.push(taskSectionText)

        addNewTaskSection(user, prevTaskSection.join(','))
        setTaskSectionBtnStatus(false)
        getTaskSections(user, setTaskSections)
    }

    return (
        <div className='SidePanelContainer'>
            <div className='BrandName_TaskSections_Container'>
                <img className='BrandName' alt='BrandName' src={BrandName}/>

                <div className='TaskSectionsContainer'>
                    {taskSections && TaskSectionDiv}
                </div>
            </div>
            <div className='SidePanelButtonContainer'>
                {taskSectionBtnStatus ? (
                    <div className='AddSectionTextareaContainer'>
                        <textarea rows={1} placeholder='Add New Task Section' onChange={(e) => setTaskSectionText(e.target.value)}/>
                        <div className='AddSectionBtnContainer'>
                            <button onClick={handleAddNewTaskSection}><img alt='add' src={AcceptBtn}/></button>
                            <button onClick={() => setTaskSectionBtnStatus(false)}><img alt='cancel' src={RejectBtn}/></button>
                        </div>
                    </div>
                ) : (
                <button className='sidePanelBtn AddSection' onClick={() => setTaskSectionBtnStatus(true)}>Add Section</button>
                )}
                <button className='sidePanelBtn LogOutBtn' onClick={handleLogOut}>Log Out</button>
            </div>
        </div>
    )
}

function MainDashboard({user, selectedTaskSection, tasks, setTasks}) {
    const [addTaskPanelStatus, setAddTaskPanelStatus] = useState(false)
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [taskDisplay, setTaskDisplay] = useState([])

    function handleAddTask() {
        addNewTask(user, selectedTaskSection, newTaskTitle)
        setAddTaskPanelStatus(false)
        getTasks(user, setTasks)
    }

    useEffect(() => {
        getTasks(user, setTasks)
    }, [user, setTasks]) 

    function TaskToDisplay() {
        if (tasks.length !== 0) {
            let arr = []
            if(tasks[0].tasks.split(')#$#:#$#(')) {
                tasks[0].tasks.split(')#$#:#$#(').forEach(element => {
                    let temp = element.split('#$#:#$#')
                    let temp2 = temp[1].split('=%$%=')
                    if (temp[0] === selectedTaskSection) {
                        arr.push({task: temp2[0], taskStatus: temp2[1]})
                    }
                });
            } else {
                let temp = tasks[0].split('#$#:#$#')
                if (temp[0] === selectedTaskSection) {
                    arr.push(temp[1])
                }
            }

            function handleCheckBoxChange(index) {
                if (arr[index].taskStatus === 'false') {
                    arr[index] = {
                        task: arr[index].task,
                        taskStatus: 'true'
                    }
                }
            }
            
            let display = arr.map((item, index) => (
                <div key={index} className='MainDashboardTasksComponent'>
                    <div>
                        {item.task}
                    </div>
                    <button><img alt='Delete' src={DeleteBtn}/></button>
                </div>
            ))

            return (
                <div className='MainDashboardTasks'>{display}</div>
            )
        }
    }

    return (
        <div className='MainDashboardContainer'>
            <div className='MainDashboard'>
                <div className='MainDashboardHeader'>
                    <div className='MainDashboardTaskSectionAsTitle'>{selectedTaskSection}</div>
                    <TaskToDisplay/>
                </div>
            </div>
            <div className='AddTaskContainer'>
                <button className='AddTaskBtn' onClick={() => setAddTaskPanelStatus(true)}>
                    <img alt='Add Task' src={AddTaskBtn}/>
                </button>
                {addTaskPanelStatus ? 
                    <div className='AddTaskPanelContainer'>
                        <div className='AddTaskPanelBg' onClick={() => setAddTaskPanelStatus(false)}/>
                        <div className='AddTaskPanel'>
                            <div>Add New Task</div>
                            <input row={3} className='AddTaskPanelTextarea' placeholder='Title' onChange={(e) => setNewTaskTitle(e.target.value)}/>
                            <div className='AddTaskPanelBtnContainer'>
                                <button className='AddTaskPanelBtn' onClick={() => setAddTaskPanelStatus(false)}>Cancel</button>
                                <button className='AddTaskPanelBtn Add' onClick={handleAddTask}>Add</button>
                            </div>
                        </div>
                    </div>
                : ''}
            </div>
        </div>
    )
}

export default Dashboard