import { Link } from "react-router-dom";
import useFetchUserData from "../hooks/useFetchUserData";
import classes from "./UserList.module.css";

function UserList() {
    const users = useFetchUserData();

    return (
        <>
            <div className={classes.title}>User's Directory</div>
            <ul className={classes.list}>
                {users &&
                    users.map((user) => (
                        <li key={user.id} className={classes.card}>
                            <Link to={`/${user.id}`} className={classes.link}>
                                <div> Name: {user.name}</div>
                                <div>Posts: {user.posts.length}</div>
                            </Link>
                        </li>
                    ))}
            </ul>
        </>
    );
}

export default UserList;
