import { CanceledError } from "axios";
import { useState, useEffect } from "react";
import userService, { User } from "../services/user-service";

const useUsers = () => {

    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string>("");
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const { request, cancel } = userService.getAll<User>();
        request
          .then((res) => {
            setLoading(false);
            setUsers(res.data);
          })
          .catch((error) => {
            setLoading(false);
            if (error instanceof CanceledError) {
              return;
            }
            setError(error.message);
          });
        return cancel;
      }, []);

      return {users,error,isLoading, setUsers, setError, setLoading};
}
export default useUsers;