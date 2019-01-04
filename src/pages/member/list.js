import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Divider, Icon, Pagination, Alert, Button, Input, Modal, Form } from 'antd';
import { message, Popconfirm, Radio, Cascader, Select  } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import StandardFormRow from '@/components/StandardFormRow';
const Search = Input.Search;
const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;

let currentEntry;

@connect(({ member,loading }) => ({
  member,
  loading: loading.models.member,
}))

@Form.create()

export default class list extends Component {
  loadMembers() {
    this.props.dispatch({
      type: 'member/loadMembers',
      payload: this.state.page,
    });
  }

  componentDidMount() {
    this.loadMembers();
  }
  constructor(props) {
    super(props);
    this.state = {
      status: 'normal', //控制的状态
      entry:{},
      page:{
        pindex:1,
        psize:10,
        nickname:'',
        phone:'',
        uid:'',
        search:'',

      },
      selectedRowKeys: [],
      selectedRowValues: [],
    };
  }

  //删除
  onDelete = entry => {
    let arr = [];
    arr[0] = entry;    
    this.props.dispatch({
      type: 'member/removeMembers',
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
          type: 'member/removeMembers',
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
  //重置查询条件
  reset=()=>{
    let data = Object.assign(this.state.page, {pindex:1,psize:10, nickname:'',phone:''})
    this.setState({
      page:data
    });
  }

  //筛选
  filtersChange = (type,index,e) =>{
    if(type==='nickname'){
      let data = Object.assign(this.state.page, { nickname: e.target.value,pindex:1 });
      this.setState({
        page: data,
      });
      this.loadMembers();
    }else if(type==='phone'){
      let data = Object.assign(this.state.page, { phone: e.target.value,pindex:1 });
      this.setState({
        page: data,
      });
    }
  }
  //筛选按钮
  filterSearch = ()=>{
    this.loadMembers()
  }
    //筛选的基地
//   nicknameChange = (value) =>{
//     let data = Object.assign(this.state.page, { nickname: value,pindex:1 });
//     this.setState({
//       page: data
//     });
//    this.loadMembers()
//  }
  //搜索
  onSearch = value =>{
    let data = Object.assign(this.state.page, { pindex:1,search: value });
    this.setState({
      page: data
    });
    this.loadMembers()
  } 

  //弹框
  handleModal=(type, entry, event)=> {
    this.setState({
      status: type,
      entry: entry,
    });
    currentEntry = entry;
    console.log(currentEntry)
    if(JSON.stringify(currentEntry)!='{}'){
      this.props.form.setFieldsValue({
        nickname:currentEntry.nickname,
        phone: currentEntry.phone ,
        uid: currentEntry.uid ,
      })
    }else{
      this.props.form.setFieldsValue({
        nickname:'',
        phone: '',
        uid:''
      })
    }
  }
  //弹框上面的按钮
  handleCloseModal = (type, event) => {
    if (type === 'ok') {
    //确认
    this.props.form.validateFields((err, values) => {
      if (!err) {
        //如果是编辑的话
        if (currentEntry) {
          values.uid = currentEntry.uid;
          values.nickname = currentEntry.nickname;
          values.phone = currentEntry.phone;
        }
        this.props.dispatch({
          type: 'member/saveMembers',
          payload: values,
          callback: () => {
            this.setState({
              status: 'normal',
            });
            this.loadMembers()
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
  // roleChange = ( item,e )=>{
  //   this.setState({
  //     role: item.scope
  //   })
  // }

  render() {
    const { member: { members }, loading } = this.props;
    const { selectedRowKeys,status,page,entry } = this.state;
    const { getFieldDecorator } = this.props.form; 
    
    //table的数据加key
    let newList = [];
    let list = members;
    if(list) {
      list.forEach(function (value,i) {
        list[i].key=i+1;
        if(list[i].type==='wechat'){
          list[i].type='微信'
        }else if(list[i].type==='qq'){
          list[i].type='QQ'
        }else if(list[i].type==='weibo'){
          list[i].type='微博'
        }
      });
      newList = list;
    }
   
    // let baseAll=[];
    // if(JSON.stringify(bases)!='{}'){
    //   let a=Array.isArray(bases.bases)
    //   if(a){
    //     baseAll=bases.bases
    //   }else{
    //     baseAll[0]=bases.bases
    //   }
    // }

    // let university_all=[];
    // if(JSON.stringify(universitys)!='{}'){
    //   university_all=universitys.bases[index].universities
    // }

    //table 的columns
    const columns = [
      {
        title: '头像',
        dataIndex: 'avatar',
        key: 'avatar',
        render: (text, record, index) => {
          return members.length > 0 ? (
            <img src={text} style={{width:'50px',height:'40px'}}/>
          ) : null;
        },
        width:200
      },
      {
        title: '会员昵称',
        dataIndex: 'nickname',
        key: 'nickname',
      },
      {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '绑定账号类型',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record, index) => {
          return members.length > 0 ? (
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
      total: members.total,
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
      that.loadMembers();
    }

    return (
      <PageHeaderWrapper title="会员列表">
        <div style={{ background: '#fff', padding: '30px 30px 15px', margin: '0 0 30px' }}>
          <StandardFormRow title="搜索" grid last>
            <Input style={{ width: 300 ,marginRight:'20px'}} placeholder='搜索会员昵称' value={page.nickname} onChange={e => this.filtersChange('nickname', e)}>
            </Input>
          
            <Input style={{ width: 300 ,marginLeft:'20px'}} placeholder='搜索手机号' value={page.phone} onChange={e => this.filtersChange('phone', e)}>
            </Input> 
            <Button type='primary' style={{marginLeft:'50px'}}  onClick={this.filterSearch}>搜索</Button>
            <Button style={{marginLeft:'30px'}} onClick={this.reset}>重置</Button>
          </StandardFormRow>
          <Divider />
        </div>

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
          title={ status === 'create'? '新增会员': status === 'modify' ? '编辑会员' : '' }
          visible={ status !== 'normal' }
          onOk={e => this.handleCloseModal('ok', e)}
          onCancel={e => this.handleCloseModal('cancel', e)}
          width='800px'
        >
          <Form className="login-form">

            <FormItem label="会员昵称">
              {getFieldDecorator('nickname', {
                rules: [
                  {
                    required: true,
                    message: '请输入会员昵称!',
                  },
                  { max:30,message: '最多可输入三十个字'}
                ],
              })(<Input type="text" placeholder="请输入会员昵称"/>)}
            </FormItem>

            <FormItem label="手机号">
              {getFieldDecorator('phone', {
                rules: [
                  {
                    required: true,
                    message: '请输入会员手机号!',
                  },
                  { max:30,message: '最多可输入三十个字'}
                ],
              })(<Input type="text" placeholder="请输入会员手机号" />)}
            </FormItem>          
          </Form>
        </Modal>

      </PageHeaderWrapper>
    );
  }
}