
import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Tag, Input, Tooltip, Icon, Button, Popover } from 'igroot'

export default class MarkSearch extends React.PureComponent {

  state = {
    tags: Object.keys(JSON.parse(window.localStorage.getItem(this.props.tagGroupKey) || null) || {}),
    inputVisible: false,
    inputValue: '',
  }

  handleClose = (removedTag) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag)
    console.log(tags)
    this.setState({ tags })
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus())
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value })
  }

  handleInputConfirm = () => {
    const state = this.state
    const inputValue = state.inputValue
    let tags = state.tags
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue]
      this.storeSearch(inputValue)
    }

    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    })
  }

  // 将一组过滤表单存储在 localStorage 中
  storeSearch = (tagName) => {
    const { searchForm, tagGroupKey } = this.props
    let newStore = {}

    const initialStore = JSON.parse(window.localStorage.getItem(tagGroupKey))// 获取原来存储在 localStorage 中的过滤条件
    if (initialStore) {
      newStore = initialStore
      newStore[tagName] = searchForm
    } else {
      newStore[tagName] = searchForm
    }

    window.localStorage.setItem(tagGroupKey, JSON.stringify(newStore))
  }

  // 点击tag
  clickTag = (e, tag) => {
    e.stopPropagation()
    if ('DIV' === e.target.nodeName) {
      const { tagGroupKey } = this.props
      const storeSearch = JSON.parse(window.localStorage.getItem(tagGroupKey))// 获取原来存储在 localStorage 中的过滤条件
      Object.keys(storeSearch).forEach(key => {
        if (key === tag) {
          this.props.onTagSelect(storeSearch[key])
        }
      })

    }
  }

  saveInputRef = input => this.input = input

  render() {
    const { tags, inputVisible, inputValue } = this.state
    const { titleType, icon, btnText, className, style } = this.props
    let handleButton
    if (titleType === 'button') {
      handleButton = <Button icon={icon} className={className} style={{ marginRight: 6, ...style }} >{btnText}</Button>
    } else {
      handleButton = <Icon type={icon} className={className} style={{ marginRight: 6, ...style }} />
    }

    const content = (
      <div style={{ minHeight: 200, maxWidth: 500 }}>
        {tags.map((tag, index) => {
          const isLongTag = tag.length > 20
          const tagElem = (
            <Tag key={tag} onClick={(e) => this.clickTag(e, tag)} closable afterClose={() => this.handleClose(tag)}>
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </Tag>
          )
          return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem
        })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag
            onClick={this.showInput}
            style={{ background: '#fff', borderStyle: 'dashed' }}
          >
            <Icon type="plus" /> New Tag
          </Tag>
        )}
      </div>
    )
    return (
      <Popover content={content} trigger="click" placement="bottomRight">
        {
          handleButton
        }
      </Popover>
    )
  }
}

MarkSearch.propTypes = {
  tagGroupKey: PropTypes.string.isRequired,         // 某个页面的搜索条件的key
  searchForm: PropTypes.object.isRequired,          // 要传给本组件保存的一组搜索条件
  onTagSelect: PropTypes.func.isRequired,           // 当某个tag被点击时
  titleType: PropTypes.string,                      // 操作的dom元素:icon图标；button按钮
  icon: PropTypes.string,                           // 当传入的titleType为icon时，此属性表示图标的类型；当传入的titleType为button时，此属性表示按钮上附件展示的图标的类型
  btnText: PropTypes.string,                        // 按钮的文字
  className: PropTypes.string,                      // 组件的类名
  style: PropTypes.object,                          // 组件的样式
}

MarkSearch.defaultProps = {
  titleType: 'button',
  icon: "tag",
  btnText: "记录搜索条件",
}
