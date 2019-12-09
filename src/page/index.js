import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Layout, Row, Col, Avatar, Input, Menu, Dropdown, Icon, Badge } from 'antd';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'

import SiderComponent from './sider'
import {Link} from "react-router";

const { Header, Footer, Sider, Content } = Layout;

// 
const menu = (
    <Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/zhengquantao/jiuzhang-react/">我的博客</a>
        </Menu.Item>
        <Menu.Item>
            <Link to="/logout">注销</Link>
        </Menu.Item>
    </Menu>
);

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '1',
            valueTxt: '',
        }
    }

    getValue (val, value) {
        this.setState({
            value: val,
            valueTxt: value
        })
    }

    render () {
        return (
            <div style={{ minWidth: '1000px' }}>
                <Layout>
                    <Header style={{ backgroundColor: '#ca2100', color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>
                        <Row>
                            <Col span={10}>
                                TODO
                            </Col>
                            <Col span={8}><Input placeholder="请输入你想要的......" /></Col>
                            <Col span={6}>
                                <Avatar style={{ backgroundColor: '#87d068', marginRight: 20 }} icon="user" />
                                <Dropdown overlay={menu}>
                                    <span className="ant-dropdown-link" href="#" style={{ color: '#fff', cursor: 'pointer' }}>
                                        Admin <Icon type="down" />
                                    </span>
                                </Dropdown>
                            </Col>
                        </Row>
                    </Header>
                    <Layout>
                        <Sider style={{ color: '#666' }}>
                            <SiderComponent
                                getValue={this.getValue.bind(this)}
                            />
                        </Sider>
                        <Content style={{ marginLeft: '5%', height: '86vh', paddingRight: '2%', overflow: 'auto', textAlign: 'center' }}>
                            {this.props.children}
                        </Content>
                    </Layout>
                    <Footer style={{ backgroundColor: '#ca2100', position: 'fixed', bottom: 0, width: '100vw', minWidth: '1000px', textAlign: 'center', fontWeight: 'bold', color: '#fff' }}>
                        <a href="https://github.com/zhengquantao/" target="_blank">zhengquantao</a>
                    </Footer>
                </Layout>
            </div>
        )
    }
}
