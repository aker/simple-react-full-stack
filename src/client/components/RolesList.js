import React from "react";
import { AuthConsumer } from "../authContext";
import MyCan from "./MyCan";

const RolesList = () => (
    <AuthConsumer>
        {({accessToken}) => {
            const requestOptions = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + accessToken,
                },
                method: 'GET'
            }
            
            console.log("roleslist:accesstoken=", accessToken);
            
            let roles;
            fetch("http://localhost:8080/api/roles?code=role_user", requestOptions)
            .then(res => res.json())
            .then(data => {
                console.log("roleslist.data:", data);
                roles = data;
            });

            return (
                <div>
                    <h2>Roles List</h2>
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Code</th>
                            <th scope="col">Name</th>
                        </tr>
                        </thead>
                        <tbody>
                            {roles}
                            <MyCan
                                perform="auth:roles:update"
                                yes={() => (
                                    <button className="btn btn-sm btn-default">
                                    Edit Post
                                    </button>
                                )}
                                />
                            {/* {roles.map((role, index) => (
                                <tr key={role.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{role.code}</td>
                                <td>
                                    <MyCan
                                        perform="auth:roles:update"
                                        yes={() => (
                                            <button className="btn btn-sm btn-default">
                                            Edit Post
                                            </button>
                                        )}
                                        />
                                    <MyCan
                                        perform="auth:roles:delete"
                                        yes={() => (
                                            <button className="btn btn-sm btn-danger">
                                            Delete Post
                                            </button>
                                        )}
                                    />
                                </td>
                                </tr>
                            ))} */}
                        </tbody>
                        </table>
                </div>
            );
        }}
    </AuthConsumer>
)

export default RolesList;