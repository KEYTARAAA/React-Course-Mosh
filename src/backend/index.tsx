import { useEffect, useState } from "react";
import { CanceledError } from "./services/api-client";
import userService from "./services/user-service";
import { User } from "./services/user-service";
import useUsers from "./hooks/useUsers";
function Application() {
  const { users, isLoading, error, setUsers, setLoading, setError } =
    useUsers();
  const handleDeleteUser = (user: User) => {
    setUsers(users.filter((u) => user.id !== u.id));
    userService.delete(user.id).catch((error) => {
      setLoading(false);
      if (error instanceof CanceledError) {
        return;
      }
      setError(error.message);
    });
  };

  const handleCreateUser = (user: User) => {
    userService
      .create(user)
      .then((res) => setUsers([res.data, ...users]))
      .catch((error) => {
        setLoading(false);
        if (error instanceof CanceledError) {
          return;
        }
        setError(error.message);
      });
  };

  const handleUpdateUser = (user: User) => {
    userService
      .update(user)
      .then((res) => setUsers(users.map((u) => (u.id === user.id ? user : u))))
      .catch((error) => {
        setLoading(false);
        if (error instanceof CanceledError) {
          return;
        }
        setError(error.message);
      });
  };

  return (
    <>
      {error && (
        <p className="text-danger">
          <strong>{error}</strong>
        </p>
      )}
      {isLoading && <div className="spinner-border"></div>}
      <button
        className="btn btn-primary mb-3"
        onClick={() => {
          handleCreateUser({ id: users.length + 1, name: "Kitara Stewart" });
        }}
      >
        Add
      </button>
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between"
          >
            {user.name}
            <div>
              <button
                className="btn btn-outline-secondary mx-1"
                onClick={() =>
                  handleUpdateUser({ ...user, name: user.name.toUpperCase() })
                }
              >
                Update
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => handleDeleteUser(user)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
export default Application;
