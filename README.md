###  由于时间比较紧 就没有把他细节做完整   时间: 2019-12-6 ~~ 2019-12-9

## 功能支持
- [x] 增加一个待办事项 
- [x] 删除一个待办事项 
- [x] 标记一个待办事项为已完成 
- [x] 编辑一个待办事项的具体内容 
- [x] 列出所有的待办事项 
- [x] 列表界面支持翻页 
- [x] 待办事项可以设置优先级 
- [x] 待办事项可以设置 expire date 
- [x] 支持按照不同的方式排序，如优先级，expire date
- [x] API 带有测试用例 (因为我设置token验证, 所以需要token才能测试)

#####  <span style="font-siez='20px'"> 九章 demo</span>  <br/>

<img src="https://github.com/zhengquantao/jiuzhang-react/blob/master/src/img/home.png" width=100%>
# 增加
<img src="https://github.com/zhengquantao/jiuzhang-react/blob/master/src/img/add.png" width=100%>
# 增加成功
<img src="https://github.com/zhengquantao/jiuzhang-react/blob/master/src/img/add-success.png" width=100%>
# 优先级为4
<img src="https://github.com/zhengquantao/jiuzhang-react/blob/master/src/img/4.png" width=100%>
# 今天
<img src="https://github.com/zhengquantao/jiuzhang-react/blob/master/src/img/today.png" width=100%>
# 登录
<img src="https://github.com/zhengquantao/jiuzhang-react/blob/master/src/img/login.png" width=100%>
# 注册
<img src="https://github.com/zhengquantao/jiuzhang-react/blob/master/src/img/register.png" width=100%>
# 验证码
<img src="https://github.com/zhengquantao/jiuzhang-react/blob/master/src/img/email-code.png" width=100%>

# 接口
```text
登录:http://127.0.0.1:8000/api/v1/login/
注册:http://127.0.0.1:8000/api/v1/register/
今天:http://127.0.0.1:8000/api/v1/today/
发送验证码:http://127.0.0.1:8000/api/v1/send/
发送提醒邮件:http://127.0.0.1:8000/api/v1/email/
查:http://127.0.0.1:8000/api/v1/filter/
改 :http://127.0.0.1:8000/api/v1/update/
删 :http://127.0.0.1:8000/api/v1/delete/
```


