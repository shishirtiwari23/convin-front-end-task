import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { baseUserURL, userActions } from "./store";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const users = useSelector((state) => state?.userSlice?.users);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getUser() {
      if (currentUserId) {
        try {
          const res = await axios.get(`${baseUserURL}/users/${currentUserId}`);
          setCurrentUser(res?.data?.data);
        } catch (err) {
          console.log(err);
        }
      } else {
        setCurrentUser(null);
      }
    }
    getUser();
  }, [currentUserId]);
  useEffect(() => {
    console.log(currentUser);
  });
  useEffect(() => {
    async function getAllUsers() {
      try {
        const res = await axios.get(`${baseUserURL}/users`);
        dispatch(userActions.updateUsers(res?.data?.data));
      } catch (err) {
        console.log(err);
      }
    }
    getAllUsers();
  }, []);
  return (
    <div className="App">
      <div className="userInfo card">
        <h1>Current User Id {currentUserId}</h1>
      </div>
      <div>
        {users.map((user, index) => (
          <button onClick={() => setCurrentUserId(user.id)} key={index}>
            User {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
