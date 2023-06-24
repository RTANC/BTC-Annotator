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
import { label } from '../services/labels'

export default function Home() {
  const [loading, setLoading] = useState(false)

  const [labels, setLabels] = useState({
    id: 0,
    label1: '',
    label2: '',
    label3: ''
  })

  const [query, setQuery] = useState({
    startDate: moment().startOf('day'),
    endDate: moment().endOf('day')
  })

  const [series, setSeries] = useState([{
    data: []
  }])

  const options = {
    chart: {
      type: 'candlestick',
      height: 450,
      events: {
        dataPointSelection: (event, chartContext, config) => { 
          // console.log(config)
          console.log(config.w.config.series[0].data[config.dataPointIndex])
          // console.log(series[0].data[config.dataPointIndex])
          const { id, x, y } = config.w.config.series[0].data[config.dataPointIndex]
          labels.id = id
          setLabels({...labels})
        }
      }
    },
    title: {
      text: 'BTC/USD Price Chart',
      align: 'left'
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    },
    noData: {
      text: 'no data'
    },
    plotOptions: {
      candlestick: {
        wick: {
          useFillColor: true,
        }
      }
    }
  }

  const handleLabelsChange = (e) => {
    labels[e.target.name] = e.target.value
    setLabels({...labels})
  }

  const search = async () => {
    try {
      setLoading(true)
      const prices = (await getPrices(SQLDateTimeFormatter(query.startDate),SQLDateTimeFormatter(query.endDate),'15m')).data
      // const prices = (await getPrices('1900-01-20T01:00:00','1900-01-20T23:59:00','15m')).data
      // console.log(prices)
      const dat = []
      for (let i = 0;i < prices.length;i++) {
        const {t_id, t_date, t_open, t_high, t_low, t_close} = prices[i]
        dat.push({
          id: t_id,
          x: new Date(t_date),
          y: [t_open, t_high, t_low, t_close] // [{ x: date, y: [O,H,L,C] }]
        })
      }
      setSeries([{
        data: dat
      }])
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const clear = async () => {
    try {
      setLabels({
        id: 0,
        label1: '',
        label2: '',
        label3: ''
      })
    } catch (error) {
      console.log(error)
    }
  }

  const save = async () => {
    try {
      await label(labels.id, labels, '15m')
      clear()
      Swal.fire({
        icon: 'success',
        title: 'สำเร็จ',
        text: 'บันทึก Labels สำเร็จ',
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
                    <BtnSearch onClick={search} loading={loading}></BtnSearch>
                  </Box>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Box sx={{ width: '100%', minHeight: 450,  backgroundColor: 'white', borderRadius: 2}}>
                    <Chart options={options} series={series} type="candlestick"></Chart>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Stack spacing={2}>
                    <Stack spacing={2} direction='row'>
                      <Typography variant="h5" color="white">Selected ID : {labels.id}</Typography>
                    </Stack>
                    <SelectLabel value={labels.label1} label='Label 1' name='label1' onChange={handleLabelsChange} disabled={(labels.id === 0)}></SelectLabel>
                    <SelectLabel value={labels.label2} label='Label 2' name='label2' onChange={handleLabelsChange} disabled={(labels.id === 0)}></SelectLabel>
                    <SelectLabel value={labels.label3} label='Label 3' name='label3' onChange={handleLabelsChange} disabled={(labels.id === 0)}></SelectLabel>
                    <Stack spacing={2} direction='row-reverse'>
                      <BtnSave onClick={save} disabled={(labels.id === 0)}></BtnSave>
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
