import './App.css';

import React, { useState } from 'react'
import { Card } from 'antd'
import { PlusOutlined } from '@ant-design/icons';

import PriceSetting from './components/PriceSetting';

const App = () => {
  const [priceList, setPriceList] = useState([{}])

  return (
    <div className="App">
      <Card style={{ width: '80%' }}>
        {priceList.map((detail, index) => {
          return <PriceSetting key={index} detail={detail} index={index} priceList={priceList} setPriceList={setPriceList} />
        })}
        <a
          style={{ display: 'inline-block', marginTop: '10px' }}
          onClick={() => {
            priceList.push({})
            setPriceList([...priceList])
          }}
        >
          <PlusOutlined />
          <span>新增價格設定</span>
        </a>
      </Card>
    </div>
  );
}

export default App;
