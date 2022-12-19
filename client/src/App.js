import logo from './logo.svg';
import './App.css';
import Baduk from './component/game/Baduk';
import RoomSet from './component/game/RoomSet';
import Users from './component/game/Users';
import './component/game/game.js'
function App() {
  return (
    <div className="App">
      <Users/>
      <Baduk/>
      <RoomSet/>

    </div>
  );
}

export default App;
