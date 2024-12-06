import { EChartsCoreOption } from "echarts/core";

export const PF_CHART_OPTIONS: EChartsCoreOption = {
    legend: {
        align: 'center'
    },
    tooltip: {
        trigger: 'axis', axisPointer: {type: 'shadow'}
    },
    grid:{
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true 
    },
    dataset: {},
    xAxis: { type: 'category' },
    yAxis: {},
    series: [],
    animationEasing: 'elasticOut',
  };