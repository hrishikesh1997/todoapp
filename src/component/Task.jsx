import React from 'react'
import { useState } from 'react'
import DayPicKerInput from 'react-day-picker/DayPickerInput';
import "react-day-picker/lib/style.css";
import dateFnsFormat from "date-fns/format";
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import addDays from 'date-fns/addDays';
import isToday from 'date-fns/isToday';

const FORMAT = "dd/MM/yyyy";
function formatDate(date, format, locale) {
    return dateFnsFormat(date, format, { locale });
}
const AddTask = ({ oncancel, onAddTask }) => {
    const [task, setTasks] = useState("");
    const [date, setDate] = useState(null);


    return (


        <div className="add-task-dialog">
            <input value={task} onChange={(event) => setTasks(event.target.value)} />
            <div className="add-task-actions-container">
                <div className="btns-container">
                    <button className="add-btn"
                        disabled={!task}
                        onClick={() => {
                            onAddTask(task, date);
                            oncancel();
                            setTasks(" ");

                        }
                        }
                    >Add Task</button>
                    <button className="cancel-btn" onClick={() => {
                        oncancel();
                        setTasks(" ");
                    }}>cancel</button>
                </div>
                <div className="icon-container">
                    < DayPicKerInput onDayChange={(day) => setDate(day)} placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
                        formatDate={formatDate}
                        format={FORMAT}
                        dayPickerProps={{
                            modifiers: {
                                disabled: [{ before: new Date() }]
                            }
                        }}
                    />
                </div>

            </div>
        </div>


    )
}
const TASK_HEADER_MAPPING = {
    INBOX: "Inbox",
    TODAY: "Today",
    NEXT_7: "next 7 day",
}

const TaskItems = ({ selectedTab, tasks }) => {
    let tasktoRender = [...tasks];
    if (selectedTab == 'NEXT_7') {

        tasktoRender = tasktoRender.filter((task) => isAfter(task.date, new Date()) && isBefore(task.date, addDays(new Date(), 7))
        )
    }

    if (selectedTab == "TODAY") {
        tasktoRender = tasktoRender.filter((task) => isToday(task.date)
        )
    }
    return tasktoRender.map((task) => (
        <p>{task.text}{dateFnsFormat(new Date(task.date), FORMAT)}{" "} </p>
    ))

}

const Task = ({ selectedTab }) => {
    const [showAddTask, setshowAddTask] = useState(false);
    const [tasks, setTasks] = useState([]);

    const addNewTasks = (text, date) => {
        const newTaskItem = { text, date: date || new Date() }
        setTasks((prevState) => [...prevState, newTaskItem]);

    }
    return (
        <div className="tasks">
            <h1>{TASK_HEADER_MAPPING[selectedTab]}</h1>
            {selectedTab == "INBOX" ? (
                <div className="add-task-btn" onClick={() => setshowAddTask((prevState => !prevState))}>
                    <span className="plus">+</span>
                    <span className="add-task-text">Add Task</span>
                </div>) : null
            }
            {showAddTask && <AddTask onAddTask={addNewTasks} oncancel={() => setshowAddTask(false)} />}
            {tasks.length > 0 ?

                <TaskItems tasks={tasks} selectedTab={selectedTab} />
                /*  tasks.map(task => (
                     {/* <p>{task.text}
                         {" "}
                         {dateFnsFormat(new Date(task.date), FORMAT)}</p>
                 )) } */
                : <p>No Task added yet</p>
            }

            <div className="tasks">

            </div>
        </div>


    )

}

export default Task
