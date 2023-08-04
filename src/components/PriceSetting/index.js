import React from 'react'

import { Row, Col, Select, Input, Divider, InputNumber } from 'antd'
import { options } from './consts'
import { formatNumberWithCommas } from './actions'

const PriceSetting = ({ detail, index, priceList, setPriceList }) => {
  // console.log('detail:', detail)
  // console.log('priceList:', priceList)
  const { ageRange = [] , price = '' } = detail

  return (
    <>
      <h3>價格設定 - {index+1}</h3>
      <Row justify='space-between'>
        <Col style={{ marginRight: '10px' }}>
          <div>年齡</div>
          <Select
            style={{ width: '200px' }}
            options={options}
            value={ageRange[0]}
            onChange={value => {
              ageRange[0] = value
              priceList[index].ageRange = ageRange
              setPriceList([...priceList])
            }}
          />
          <span style={{ margin: '0 10px' }}>~</span>
          <Select
            style={{ width: '200px' }}
            options={options}
            value={ageRange[1]}
            onChange={value => {
              ageRange[1] = value
              priceList[index].ageRange = ageRange
              setPriceList([...priceList])
            }}
          />
        </Col>
        <Col>
          <div>入住費用(每人每晚)</div>
          <Input
            style={{ width: '250px' }}
            prefix='TWD'
            value={price}
            onChange={e => {
              const value = e.target.value.split(',').join('')
              const price = formatNumberWithCommas(value)
              priceList[index].price = price
              setPriceList([...priceList])
            }}
          />
        </Col>
      </Row>
      <div
        style={{ textAlign: 'end', color: '#8D8D8D', paddingTop: '10px' }}
      >
        輸入0表示免費
      </div>
      <Divider type='horizontal' style={{ marginTop: '10px' }} />
    </>
  )
}

export default PriceSetting