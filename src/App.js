import './App.css';
import { Provider } from "react-redux";
import 'antd/dist/antd.css';
import Table from './Components/Table/Table';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Table />
      </div>
      </Provider>
  );
}

export default App;
