
import { Collapse ,Tree } from 'antd';
import React, { Component } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const Panel = Collapse.Panel;
const { TreeNode } = Tree;

export default class instruction extends Component {
	render() {   
		return (
			<PageHeaderWrapper title="权限说明">
				<div style={{ background: '#fff', padding: '30px' }}>
					<Collapse onChange={this.callback}>
						<Panel header="root（ 超级管理员 ）" key="1">
              {/* <Tree showLine>
                <TreeNode title="课程管理" key="0-0">
                  <TreeNode title="课程管理" key="0-0-0">
                    <TreeNode title="新增和编辑课程" key="0-0-0-0" />
                    <TreeNode title="课程列表" key="0-0-0-0" />
                    <TreeNode title="章节列表" key="0-0-0-1" />
                    <TreeNode title="视频列表" key="0-0-0-2" />
                  </TreeNode>
                  <TreeNode title="基础资料" key="0-0-1">
                    <TreeNode title="行业" key="0-0-1-0" />
                    <TreeNode title="工种" key="0-0-1-1" />
                  </TreeNode>
                </TreeNode>
                <TreeNode title="学习记录" key="0-1">
                  <TreeNode title="学习记录管理" key="0-1-0">
                    <TreeNode title="问答管理" key="0-1-0-0" />
                    <TreeNode title="学员记录" key="0-1-0-1" />
                    <TreeNode title="评论管理" key="0-1-0-2" />
                  </TreeNode>
                </TreeNode>
                <TreeNode title="文章资讯" key="0-2">
                  <TreeNode title="资讯列表" key="0-2-0">
                    <TreeNode title="新增文章" key="0-2-0-0" />
                    <TreeNode title="文章列表" key="0-2-0-1" />
                  </TreeNode>
                </TreeNode>
                <TreeNode title="学员管理" key="0-3">
                  <TreeNode title="学员管理" key="0-3-0">
                    <TreeNode title="学员列表" key="0-3-0-0" />
                    <TreeNode title="学员笔记" key="0-3-0-1" />
                    <TreeNode title="查看访问日志" key="0-3-0-2" />
                  </TreeNode>
                  <TreeNode title="员工资料" key="0-3-1">
                    <TreeNode title="员工资料" key="0-3-1-0" />
                    <TreeNode title="导入资料" key="0-3-1-1" />
                  </TreeNode>
                </TreeNode>
                <TreeNode title="用户及权限" key="0-4">
                  <TreeNode title="用户及权限" key="0-4-0">
                    <TreeNode title="角色及权限" key="0-4-0-0" />
                    <TreeNode title="用户列表" key="0-4-0-1" />
                    <TreeNode title="权限说明" key="0-4-0-2" />
                    <TreeNode title="访问日志" key="0-4-0-3" />
                  </TreeNode>
                </TreeNode>
                <TreeNode title="系统管理" key="0-5">
                  <TreeNode title="网站配置" key="0-5-0">
                    <TreeNode title="基础信息" key="0-5-0-0" />
                    <TreeNode title="友情链接" key="0-5-0-1" />
                    <TreeNode title="敏感词管理" key="0-5-0-2" />
                    <TreeNode title="网站开关配置" key="0-5-0-3" />
                    <TreeNode title="广告图管理" key="0-5-0-4" />
                    <TreeNode title="阿里云配置" key="0-5-0-5" />
                  </TreeNode>
                  <TreeNode title="公告" key="0-5-1">
                    <TreeNode title="新增公告" key="0-5-1-0" />
                    <TreeNode title="公告列表" key="0-5-1-1" />
                  </TreeNode>
                </TreeNode>
                <TreeNode title="帮助中心" key="0-6">
                  <TreeNode title="意见反馈" key="0-6-0">
                    <TreeNode title="意见列表" key="0-6-0-1" />
                  </TreeNode>
                  <TreeNode title="操作手册" key="0-6-1">
                    <TreeNode title="操作手册" key="0-6-1-0" />
                  </TreeNode>
                </TreeNode>
                <TreeNode title="统计汇总" key="0-7">
                  <TreeNode title="汇总" key="0-7-0"/>
                  <TreeNode title="登录统计" key="0-7-1"/>
                  <TreeNode title="学员数统计" key="0-7-2"/>
                  <TreeNode title="注册统计" key="0-7-3"/>
                  <TreeNode title="课程数统计" key="0-7-4"/>
                  <TreeNode title="视频播放量统计" key="0-7-5"/>
                </TreeNode>
              </Tree> */}
						</Panel>
						<Panel header="video（ 视频管理员 ）" key="2">
              {/* <Tree showLine>
                <TreeNode title="课程管理" key="0-8">
                  <TreeNode title="课程管理" key="0-8-0">
                    <TreeNode title="课程列表" key="0-8-0-0" />
                    <TreeNode title="章节列表" key="0-8-0-1" />
                    <TreeNode title="视频列表" key="0-8-0-2" />
                  </TreeNode>
                </TreeNode>
                <TreeNode title="学习记录" key="0-9">
                  <TreeNode title="学习记录管理" key="0-9-0">
                    <TreeNode title="问答管理" key="0-9-0-1" />
                  </TreeNode>
                </TreeNode>
              </Tree> */}
						</Panel>
						<Panel header="classic（ 经典管理员 ）" key="3" >
              {/* <Tree showLine>
                <TreeNode title="课程管理" key="1-0">
                  <TreeNode title="课程管理" key="1-0-0">
                    <TreeNode title="课程列表" key="1-0-0-0" />
                    <TreeNode title="章节列表" key="1-0-0-1" />
                    <TreeNode title="视频列表" key="1-0-0-2" />
                  </TreeNode>
                </TreeNode>
                <TreeNode title="学习记录" key="1-1">
                  <TreeNode title="学习记录管理" key="1-1-0">
                    <TreeNode title="问答管理" key="1-1-0-0" />
                  </TreeNode>
                </TreeNode>
                <TreeNode title="文章资讯" key="1-2">
                  <TreeNode title="资讯列表" key="1-2-0">
                    <TreeNode title="新增文章" key="1-2-0-0" />
                    <TreeNode title="文章列表" key="1-2-0-1" />
                  </TreeNode>
                </TreeNode>
              </Tree> */}
						</Panel>
					</Collapse>,
				</div>
			</PageHeaderWrapper> 
		);
	}
}
