import React, { Component } from 'react';
import {Row, Col, Form, DatePicker, TimePicker, Table, Button, Input, Icon, Select, Divider, Popconfirm} from 'antd';
import './date.css'
import axios from "axios";
const FormItem = Form.Item;

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: false,
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = e => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  renderCell = form => {
    this.form = form;
    const { children, dataIndex, record, title } = this.props;
    const { editing } = this.state;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} is required.`,
            },
          ],
          initialValue: record[dataIndex],
        })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    );
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
}


class EchartsTests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [
            {
              key: '0',
              desc: 'Edward King 0',
              datetime: '32',
                status:1,
              index: '2',
            },
            {
              key: '1',
              desc: 'Edward King 1',
              datetime: '32',
                status:0,
              index: '1',
            },
          ],
        };
         this.columns = [
          {
            title: '内容',
            dataIndex: 'desc',
            width: '30%',
            editable: true,
          },
          {
            title: '时间',
            dataIndex: 'datetime',
              editable: true,
          },
          {
            title: '优先级',
            dataIndex: 'index',
              editable: true,
          },
             {
               title: '状态',
                 dataIndex: 'status',
                 editable: true,
             },
          {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record) =>
              this.state.dataSource.length >= 1 ? (
                <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                  <a>Delete</a>
                </Popconfirm>
              ) : null,
          },
        ];
    }


    componentWillMount(){
        const today = new Date();
        const today_time = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
         axios.post('http://127.0.0.1:8000/api/v1/init/', {"datetime": today_time,
      "username": localStorage.getItem("jwt_username"), "token": localStorage.getItem("jwt_token")}
      ,{Headers: {"Access-Control-Allow-Headers":"Content-Type"}}).then(
          response =>{
              if (response.data.code === 1000){
                  const todoList = this.state.dataSource;
                  todoList.push(response.data.data);
                  this.setState({dataSource:todoList})
              }
          }
      )
    }

    handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }

      // Should format date value before submit.
      const values = {
        ...fieldsValue,
        'date-time-picker': fieldsValue['date-time-picker'].format('YYYY-MM-DD HH:mm:ss'),
      };
      console.log('Received values of form: ', values);
      axios.post('http://127.0.0.1:8000/api/v1/add/', {"desc": values.desc, "datetime": values['date-time-picker'],
      "index": values.prefix,"username": localStorage.getItem("jwt_username"), "token": localStorage.getItem("jwt_token")}
      ,{Headers: {"Access-Control-Allow-Headers":"Content-Type"}}).then(
          response =>{
              console.log(response.data);
              if (response.data.code === 1000){
                  const todoList = this.state.dataSource;
                  todoList.push(response.data.data);
                  this.setState({dataSource:todoList})
              }
          }
      )
    });
  };

    handleDelete = key => {
        axios.post('http://127.0.0.1:8000/api/v1/delete/', {"tid": key,"username": localStorage.getItem("jwt_username"), "token": localStorage.getItem("jwt_token")}
      ,{Headers: {"Access-Control-Allow-Headers":"Content-Type"}}).then(
          response =>{
              console.log(response.data);
          }
      )
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });

    };

    handleSave = row => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ dataSource: newData });
        axios.post('http://127.0.0.1:8000/api/v1/update/', {"tid": index,
                "desc":item.desc, "datetime": item.datetime, "index": item.index, "status": item.status, "username": localStorage.getItem("jwt_username"), "token": localStorage.getItem("jwt_token")}
      ,{Headers: {"Access-Control-Allow-Headers":"Content-Type"}}).then(
          response =>{
              console.log(response.data);
          }
      )
      };


    render() {
        const today = new Date();
        this.date = {time: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()}
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
          },
        };
        const config = {
          rules: [{ type: 'object', required: true, message: '请选择时间!' }],
        };

        const { dataSource } = this.state;
        const components = {
          body: {
            row: EditableFormRow,
            cell: EditableCell,
          },
        };
        const columns = this.columns.map(col => {
          if (!col.editable) {
            return col;
          }
          return {
            ...col,
            onCell: record => ({
              record,
              editable: col.editable,
              dataIndex: col.dataIndex,
              title: col.title,
              handleSave: this.handleSave,
            }),
          };
        });


        return (
            <div>
                <Row style={{marginTop:50}}>
                    <Col span={6} ><strong style={{fontSize:"20px"}}>今天</strong>&nbsp;&nbsp;<text>{ this.date.time }</text></Col>
                    <Col span={6} offset={2}>
                        <div style={{marginTop:100}}>
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem
                            {...formItemLayout}
                            label="内容"
                            >
                                  {getFieldDecorator('desc', {
                                    rules: [{ required: true, message: '内容时间不能为空哦!' }],
                                })(
                                    <Input  placeholder="请输入内容" />
                                )}
                            </FormItem>
                            <FormItem
                             {...formItemLayout}
                            label="时间"
                            >
                                {getFieldDecorator('date-time-picker', config)(
                                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                                 )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                            label="优先级"
                            >
                                {getFieldDecorator('prefix', {
                                initialValue: '1'
                                })(
                                  <Select style={{ width: 70 }}>
                                      <option value="1">+1</option>
                                      <option value="2">+2</option>
                                      <option value="3">+3</option>
                                      <option value="4">+4</option>
                                  </Select>
                                )}
                            </FormItem>
                            <FormItem
                            wrapperCol={{
                                xs: { span: 24, offset: 0 },
                                sm: { span: 16, offset: 8 },
                            }}
                            >
                            <Button type="primary" htmlType="submit">增加</Button>
                            </FormItem>
                        </Form>
                    </div>
                    </Col>
                    <Col span={12} offset={6}>
                        <Table
                          components={components}
                          rowClassName={() => 'editable-row'}
                          bordered
                          dataSource={dataSource}
                          columns={columns}
                        />
                    </Col>
                </Row>

            </div>
                
        );
    }
}
const EchartsTest =  Form.create()(EchartsTests);
export default EchartsTest;