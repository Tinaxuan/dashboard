import {Route} from 'react-router-dom';

import LoginPage from './pages/LogIn';
import RegisterPage from './pages/Register';
import Main from './pages/Main';
import News from './pages/News';
import TaskPage from './pages/Task';

function App() {
  //localhost: 3000
  return (<div>
    <Route path='/login'>
      <LoginPage></LoginPage>
    </Route>
    <Route path='/register'>
      <RegisterPage></RegisterPage>
    </Route>
    <Route path='/main'>
      <Main></Main>
    </Route>
    <Route path='/news'>
      <News></News>
    </Route>
    <Route path='/tasks'>
      <TaskPage></TaskPage>
    </Route>
  </div>)
  
}

export default App;
