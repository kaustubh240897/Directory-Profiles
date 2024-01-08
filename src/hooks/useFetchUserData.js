import { useContext, useEffect } from "react";
import { UsersContext } from "../context/UsersContext";

const useFetchUserData = () => {
    const { users, setUsers } = useContext(UsersContext);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const usersResponse = await fetch("https://jsonplaceholder.typicode.com/users");
                const postsResponse = await fetch("https://jsonplaceholder.typicode.com/posts");

                if (!usersResponse.ok || !postsResponse.ok) {
                    throw new Error("Failed to fetch data");
                }

                const usersData = await usersResponse.json();
                const postsData = await postsResponse.json();

                const enrichedUsers = usersData.map((user) => ({
                    ...user,
                    posts: postsData.filter((post) => post.userId === user.id),
                }));

                setUsers(enrichedUsers);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        if (!users) {
            fetchUserData();
        }
    }, [users, setUsers]);

    return users;
};

export default useFetchUserData;
