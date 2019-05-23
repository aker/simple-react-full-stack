import React, {Component} from "react";
import MyCan from "./MyCan";

export default class RolesList extends Component {
    state = {
        roles: ""
    }

    componentDidMount() {
        const requestOptions = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + this.props.accessToken,
            },
            method: 'GET'
        }
        
        console.log("roleslist:accesstoken=", this.props.accessToken);
        fetch("http://localhost:8080/api/roles?code=role_user", requestOptions)
            .then(res => res.json())
            .then(data => {
                console.log("roleslist.data:", data);
                this.setState({roles: data});
            });
    }

    render() {
        const role = this.state.roles;
        console.log("RolesList:render() roleList=", role);

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
                        {role && (
                            <tr key={role.id}>
                            <th scope="row">{1}</th>
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
                        )}
                    </tbody>
                </table>
            </div>
        );
    }

}