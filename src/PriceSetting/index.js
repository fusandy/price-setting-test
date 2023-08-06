import React, { useState } from 'react'

import { Row, Col, Select, Input, Divider, InputNumber } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { formatNumberWithCommas } from './actions'

const PriceSetting = ({ detail, index, priceList, setPriceList, overlap }) => {
  // console.log('detail:', detail)
  const { ageRange, price, isPriceError } = detail
  const [hasAgeSelected, setHasAgeSelected] = useState(false)

  return (
    <>
      <Row justify='space-between' align='middle' style={{ marginBottom: '10px' }}>
        <div style={{ fontSize: '16px', fontWeight: '600' }}>價格設定 - {index + 1}</div>
        {index !== 0 && (
          <a
            style={{ display: 'inline-block' }}
            onClick={() => {
              priceList.splice(index, 1)
              setPriceList([...priceList])
            }}
          ><CloseOutlined /> 刪除</a>
        )}
      </Row>
      <Row>
        <Col span={14}>
          <div>年齡</div>
          <Select
            allowClear
            style={{
              width: '45%',
              border: hasAgeSelected
                ? (overlap.length > 0 || ageRange[0] === undefined) && '1px solid red'
                : 'unset',
              borderRadius: hasAgeSelected
                ? (overlap.length > 0 || ageRange[0] === undefined) && '6px'
                : 'unset'
            }}
            value={ageRange[0]}
            onChange={value => {
              ageRange[0] = value
              priceList[index].ageRange = ageRange
              setHasAgeSelected(ageRange.length > 0)
              setPriceList([...priceList])
            }}
          >
            {Array.from({ length: 21 }, (_, i) => {
              return (
                <Select.Option
                  key={i}
                  value={i}
                  disabled={ageRange.includes(i) || (i > ageRange[0] && i < ageRange[1])}
                >{i}</Select.Option>
              )
            })}
          </Select>
          <span style={{ margin: '0 10px' }}>~</span>
          <Select
            allowClear
            style={{
              width: '45%',
              border: 
                hasAgeSelected
                ? (overlap.length > 0 || ageRange[1] === undefined) && '1px solid red'
                : 'unset',
              borderRadius: hasAgeSelected
                ? (overlap.length > 0 || ageRange[1] === undefined) && '6px'
                : 'unset'
            }}
            value={ageRange[1]}
            onChange={value => {
              ageRange[1] = value
              priceList[index].ageRange = ageRange
              setHasAgeSelected(ageRange.length > 0)
              setPriceList([...priceList])
            }}
          >
            {Array.from({ length: 21 }, (_, i) => {
              return (
                <Select.Option
                  key={i}
                  value={i}
                  disabled={ageRange.includes(i) || (i > ageRange[0] && i < ageRange[1])}
                >{i}</Select.Option>
              )
            })}
          </Select>
          {overlap.length > 0 && (
            <div style={{
              width: '95%',
              height: '30px',
              color: 'red',
              verticalAlign: 'middle',
              lineHeight: '30px',
              borderRadius: '6px',
              backgroundColor: '#FBE9E8',
              paddingLeft: '10px',
              margin: '5px 0'
            }}>年齡區間不可重疊</div>
          )}
          {hasAgeSelected && (ageRange[0] === undefined || ageRange[1] === undefined) && (
            <div style={{
              width: '95%',
              height: '30px',
              color: 'red',
              verticalAlign: 'middle',
              lineHeight: '30px',
              borderRadius: '6px',
              backgroundColor: '#FBE9E8',
              paddingLeft: '10px',
              margin: '5px 0'
            }}>年齡區間不可以空白</div>
          )}
        </Col>
        <Col span={10}>
          <div>入住費用(每人每晚)</div>
          <Input
            prefix='TWD'
            style={{ border: isPriceError && '1px solid red' }}
            value={price}
            onChange={e => {
              const value = e.target.value.split(',').join('')
              const price = formatNumberWithCommas(value)
              priceList[index].price = price
              priceList[index].isPriceError = !price
              setPriceList([...priceList])
            }}
          />
          {isPriceError && (
            <div style={{
              width: '98%',
              height: '30px',
              color: 'red',
              verticalAlign: 'middle',
              lineHeight: '30px',
              borderRadius: '6px',
              backgroundColor: '#FBE9E8',
              paddingLeft: '10px',
              margin: '5px 0'
            }}>價格不可以為空白</div>
          )}
        </Col>
      </Row>
      <div style={{
        textAlign: 'end',
        color: '#8D8D8D',
        paddingTop: '10px'
      }}>輸入0表示免費</div>
      <Divider type='horizontal' style={{ marginTop: '10px' }} />
    </>
  )
}

export default PriceSetting