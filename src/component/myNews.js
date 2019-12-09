
/**
 * 全局公告
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button, Badge } from 'antd';

export default class App extends React.Component {
    state = { visible: false }
    showModal = () => {
        this.setState({
        visible: true,
        });
    }
    handleOk = (e) => {
        console.log(e);
        this.setState({
        visible: false,
        });
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
        visible: false,
        });
    }
    render() {
        return (
        <div>
            <span onClick={this.showModal}>
                我的消息<Badge count={12} style={{ backgroundColor: '#52c41a',marginLeft:10, marginTop:-5 }} />
            </span>
            <Modal
            title="最新消息 （一周内）"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            >

            </Modal>
        </div>
        );
    }
}