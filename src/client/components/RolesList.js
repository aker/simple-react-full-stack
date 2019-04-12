import React from "react";
import { AuthConsumer } from "../authContext";

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
    
            let role = "";
            fetch("http://localhost:8180/roles/1", requestOptions)
            .then(res => res.json())
            .then(data => {
                console.log("roleslist.data:", data);
                role = data;
            });

            return (
                <div>
                    <h2>Roles List</h2>
                    {role}
                </div>
            );
        }}
    </AuthConsumer>
)

export default RolesList;