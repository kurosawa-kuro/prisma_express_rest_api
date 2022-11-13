import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  type User = {
    id: number,
    name: string,
    email: string,
  };

  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    axios.get('/users')
      .then(res => {
        setUsers(res.data.users)
      })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        {users && users.map((user) => (
          <span key={user.id}> {user.email}</span>
        ))}
      </header>
    </div>
  );
}

export default App;
