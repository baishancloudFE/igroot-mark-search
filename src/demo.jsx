import React from 'react'
import MarkSearch from './MarkSearch'

export default () => <MarkSearch
  onTagSelect={(form) => { console.log(form) }}
  searchForm={{ app: '1' }}
  tagGroupKey="cluster-search"
/>
