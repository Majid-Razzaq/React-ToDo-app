import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import './style.css';

function App() {

  const [activeClass, setActiveClass] = useState('all');
  const [text, setText] = useState('');
  const [tasks, setTasks] = useState([]);
  const [taskAddForm, setTaskAddForm] = useState(true);
  const [taskEditForm, setTaskEditForm] = useState(false);
  const [task, setTask] = useState('');

  const addForm = async (e) => {
    e.preventDefault();

    if(!text){
      alert("Task can not be blank");
      return;
    }

    const formData = {
      title: text,
      status: 'active',
    }

    const res = await fetch('http://localhost:3500/tasks',{
      method: 'POST',
      headers:{
        'Content-type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    setTasks([...tasks, data]);
    setText('');
    //console.log(data);
  }

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:3500/tasks');
    const data = await res.json();
    //console.log(data);
    setTasks(data);
  }

  // filter your data using this method
  const filterTasks = async (status) => {
    setActiveClass(status);

    if(status == 'all'){
      fetchTasks();
      return;
    }

    const res = await fetch('http://localhost:3500/tasks?status='+ status);
    const data = await res.json();
    setTasks(data);
  }

  const showEditForm = async (id) => {
    setTaskAddForm(false);
    setTaskEditForm(true);
    fetchTask(id);
  }

  const fetchTask = async (id) => {
    const res = await fetch('http://localhost:3500/tasks/' +id);
    const data = await res.json();
    setText(data.title);
    setTask(data)
  }

  const updateTask = async (e) => {
    e.preventDefault();
    
    if(!text){
      alert("Task can not be blank");
      return;
    }

    const formData = {
      title: text,
      status: task.status,
    }

    const res = await fetch('http://localhost:3500/tasks/'+task.id,{
      method: 'PUT',
      headers:{
        'Content-type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    setTasks(tasks.map((taskIt) => taskIt.id ===  task.id ? {...taskIt, title: data.title, status: data.status} : taskIt));
    setText('');
    setTaskAddForm(true);
    setTaskEditForm(false); 
  }

  const deleteTask = async (id) => {
    if(window.confirm("Are you sure you want to delete?")){
        const res = await fetch('http://localhost:3500/tasks/'+ id,{
          method: 'DELETE',
      });

      setTasks(tasks.filter((task) => task.id != id));

      }
  }

  const updateTaskStatus = async (e, taskObj) => {

    const status = (e.target.checked) ? 'completed' : 'active';
    const formData = {
      title: taskObj.title,
      status: status,
    }

    const res = await fetch('http://localhost:3500/tasks/'+taskObj.id,{
      method: 'PUT',
      headers:{
        'Content-type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    setTasks(tasks.map((taskIt) => taskIt.id ===  taskObj.id ? {...taskIt, status: data.status} : taskIt));
   
  }

  useEffect(() => {
    fetchTasks();
  },[]);

  return (
    <div className="App">
      <div className='bg-dark'>
        <div className='container'>
          <h1 className='text-white py-3 text-center'>React To Do App</h1>
        </div>
      </div>
      <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-md-7'>
                <div className='card shadow border-0 my-5 p-3'>
                  <div className='card-header'>
                      <h1 className='h3'>Tasks</h1>
                  </div>
                  <div className='card-body'>

                    { taskAddForm == true && <form onSubmit={addForm}>
                          <div className='row'>
                              <div className='col-md-10 mb-3'>
                                  <input value={text} onChange={(e) => setText(e.target.value)} className='form-control' type='text' placeholder='Enter your Task'/>
                              </div>
                              <div className='col-md-2 mb-3'>
                                <button className='btn btn-dark'>ADD</button>
                              </div>
                            </div>
                        </form>
                    }
                 

                 {
                    taskEditForm == true && <form onSubmit={updateTask}>
                      <div className='row'>
                          <div className='col-md-10 mb-3'>
                              <input value={text} onChange={(e) => setText(e.target.value)} className='form-control' type='text' placeholder='Enter your Task'/>
                          </div>
                          <div className='col-md-2 mb-3'>
                            <button className='btn btn-dark'>UPDATE</button>
                          </div>
                        </div>
                    </form>
                 }

                      <div className='row'>

                        <div className='col-md-12 mb-3'>
                          <div className='btn-group' role='group' aria-label='Basic example'>
                              <button onClick={() => filterTasks('all')} type='button' className={`btn btn-primary ${activeClass == 'all' && 'active'}`}>All</button>
                              <button onClick={() => filterTasks('active')} type='button' className={`btn btn-primary ${activeClass == 'active' && 'active'}`}>Active</button>
                              <button onClick={() => filterTasks('completed')} type='button' className={`btn btn-primary ${activeClass == 'completed' && 'active'}`}>Completed</button>
                          </div>
                        </div>

                        <div className='col-md-12'>
                          <table className='table table-striped'>
                            <tbody>
                              {
                                tasks.map((task) => {
                                  return (<tr key={task.id}>
                                      <td>
                                          <div className='form-check'>
                                              <input defaultChecked={task.status == 'completed'} onClick={(e) => updateTaskStatus(e,task)} className='form-check-input' type='checkbox' id={`status-${task.id}`} />
                                              <label className={`form-check-label ${task.status == 'completed' && 'text-completed'}`} htmlFor={`status-${task.id}`}>{task.title}</label>
                                          </div>
                                      </td>
                                      <td width="130">
                                        <a href='#' onClick={() => showEditForm(task.id)} className='btn btn-sm btn-primary'>
                                          Edit
                                        </a>
      
                                        <a href='#' onClick={() => deleteTask(task.id)} className='btn btn-sm btn-danger ms-2'>
                                          Delete
                                        </a>
      
                                      </td>
                                    </tr>)
                                }) 
                              }
                      
                            </tbody>

                          </table>

                        </div>

                      </div>
                  </div>
                </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default App;
