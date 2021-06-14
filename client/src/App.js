import Notes from './components/note';
import NotesList from './components/notes-list';
import Search from './components/search';
import { Switch, Route, Link } from 'react-router-dom';
import './App.css';
import './master.css';
import Create from './components/create';

function App() {
  return (
    <div className="app">
      <header
        className="header">
        <Link to="/">
          <h4>TODO</h4>
        </Link>
      </header>
      <main>
        <Switch>
          <Route exact path={['/', '/todos']} >
            <NotesList/>
          </Route>
          <Route 
            path='/todos/:id/update'
            render={(props) => (
              <Search {...props}/>
            )}/>
            <Route 
              path='/todos/create'
              render={(props) => (
                <Create {...props}/>
              )}/>
          <Route path={['/todos/:id']}>
            <Notes />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
