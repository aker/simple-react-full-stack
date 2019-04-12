import React from "react";
import { AuthConsumer } from "../authContext";

export default class FoosList extends React.Component {
    state = {
        foo: "loading data"
    }

    componentDidMount() {
        let accessToken = sessionStorage.getItem("access_token");
        const requestOptions = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + accessToken,
            },
            method: 'GET'
        }
        
        console.log("fooslist:accesstoken=", accessToken);

        fetch("/apii/roles/1", requestOptions)
        .then(res => res.json())
        .then(foo => this.setState({foo}));
    }

    render() {
        return (
            <div>
                <h2>Roles List</h2>
                <p>
                    {this.state.foos}
                </p>
            </div>
        );
    }
}