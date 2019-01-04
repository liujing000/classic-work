import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Divider, Icon, Pagination, Alert, Button, Input, Modal, Form } from 'antd';
import { message, Popconfirm, Radio, Cascader, Select  } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;

let currentEntry;

@connect(({ classic,loading }) => ({
  classic,
  loading: loading.models.classic,
}))

@Form.create()

export default class list extends Component {
  loadCategories() {
    this.props.dispatch({
      type: 'classic/loadCategories',
      payload: this.state.page,
    });
  }

  componentDidMount() {
    this.loadCategories();
  }

  constructor(props) {
    super(props);
    this.state = {
      status: 'normal', //控制的状态
      entry:{},
      page:{
        pindex:1,
        psize:10,
        parent:'',
        title:'',
        status:'',
      },
      // role:'',
      selectedRowKeys: [],
      selectedRowValues: [],
    };
  }

  //删除
  onDelete = entry => {
    let arr = [];
    arr[0] = entry;    
    this.props.dispatch({
      type: 'classic/removeCategories',
      payload: arr,
    });
  };
  //多选删除
  delAll = () => {
    Modal.confirm({
      title: '确认删除',
      content: '确认要删除当前所有的选中项吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        this.props.dispatch({
          type: 'classic/removeCategories',
          payload: this.state.selectedRowValues,
          callback:()=>{
            this.setState({ selectedRowKeys: [] });
          }
        });
      },
    });
  };
  //清空选中项
  delChoose = () => {
    this.setState({ selectedRowKeys: [] });
  };
  //多选 选中项
  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({
      selectedRowKeys,
      selectedRowValues: selectedRows,
    });
  };
  
  //弹框
  handleModal=(type, entry, event)=> {
    this.setState({
      status: type,
      entry: entry,
    });
    currentEntry = entry;
    this.props.form.setFieldsValue({
      parent: currentEntry ? currentEntry.parent : '',
      status: currentEntry ? currentEntry.status : '',
      title: currentEntry ? currentEntry.title : '',
      parentTitle: currentEntry ? currentEntry.parentTitle : '',
    });
  }
  //弹框上面的按钮
  handleCloseModal = (type, event) => {
    if (type === 'ok') {
    //确认
    this.props.form.validateFields((err, values) => {
      if (!err) {
        //如果是编辑的话
        if (currentEntry) {
          values.id = currentEntry.id;
        }
        this.props.dispatch({
          type: 'classic/saveCategories',
          payload: values,
          callback: () => {
            this.setState({
              status: 'normal',
            });
            this.loadCategories()
          },
        });          
      }
    });
    } else {
      //取消
      this.setState({
        status: 'normal',
      });
    }
  }

  render() {
    const { classic: { categories }, loading } = this.props;
    const { selectedRowKeys,status,page,entry,index } = this.state;
    const { getFieldDecorator } = this.props.form; 
  
    //table的数据加key
    let newList = [];
    let list = categories.list;
    if(list) {
      list.forEach(function (value,i) {
        list[i].key=i+1
      });
      newList = list;
    }
    // const statuss = [
    //   {
    //     title:'微信',
    //     id:'wechat'
    //   },
    //   {
    //     title:'微博',
    //     id:'weibo'
    //   },
    //   {
    //     title:'QQ',
    //     id:'qq'
    //   }
    // ]
   
    //table 的columns
    const columns = [
      {
        title: '名称',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
        width: 700,
      },
      {
        title: '分类',
        dataIndex: 'parentTitle',
        key: 'parentTitle',
      },
      {
        title: '状态',
        dataIndex: 'statusTitle',
        key: 'statusTitle',
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record, index) => {
          return categories.list.length > 0 ? (
            <span>
              <a onClick={e => this.handleModal('modify', text, e)}>编辑</a>
              <Divider type="vertical" />
              <Popconfirm title="确认删除当前这一条吗?" onConfirm={() => this.onDelete(record)}>
              <a href="javascript:;">删除</a>
              </Popconfirm>
            </span>
          ) : null;
        },
      },
    ];
    
    //列表选择
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    
    const hasSelected = selectedRowKeys.length > 0;
    const message = `已经选择 ${selectedRowKeys.length} 项`;
    const pagination = {
      total: categories.total,
      position: 'bottom',
      showQuickJumper: true,
      showSizeChanger: true,
      showTotal: (total, range) => {
        return `第 ${range[0]} - ${range[1]} 条，共 ${total} 条`;
      },
    };

    let that=this;
    //页码以及每页展示几条改变
    function pageChange(pages){
      let data = Object.assign(page, { pindex: pages.current,psize:pages.pageSize });
      that.setState({
        page: data,
      });
      that.loadCategories();
    }

    return (
      <PageHeaderWrapper title="经典列表">
        <div style={{ background: '#fff', padding: '30px' }}>
          <div style={{ marginBottom: 16 }}>
            <Button
              type="primary"
              style={{ margin: '0 10px 0 0' }}
              onClick={e => this.handleModal('create', {}, e)}
            >
              <Icon type="plus" />新建
            </Button>
            {hasSelected ? <Button onClick={this.delAll}>批量删除</Button> : ''}
          </div>
           
          {hasSelected ? (
            <div style={{ color: '#1890ff', position: 'relative' }}>
              <Alert message={message} type="info" showIcon />
              <Button type="danger" size='small' style={{ position: 'absolute', top: '8px', left: '10%'}} onClick={this.delChoose}>
                取消
              </Button>
            </div> ) : (
              ''
          )}
          <Table
            columns={columns}
            dataSource={newList}
            style={{ background: '#fff' }}
            rowSelection={rowSelection}
            pagination={pagination}
            onChange={pageChange}
            loading={loading}    
          />
        </div>

        <Modal
          title={ status === 'create'? '新增经典': status === 'modify' ? '编辑经典' : '' }
          visible={ status !== 'normal' }
          onOk={e => this.handleCloseModal('ok', e)}
          onCancel={e => this.handleCloseModal('cancel', e)}
          width='800px'
        >
          <Form className="login-form">
            <FormItem label="经典名称">
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: '请输入经典名称!',
                  },
                  { max:30,message: '最多可输入三十个字'}
                ],
              })(<Input type="text" placeholder="请输入经典名称"/>)}
            </FormItem>
            
            <FormItem label="分类">
              {getFieldDecorator('parentTitle', {
                rules: [
                  {
                    required: true,
                    message: '请输入经典类型!',
                  },
                  { max:30,message: '最多可输入三十个字'}
                ],
              })(<Input type="text" placeholder="请输入经典类型" />)}
            </FormItem>          
          </Form>
        </Modal>

      </PageHeaderWrapper>
    );
  }
}