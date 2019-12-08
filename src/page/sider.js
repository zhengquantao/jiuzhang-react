import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { browserHistory,  Link } from 'react-router'  //引入路由函数

import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class Sider extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			key: 1
		}
	}
    handleClick = (e) => {
		console.log(e)
		this.props.getValue(e.key,e.item.props.children); 
	}
    render () {
				return (
					<Menu
						onClick={this.handleClick}
						onChange = {this.getValue}
						style={{ width: 256,height:'90vh',overflow: 'auto',minWidth:256}}
						defaultSelectedKeys={['1']}
						defaultOpenKeys = {['sub1','sub2','sub3','sub4','sub5','sub10']}
						mode="inline"
					>
                        <SubMenu key="sub13" title={<span><Icon type="meh-o" /><Link to = {'list'}><span>首页</span></Link></span>}>
						</SubMenu>
						<SubMenu key="sub3" title={<span><Icon type="meh-o" /><span>Today</span></span>}>
							<Menu.Item key="6">
								<Link to = {'today'}>今天</Link>
							</Menu.Item>
						</SubMenu>
						<SubMenu key="sub4" title={<span><Icon type="meh" /><span>接下来7天</span></span>}>
							<Menu.Item key="7">
								<Link to = {'after'}>接下来7天</Link>
							</Menu.Item>
						</SubMenu>
						<SubMenu key="sub1" title={<span><Icon type="smile-o" /><span>Filter</span></span>}>
								<Menu.Item key="1">
									<Link to = {'1'}>优先级1</Link>
								</Menu.Item>
								<Menu.Item key="2">
									<Link to = {'2'}>优先级2</Link>
								</Menu.Item>

								<Menu.Item key="3">
									<Link to = {'3'}>优先级3</Link>
								</Menu.Item>
								<Menu.Item key="4">
									<Link to = {'4'}>优先级4</Link>
								</Menu.Item>
						</SubMenu>

						<SubMenu key="sub2" title={<span><Icon type="frown" /><span>项目</span></span>}>
							<Menu.Item key="5">
								<Link to = {'shop_home'}>增加</Link>
							</Menu.Item>
						</SubMenu>

						{/*<SubMenu key="sub6" title={<span><Icon type="frown" /><span>filter</span></span>}>*/}
						{/*	<Menu.Item key="8">*/}
						{/*	<Link to = {'redux'}>Redux</Link>*/}
						{/*	</Menu.Item>*/}
						{/*</SubMenu>*/}

					</Menu>
				);
			}
  }