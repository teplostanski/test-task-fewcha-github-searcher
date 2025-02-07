import { Provider } from 'react-redux';
import { store } from './store/store';
import { GithubRepos } from './components/GithubRepos';

function App() {
  return (
    <Provider store={store}>
      <div>
        <h1>GitHub Repository Search</h1>
        <GithubRepos />
      </div>
    </Provider>
  );
}

export default App;
