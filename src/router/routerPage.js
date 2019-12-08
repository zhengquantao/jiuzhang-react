import React from 'react'  
import { Router, Route, IndexRoute, browserHistor, Link } from 'react-router'  

// 引入所有基础配置
import '../config/globalConfig'
  
import Home from '../page'
import IndexOne from '../page/indexOne'
import IndexTwo from '../page/indexTwo'
import indexThree from '../page/indexThree'
import indexFour from '../page/indexFour'
import Today from '../page/today'
import List from '../page/list'
import ShopHome from '../page/shop/home'
import HomeDetail from '../page/shop/home_detail'
import After from '../page/after'
import Select from '../page/select'
import Redux from '../page/redux'
import Login from '../page/login/login'
import RegistrationForm from '../page/login/resgiter'


export default class RouteMap extends React.Component {  
    updateHandle () {  
        console.log('每次router变化之后都会触发', window.location.hash)
        // if(window.location.hash !== "#/login" || window.location.hash !== "#/register"){
        //     const user = localStorage.getItem("jwt_username");
        //     const token = localStorage.getItem("jwt_token");
        //     if (user && token){
        //
        //     }else{
        //         this.props.router.push("/login");
        //     }
        // }
    }  
    render () {  
        return (  
            <Router history={this.props.history}  onUpdate={this.updateHandle.bind(this)}>  
                <Route path='/' component={Home}>
                    <IndexRoute component={List}/>
                    <Route path='/1' component={IndexOne}></Route>
                    <Route path='/2' component={IndexTwo}></Route>
                    <Route path='/3' component={indexThree}></Route>
                    <Route path='/4' component={indexFour}></Route>
                    <Route path='/today' component={Today}></Route>
                    <Route path='/list' components={List}></Route>
                    <Route path='/shop_home' component={ShopHome}></Route>
                    <Route path='/shop_home_detail' component={HomeDetail}></Route>
                    <Route path='/after' component={After}></Route>
                    <Route path='/select' component={Select}></Route>
                    <Route path='/redux' component={Redux}></Route>
                </Route>
                <Route path='/login' components={Login}></Route>
                <Route path='/register' components={RegistrationForm}></Route>
            </Router>  
        )  
    }  
}  
