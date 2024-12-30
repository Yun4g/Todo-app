import { useState, useEffect } from 'react';
import './App.css';
import CompletedTaskSection from './completedListComponents/completedTask';

function App() {
    const [inputValue, setInputValue] = useState('');
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]); // Renamed for clarity
    

    const handleInputValue = (e) => {
        setInputValue(e.target.value);
    };

    const addToTask = () => {
        if (inputValue === '') {
            alert('Input field cannot be empty');
        } else {
            const newValue = { text: inputValue, completed: false };
            setTasks([...tasks, newValue]);
            setInputValue('');
        }
    };

    const deleteTaskFromList = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);

        const newCompletedTasks = updatedTasks.filter(task => task.completed);
        setCompletedTasks(newCompletedTasks);
    };

    const handleCompletedTasks = (index) => {
        const updatedTasks = tasks.map((task, i) => {
            if (i === index) {
                return { ...task, completed: !task.completed }; // Correctly toggle completion status
            }
            return task;
        });

        setTasks(updatedTasks);

        // Update completed tasks
        const newCompletedTasks = updatedTasks.filter(task => task.completed);
        setCompletedTasks(newCompletedTasks); // Set completed tasks state
    };


    useEffect(() => {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
      }
  }, []);

  // Save tasks to local storage whenever tasks change
  useEffect(() => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
      const newCompletedTasks = tasks.filter(task => task.completed);
      setCompletedTasks(newCompletedTasks);
  }, [tasks]);


    return (
        <main>
            <section>
                <h2>Your Tasks</h2>
                <div className='todoList'>
                    <div id='text'>
                        <div className='todoinput'>
                            <input 
                                type="text" 
                                value={inputValue} 
                                onChange={handleInputValue}  
                                placeholder='Enter your task' 
                            /> 
                            <br />
                        </div>
                        <button onClick={addToTask}>Add to Task List</button>
                    </div>

                    <ol>
                        <label htmlFor="">Mark completed if Task is done</label>
                        {
                            tasks.map((task, index) => (
                                <li key={index} className='list' >
                                    <div className='taskList'>
                                        <input 
                                            type="checkbox" 
                                            className='checkbox' 
                                            checked={task.completed} // Reflect completion status
                                            onChange={() => handleCompletedTasks(index)} // Pass index correctly
                                        />    
                                        {task.text}
                                    </div>
                                    <div className='delete' onClick={() => deleteTaskFromList(index)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height={'17px'} viewBox="0 0 448 512">
                                            <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0l7.2-14.3zM32 128l384 0l0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z"/>
                                        </svg>
                                    </div>
                                </li>
                            ))
                        }
                    </ol>
                </div>
            </section>

            <section className='sectionOne'>
                <CompletedTaskSection transferTask={completedTasks} />
            </section>

        </main>
    );
}

export default App;
