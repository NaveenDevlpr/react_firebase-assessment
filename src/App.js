import {Routes,Route} from 'react-router-dom'
import Home from './components/Home';
import AddForm from './components/AddForm';

function App() {
  return (
    <div className='max-w-7xl mx-auto h-screen flex items-center justify-center'>
      <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/add' element={<AddForm/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
