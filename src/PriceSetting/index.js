import React, { useState } from 'react'

import { Row, Col, Select, Input, Divider, Popover, Button } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { formatNumberWithCommas } from './actions'

import './style.css'

const numberRegex = /^-?\d*\.?\d+$/

const PriceSetting = ({ detail, index, priceList, setPriceList, overlap }) => {
  // console.log('detail:', detail)
  const { ageRange, price, isPriceError } = detail
  const [hasAgeSelected, setHasAgeSelected] = useState(false)
  const [openPopover, setOpenPopover] = useState(false)

  return (
    <>
      <Row justify='space-between' align='middle' style={{ marginBottom: '10px' }}>
        <div style={{ fontSize: '16px', fontWeight: '600' }}>價格設定 - {index + 1}</div>
        {index !== 0 && (
          <Popover
            content={
              <Row>
                <Col style={{ marginRight: '5px' }}>
                  <Button
                    onClick={() => {
                      setOpenPopover(false)
                    }}
                  >No</Button>
                </Col>
                <Col>
                  <Button
                    danger
                    type='primary'
                    onClick={() => {
                      priceList.splice(index, 1)
                      setPriceList([...priceList])
                      setOpenPopover(false)
                    }}
                  >Yes</Button>
                </Col>

              </Row>
            }
            title='Are you sure?'
            trigger='click'
            open={openPopover}
            onOpenChange={() => {
              setOpenPopover(true)
            }}
          >
            <span
              className='delete-button'
              // onClick={() => {
              //   priceList.splice(index, 1)
              //   setPriceList([...priceList])
              // }}
            ><CloseOutlined /> 刪除</span>
          </Popover>
        )}
      </Row>
      <Row>
        <Col span={14}>
          <div>年齡</div>
          <Select
            allowClear
            className={hasAgeSelected && (overlap.length > 0 || ageRange[0] === undefined)
              ? 'errorBorder errorBorderRadius'
              : ''
            }
            style={{ width: '45%' }}
            value={ageRange[0]}
            onChange={value => {
              ageRange[0] = value
              priceList[index].ageRange = ageRange
              setHasAgeSelected(ageRange.length > 0)
              setPriceList([...priceList])
            }}
          >
            {Array.from({ length: 21 }, (_, i) => (
                <Select.Option
                  key={i}
                  value={i}
                  disabled={ageRange.includes(i) || (i > ageRange[0] && i < ageRange[1])}
                >{i}</Select.Option>
              )
            )}
          </Select>
          <span style={{ margin: '0 10px' }}>~</span>
          <Select
            allowClear
            className={hasAgeSelected && (overlap.length > 0 || ageRange[1] === undefined)
              ? 'errorBorder errorBorderRadius'
              : ''
            }
            style={{ width: '45%' }}
            value={ageRange[1]}
            onChange={value => {
              ageRange[1] = value
              priceList[index].ageRange = ageRange
              setHasAgeSelected(ageRange.length > 0)
              setPriceList([...priceList])
            }}
          >
            {Array.from({ length: 21 }, (_, i) => (
                <Select.Option
                  key={i}
                  value={i}
                  disabled={ageRange.includes(i) || (i > ageRange[0] && i < ageRange[1])}
                >{i}</Select.Option>
              )
            )}
          </Select>
          {overlap.length > 0 && (<div className='errorMsg'>年齡區間不可重疊</div>)}
          {hasAgeSelected && (ageRange[0] === undefined || ageRange[1] === undefined) && (
            <div className='errorMsg'>年齡區間不可以空白</div>
          )}
        </Col>
        <Col span={10}>
          <div>入住費用(每人每晚)</div>
          <Input
            prefix='TWD'
            className={isPriceError ? 'errorBorder' : ''}
            style={{ border: isPriceError && '1px solid red' }}
            value={price}
            onChange={e => {
              const value = e.target.value.split(',').join('')
              const isNumber = numberRegex.test(Number(value))
              if (isNumber) {
                const price = formatNumberWithCommas(value)
                priceList[index].price = price
                priceList[index].isPriceError = !price
                setPriceList([...priceList])
              } else {
                return
              }
            }}
          />
          {isPriceError && (<div className='errorMsg'>價格不可以為空白</div>)}
        </Col>
      </Row>
      <div className='priceMsg'>輸入0表示免費</div>
      <Divider type='horizontal' style={{ marginTop: '10px' }} />
    </>
  )
}

export default PriceSetting