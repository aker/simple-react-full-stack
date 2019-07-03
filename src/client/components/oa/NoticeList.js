import React, {Component} from "react";
import MyCan from "../MyCan";

export default class NoticeList extends Component {

    render() {
        const notices = this.props.notices;
        console.log("NoticeList:render() noticeList=", notices);

        return (
            <div>
                <h2>Notice List</h2>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Context</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {notices && notices.map((notice, index) => (
                            <tr key={notice.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{notice.title}</td>
                            <td>{notice.context}</td>
                            <td>
                                <MyCan
                                    perform="oa:notices:update"
                                    yes={() => (
                                        <button className="btn btn-sm btn-default">
                                        Edit Notice
                                        </button>
                                    )}
                                    />
                                <MyCan
                                    perform="oa:notices:delete"
                                    yes={() => (
                                        <button className="btn btn-sm btn-danger">
                                        Delete Notice
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