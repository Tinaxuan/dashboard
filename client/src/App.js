import {Route} from 'react-router-dom';

import LoginPage from './pages/LogIn';
import RegisterPage from './pages/Register';
import Main from './pages/Main';

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
  </div>)
  
}

export default App;
