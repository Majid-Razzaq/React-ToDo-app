import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

function App() {

  const [text, setText] = useState('');

  const addForm = (e) => {
    e.preventDefault();

    if(!text){
      alert("Task can not be blank");
      return;
    }
  }
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
                    <form onSubmit={addForm}>
                      <div className='row'>
                          <div className='col-md-10 mb-3'>
                              <input value={text} onChange={(e) => setText(e.target.value)} className='form-control' type='text' placeholder='Enter your Task'/>
                          </div>
                          <div className='col-md-2 mb-3'>
                            <button className='btn btn-dark'>Add</button>
                          </div>
                        </div>
                    </form>

                      <div className='row'>
                        <div className='col-md-12'>
                          <table className='table table-striped'>
                            <tbody>
                              <tr>
                                <td>
                                    <div className='form-check'>
                                        <input className='form-check-input' type='checkbox' checked="" />
                                        <label className='form-check-label text-completed'>Buy some coffee</label>
                                    </div>
                                </td>
                                <td width="130">
                                  <a href='#' className='btn btn-sm btn-primary'>
                                    Edit
                                  </a>

                                  <a href='#' className='btn btn-sm btn-danger ms-2'>
                                    Delete
                                  </a>

                                </td>
                              </tr>
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
