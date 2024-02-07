import './App.css';

import React, { useState, useEffect } from 'react'
import { findOverlapAndNotInclude } from './PriceSetting/actions'
import { Button, Card } from 'antd'
import { PlusOutlined } from '@ant-design/icons';

import PriceSetting from './PriceSetting';

// test
const App = () => {
  const [priceList, setPriceList] = useState([{
    ageRange: [],
    price: ''
  }])
  const [overlap, setOverlap] = useState([])
  const [notInclude, setNotInclude] = useState([])

  useEffect(() => {
    const ageRangeList = priceList.map(({ ageRange }) => ageRange) || []
    const { overlap, notInclude } = findOverlapAndNotInclude(ageRangeList)
    setOverlap(overlap)
    setNotInclude(notInclude)
  }, [priceList])

  return (
    <div className="App">
      <Card style={{ width: '60%' }}>
        {priceList.map((detail, index) => (
          <PriceSetting
            key={index}
            index={index}
            detail={detail}
            priceList={priceList}
            setPriceList={setPriceList}
            overlap={overlap}
          />
        ))}
        <Button
          disabled={notInclude.length === 0}
          style={{
            display: 'inline-block',
            marginTop: '10px'
          }}
          onClick={() => {
            priceList.push({
              ageRange: [],
              price: ''
            })
            setPriceList([...priceList])
          }}
        >
          <PlusOutlined />
          <span>新增價格設定</span>
        </Button>
      </Card>
    </div>
  );
}

export default App;
