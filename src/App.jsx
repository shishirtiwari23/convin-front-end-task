import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { baseUserURL, userActions } from "./store";

const App = () => {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const users = useSelector((state) => state?.userSlice?.users);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getUser() {
      if (currentUserId) {
        try {
          setIsLoading(true);
          const res = await axios.get(`${baseUserURL}/users/${currentUserId}`);
          setCurrentUser(res?.data?.data);
          setIsLoading(false);
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
    console.log(isLoading);
  });

  useEffect(() => {
    async function getAllUsers() {
      try {
        const res = await axios.get(`${baseUserURL}/users`);
        dispatch(userActions.updateUsers(res?.data?.data));
        setIsPageLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    getAllUsers();
  }, []);

  if (isPageLoading)
    return (
      <div className="loadingContainer">
        <svg viewBox="25 25 50 50">
          <circle r="20" cy="50" cx="50"></circle>
        </svg>
      </div>
    );

  return (
    <div className="App">
      <div className={currentUser ? "userInfo card" : "noUser card"}>
        {currentUser ? (
          <>
            {isLoading ? (
              <div className="cardLoadingContainer">
                <svg viewBox="25 25 50 50">
                  <circle r="20" cy="50" cx="50"></circle>
                </svg>
              </div>
            ) : (
              <>
                <div className="left">
                  <h3 className="name">
                    {currentUser?.first_name} {currentUser?.last_name}
                  </h3>
                  <h4 className="id">Id: {currentUser?.id}</h4>
                  <h4 className="email">Email: {currentUser?.email}</h4>
                </div>
                <div className="right">
                  <img
                    className="image"
                    src={currentUser?.avatar}
                    alt={currentUser?.first_name}
                  />
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <h2>Select a user</h2>
            <h4>Click on one of the button below</h4>
          </>
        )}
      </div>
      <div className="buttons">
        {users.map((user, index) => (
          <button
            className={currentUserId === user?.id ? "active" : ""}
            onClick={() => setCurrentUserId(user.id)}
            key={index}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <button
        className="reset"
        onClick={() => {
          setCurrentUserId(null);
          setCurrentUser(null);
        }}
      >
        Reset
      </button>
    </div>
  );
};

export default App;
