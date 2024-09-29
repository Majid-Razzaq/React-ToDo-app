import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';

function App() {

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
                        <div className='col-md-12'>
                          <table className='table table-striped'>
                            <tbody>
                              {
                                tasks.map((tasks) => {
                                  return (<tr key={tasks.id}>
                                      <td>
                                          <div className='form-check'>
                                              <input className='form-check-input' type='checkbox'/>
                                              <label className='form-check-label text-completed'>{tasks.title}</label>
                                          </div>
                                      </td>
                                      <td width="130">
                                        <a href='#' onClick={() => showEditForm(tasks.id)} className='btn btn-sm btn-primary'>
                                          Edit
                                        </a>
      
                                        <a href='#' className='btn btn-sm btn-danger ms-2'>
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
