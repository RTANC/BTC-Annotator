import { Container, Grid, Slide, Card, CardContent, Typography, CardActions, Stack, Button, Divider, Box } from '@mui/material'
import React, { useState } from 'react'

// import { useSelector } from 'react-redux'
import { getImageURL, handleGoodCategoryCheck, removeSQLTz, SQLDateTimeFormatter } from '../services/utils'
import { getPrices } from '../services/prices'
import BtnSearch from '../components/BtnSearch'
import BtnSave from '../components/BtnSave'
import BtnClear from '../components/BtnClear'
import DltDateTimePicker from '../components/DltDateTimePicker'
import Swal from 'sweetalert2'
import { useEffect } from 'react'
import moment from 'moment'
import SelectLabel from '../components/SelectLabel'
import Chart from 'react-apexcharts'

export default function Home() {

  const [labels, setLabels] = useState({
    label1: '',
    label2: '',
    label3: ''
  })

  const [query, setQuery] = useState({
    startDate: moment().startOf('day'),
    endDate: moment().endOf('day')
  })

  const [series, setSeries] = useState([{
    data: [{
      id: 0,
      x: new Date(1538778600000),
      y: [6629.81, 6650.5, 6623.04, 6633.33]
    },
    {
      id: 1,
      x: new Date(1538780400000),
      y: [6632.01, 6643.59, 6620, 6630.11]
    },
    {
      id: 2,
      x: new Date(1538782200000),
      y: [6630.71, 6648.95, 6623.34, 6635.65]
    }]
  }])


  const options = {
    chart: {
      type: 'candlestick',
      height: 350,
      events: {
        dataPointSelection: (event, chartContext, config) => { 
          // console.log(event)
          // console.log(chartContext)
          console.log(series[0].data[config.dataPointIndex])
        }
      }
    },
    title: {
      text: 'CandleStick Chart',
      align: 'left'
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    }
  }

  const handleLabelsChange = (e) => {
    labels[e.target.name] = e.target.value
    setLabels({...labels})
  }

  const search = async () => {
    try {
      // const prices = (await getPrices('1900-01-20T01:00:00','1900-01-20T23:59:00','15m')).data
      // console.log(prices)
      setSeries([{
        data: [{
            id: 0,
            x: new Date(1538778600000),
            y: [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]
          },
          {
            id: 1,
            x: new Date(1538780400000),
            y: [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]
          },
          {
            id: 2,
            x: new Date(1538782200000),
            y: [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]
          }
        ]
      }])
    } catch (error) {
      console.log(error)
    }
  }

  const save = async () => {
    try {
      Swal.fire({
        icon: 'success',
        title: 'สำเร็จ',
        text: 'บันทึก Labels สำเร็จ',
      })
    } catch (error) {
      console.log(error)
    }
  }

  const clear = async () => {
    try {
      setLabels({
        label1: '',
        label2: '',
        label3: ''
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    console.log(__APP_VERSION__)
    
  }, [])
  
  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
    <Container>
      <Grid container direction='row' wrap='wrap'>
        <Grid item xs={12}>
          <Card sx={{ minWidth: 275, minHeight: 500, mt: 5 }}>
            <CardContent>
              <Grid container direction='row' wrap='wrap' spacing={2}>
                <Grid item xs={6} md={5}>
                  <Box sx={{height: 100, width: '95%', display: 'flex', justifyContent: 'center', px: 1}}>
                    <DltDateTimePicker value={query.startDate} name='startDate' label='ช่วงเวลาเริ่มต้น' onChange={e => {query.startDate = e; setQuery({...query})}} maxDateTime={new Date(query.endDate)}></DltDateTimePicker>
                  </Box>
                </Grid>
                <Grid item xs={6} md={5}>
                  <Box sx={{height: 100, width: '95%', display: 'flex', justifyContent: 'center', px: 1}}>
                    <DltDateTimePicker value={query.endDate} name='endDate' label='ช่วงเวลาสิ้นสุด' onChange={e => {query.endDate = e; setQuery({...query})}} minDateTime={new Date(query.startDate)}></DltDateTimePicker>
                  </Box>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Box sx={{height: 100, display: 'flex', alignItems: 'center'}}>
                    <BtnSearch onClick={search}></BtnSearch>
                  </Box>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Box sx={{ width: '100%', minHeight: 350,  backgroundColor: 'white', borderRadius: 2}}>
                    <Chart options={options} series={series} type="candlestick" height={350}></Chart>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Stack spacing={2}>
                    <SelectLabel value={labels.label1} label='Label 1' name='label1' onChange={handleLabelsChange}></SelectLabel>
                    <SelectLabel value={labels.label2} label='Label 2' name='label2' onChange={handleLabelsChange}></SelectLabel>
                    <SelectLabel value={labels.label3} label='Label 3' name='label3' onChange={handleLabelsChange}></SelectLabel>
                    <Stack spacing={2} direction='row-reverse'>
                      <BtnSave onClick={save}></BtnSave>
                      <BtnClear onClick={clear}></BtnClear>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
    </Slide>
  )
}
