# MarkSearch 组件
> iGroot 中记录搜索条件的组件

# 开放属性
> 先凑活着看，暂时没时间补充文档😭
```jsx
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
```
