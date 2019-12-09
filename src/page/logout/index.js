import React, { Component } from 'react';

export default class Update extends Component {
    constructor (props) {
        super(props)
    }
    componentDidMount() {
        localStorage.removeItem("jwt_username");
        localStorage.removeItem("jwt_token");
        this.props.router.push("/login");
    }

    render () {
        return (
            <div style={{width:'800px',margin: 'auto',marginTop:50}}>   

            </div>
        )
    }
}