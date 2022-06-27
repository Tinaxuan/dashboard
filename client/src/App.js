import {Route} from 'react-router-dom';

import LoginPage from './pages/LogIn';
import RegisterPage from './pages/Register';
import Main from './pages/Main';
import NewsPage from './pages/News';
import TaskPage from './pages/Task';
import SportsPage from './pages/Sports';
import ImagePage from './pages/Image';

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
      <NewsPage></NewsPage>
    </Route>
    <Route path='/tasks'>
      <TaskPage></TaskPage>
    </Route>
    <Route path='/sports'>
      <SportsPage></SportsPage>
    </Route>
    <Route path='/images'>
      <ImagePage></ImagePage>
    </Route>
  </div>)
  
}

export default App;
