import React, { Component } from 'react';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Tree, Input } from 'antd';

const { TreeNode } = Tree;
const Search = Input.Search;

// let currentEntry;
let gData = [];

@connect(({ classic, loading }) => ({
  classic,
  loading: loading.models.classic,
}))

export default class frame extends Component {
  constructor(props) {
    super(props);
    this.state = {
			expandedKeys: [],
			searchValue: '',
			autoExpandParent: true,
    };
	}

	componentDidMount() {
    this.loadCategories();
	}

	loadCategories() {
    this.props.dispatch({
      type: 'classic/loadCategories',
      payload: this.state.page,
    });
  }
  
	getParentKey = (key, tree) => {
		let parentKey;
		for (let i = 0; i < tree.length; i++) {
			const node = tree[i];
			if (node.children) {
				if (node.children.some(item => item.key === key)) {
					parentKey = node.key;
				} else if (getParentKey(key, node.children)) {
					parentKey = getParentKey(key, node.children);
				}
			}
		}
		return parentKey;
	};

	// generateData = (_level, _preKey, _tns) => {
	// 	const preKey = _preKey || '0';
	// 	const tns = _tns || gData;
	
	// 	const children = [];
	// 	for (let i = 0; i < gData.length; i++) {
	// 		const key = `${preKey}-${i}`;
	// 		tns.push({ title: key, key });
	// 		if (i < y) {
	// 			children.push(key);
	// 		}
	// 	}
	// 	if (_level < 0) {
	// 		return tns;
	// 	}
	// 	const level = _level - 1;
	// 	children.forEach((key, index) => {
	// 		tns[index].children = [];
	// 		return generateData(level, key, tns[index].children);
	// 	});
	// };

	dataList = [];

	generateList = (data) => {
		for (let i = 0; i < data.length; i++) {
			const node = data[i];
			const key = node.key;
			dataList.push({ key, title: key });
			if (node.children) {
				generateList(node.children, node.key);
			}
		}
	};

	// generateList(gData);

	// load = data => data.map((item) => {
	// 	let {searchValue} = this.state;
	// 	const index = item.title.indexOf(searchValue);
	// 	const beforeStr = item.title.substr(0, index);
	// 	const afterStr = item.title.substr(index + searchValue.length);
	// 	const title = index > -1 ? (
	// 		<span>
	// 			{beforeStr}
	// 			<span style={{color: '#f50'}}>{searchValue}</span>
	// 			{afterStr}
	// 		</span>
	// 	) : <span>{item.title}</span>;
	// 	if (item.children) {
	// 		return (
	// 			<TreeNode key={item.key} title={title} dataRef={item}>
	// 				{this.load(item.children)}
	// 			</TreeNode>
	// 		);
	// 	}
	// 	return <TreeNode dataRef={item} key={item.key} title={title}/>;
	// });
	
	onLoadData = (treeNode) => {
		if (treeNode.props.children) {
			return;
		}
		treeNode.props.dataRef.children = [
			{ title: 'department', key: (++key + '') },
			{ title: 'department', key: (++key + '') },
		];
		this.setState({
			gData: [...this.state.gData],
		});
	};
	
	onSelect = (selectedKeys, info) => {
		/*用于打开该节点的详细信息*/
		console.log('selected', selectedKeys, info);
		console.log(this.state.expandedKeys);
	};

	onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
	}
	
	onChange = (e) => {
    const value = e.target.value;
    const expandedKeys = dataList.map((item) => {
      if (item.title.indexOf(value) > -1) {
        return getParentKey(item.key, gData);
      }
      return null;
    }).filter((item, i, self) => item && self.indexOf(item) === i);
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true,
    });
  }

  render() {
		const { classic: { categories }, loading } = this.props;
		const { searchValue, expandedKeys, autoExpandParent } = this.state;
    gData = categories;
    const loop = data => data.map((item) => {
      const index = item.title.indexOf(searchValue);
      const beforeStr = item.title.substr(0, index);
      const afterStr = item.title.substr(index + searchValue.length);
      const title = index > -1 ? (
        <span>
          {beforeStr}
          <span style={{ color: '#f50' }}>{searchValue}</span>
          {afterStr}
        </span>
      ) : <span>{item.title}</span>;
      if (item.children) {
        return (
          <TreeNode key={item.key} title={title}>
            {loop(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} title={title} />;
		});
		
    return (
			<PageHeaderWrapper title="经典藏部管理">
			  <Search style={{ marginBottom: 8, width:600 }} placeholder="Search" onChange={this.onChange} />
				<Tree
				  draggable
					showLine
					onSelect={this.onSelect}
					loadData={this.onLoadData}
					onExpand={this.onExpand}
					// expandedKeys={expandedKeys}
					autoExpandParent={autoExpandParent}          
				>
					{loop(gData)}
				</Tree>
			</PageHeaderWrapper>
    );
  }
}
