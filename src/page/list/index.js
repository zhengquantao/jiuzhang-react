import React, { Component } from 'react';
import {Row, Col, Form, DatePicker, TimePicker, Table, Button, Input, Icon, Select, Divider, Popconfirm} from 'antd';

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
                <Popconfirm title="是否删除?" onConfirm={() => this.handleDelete(record.key)}>
                  <a>Delete</a>
                </Popconfirm>
              ) : null,
          },
        ];
    }


    componentWillMount(){
         axios.post('http://127.0.0.1:8000/api/v1/home/', {
      "username": localStorage.getItem("jwt_username"), "token": localStorage.getItem("jwt_token")}
      ,{Headers: {"Access-Control-Allow-Headers":"Content-Type"}}).then(
          response =>{
              console.log(response.data.data);
              if (response.data.code === 1000){
                  const todoList = this.state.dataSource;
                  for (const index in response.data.data){
                      todoList.push(response.data.data[index]);
                  }
                  this.setState({dataSource:todoList})
              }
          }
      )
    }

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
        axios.post('http://127.0.0.1:8000/api/v1/update/', {"tid": newData[index].index,
                "desc":newData[index].desc, "datetime": newData[index].datetime, "index": newData[index].index, "status": newData[index].status, "username": localStorage.getItem("jwt_username"), "token": localStorage.getItem("jwt_token")}
      ,{Headers: {"Access-Control-Allow-Headers":"Content-Type"}}).then(
          response =>{
              console.log(response.data);
          }
      )
      };
    render() {
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
                    <Col span={3} offset={2}><strong style={{fontSize:"20px"}}>所有事项</strong>&nbsp;&nbsp;</Col>

                    <Col span={12} offset={1} style={{marginTop:100}}>
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
const TableTwo =  Form.create()(EchartsTests);
export default TableTwo;