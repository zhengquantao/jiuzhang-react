import React from 'react'
import { render } from 'react-dom'

import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Divider } from 'antd';
import {Link} from 'react-router'
import PropTypes from "prop-types";
import axios from "axios";
import './login.css'
const FormItem = Form.Item;


class Login extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
        if (!err) {
            console.log('Received values of form: ', values);
            axios.post('http://127.0.0.1:8000/api/v1/login/',{"username":values.userName, "password": values.password},{Headers: {"Access-Control-Allow-Headers":"Content-Type"}}).then(response => {
                const result = response.data;
                if(result.code === 1000){
                    localStorage.setItem("jwt_token", result.token);
                    localStorage.setItem("jwt_username", values.userName);
                    //this.setState({repoName: name, repoUrl: html_url});
                    this.props.router.push("/");
                }
            })

        }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
            return (
                <Form onSubmit={this.handleSubmit} className="login-form">
                     <h1>欢迎来到德莱联盟</h1>
                        <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: '请输入用户名!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                        )}
                        </FormItem>
                        <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                        )}
                        </FormItem>
                        <FormItem>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>记住密码</Checkbox>
                        )}
                        <a className="login-form-forgot" href="">忘记密码</a>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                        <Link to="/register">去注册</Link>
                    </FormItem>
                </Form>
            );
    }
}(Form.create()(Login));
export default Form.create()(Login);