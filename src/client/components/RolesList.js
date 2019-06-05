import React, {Component} from "react";
import MyCan from "./MyCan";

export default class RolesList extends Component {

    render() {
        const roles = this.props.roles;
        console.log("RolesList:render() roleList=", roles);

        return (
            <div>
                <h2>Roles List</h2>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Code</th>
                        <th scope="col">Name</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {roles && roles.map((role, index) => (
                            <tr key={role.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{role.code}</td>
                            <td>{role.name}</td>
                            <td>
                                <MyCan
                                    perform="auth:roles:update"
                                    yes={() => (
                                        <button className="btn btn-sm btn-default">
                                        Edit Role
                                        </button>
                                    )}
                                    />
                                <MyCan
                                    perform="auth:roles:delete"
                                    yes={() => (
                                        <button className="btn btn-sm btn-danger">
                                        Delete Role
                                        </button>
                                    )}
                                />
                            </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

}