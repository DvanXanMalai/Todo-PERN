import React from "react";
import { getLoggedInUser } from "../utils/auth";

const Navbar = () => {
    const user = getLoggedInUser()
    return (
        <nav className="p-4 bg-blue-500 text-white flex justify-between">
            <h1 className="text-xl font-bold">Todo App</h1>
            {user ? (
                <div>
                    <span className="mr-4">Welcome, {user.username}!</span>
                    <button
                        className="bg-red-500 px-4 py-2 rounded"
                        onClick={() => {
                            localStorage.removeItem("token"); // Logout
                            window.location.reload();
                        }}
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <a href="/login" className="bg-green-500 px-4 py-2 rounded">Login</a>
            )}
        </nav>
    )
}
export default Navbar