<template>
  <div class="selector-div">
    <div class="daily-monthly-div">
      <button class="daily-monthly-button" @click="changeChartMonthly(false)">Daily</button>
      <button class="daily-monthly-button" @click="changeChartMonthly(true)">Monthly</button>
    </div>

    <div class="select-time-div">
      <input v-model="dateFrom" type="date" @input="updateTimeFrame()"/>
      <input v-model="dateTo" type="date" @input="updateTimeFrame()"/>
    </div>
  </div>
  <div class="chartDiv" ref="chartdiv">
    <h1 v-if="chartError">Daten konnten nicht geladen werden, bitte versuchen sie es später erneuet</h1>
  </div>
</template>


<script lang="ts" setup>
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

import {Event} from '~/classes/Event';
import {getBookings, getPageViews} from '@/requests/analytics';
import {getSoldTickets} from '~/requests/analytics';
import {GraphData} from '~/classes/AnalyticsGraphData';

const chartError = ref(false) as Ref<boolean>;
const chartdiv = ref() as Ref<HTMLDivElement>;
const monthlytimeframe = ref(false) as Ref<boolean>;
let root = null;

// Create Dates
let date = new Date();
date.setDate(date.getDate() - 7);
const dateFrom = ref(date.toISOString().substring(0, 10)) as Ref<string>;
const dateTo = ref(new Date().toISOString().substring(0, 10)) as Ref<string>;


// GraphData
let incomingDataFormatViews: GraphData[] = [];
let incomingDataFormatOrders: GraphData[] = [];
let incomingDataFormatTickets: GraphData[] = [];

function updateTimeFrame() {
  getChartData();
}

const props = defineProps<{
  event: Event
}>()


// Define ChartJson format:
var data = [{}]


onMounted(() => {
  setButtonSelected();
  getChartData();
});


function setButtonSelected() {
  if (monthlytimeframe.value == true) {
    document.getElementsByClassName("daily-monthly-button")[0].classList.remove("selected");
    document.getElementsByClassName("daily-monthly-button")[1].classList.add("selected");
  } else {
    document.getElementsByClassName("daily-monthly-button")[1].classList.remove("selected");
    document.getElementsByClassName("daily-monthly-button")[0].classList.add("selected");
  }
}

function changeChartMonthly(value: boolean) {
  monthlytimeframe.value = value;
  setButtonSelected();
  createChartJson();
  if (chart == null) {
    createChart();
  } else {
    updateData();
  }
}

async function getChartData() {
  let onError = () => {
  }

  // PageViews
  let pageViewsPromise = new Promise<void>((resolve, reject) => {
    if (props.event.id == null) {
      return;
    }
    getPageViews(props.event.id, dateFrom.value, dateTo.value, (data: GraphData[]) => {
      incomingDataFormatViews = data;
      resolve();
    }, () => {
      onError();
      reject();
    });
  });

  // Orders
  let ordersPromise = new Promise<void>((resolve, reject) => {
    if (props.event.id == null) {
      return;
    }
    getBookings(props.event.id, dateFrom.value, dateTo.value, (data: GraphData[]) => {

      incomingDataFormatOrders = data;
      resolve();
    }, () => {
      onError();
      reject();
    });
  });

  // Tickets
  let ticketsPromise = new Promise<void>((resolve, reject) => {
    if (props.event.id == null) {
      return;
    }
    getSoldTickets(props.event.id, dateFrom.value, dateTo.value, (data: GraphData[]) => {
      incomingDataFormatTickets = data;
      resolve();
    }, () => {
      onError();
      reject();
    });
  });

  try {
    await Promise.all([pageViewsPromise, ordersPromise, ticketsPromise]);
    chartError.value = false;
    createChartJson();
    if (chart == null) {
      createChart();
    } else {
      updateData();
    }
  } catch (error) {
    chartError.value = true;
  }
}

function createChartJson() {
  data = [];
  if (monthlytimeframe.value == true) {
    let currentMonth = 0;
    // Aggregate daily data to monthly data
    let views = 0;
    let orders = 0;
    let tickets = 0;
    let date = new Date(incomingDataFormatViews[0].occurringDate);
    let i = 0;
    while (i < incomingDataFormatViews.length) {
      currentMonth = date.getMonth();
      while (date.getMonth() == currentMonth) {
        date = new Date(incomingDataFormatViews[i].occurringDate);
        if (date.getMonth() != currentMonth) {
          data.push({
            "date": getMonthByNumber(currentMonth),
            "views": views,
            "orders": orders,
            "tickets": tickets
          })
          views = 0;
          orders = 0;
          tickets = 0;
        }
        views += incomingDataFormatViews[i].value;
        orders += incomingDataFormatOrders[i].value;
        tickets += incomingDataFormatTickets[i].value;
        if (i >= incomingDataFormatViews.length - 1) {
          data.push({
            "date": getMonthByNumber(date.getMonth()),
            "views": views,
            "orders": orders,
            "tickets": tickets
          })
          return;
        }
        i++;
      }
    }
  } else {

    for (let i = 0; i < incomingDataFormatViews.length; i++) {
      let dateformat = new Date(incomingDataFormatViews[i].occurringDate).toLocaleDateString();
      data.push({
            "date": dateformat.slice(0, dateformat.lastIndexOf("/")),
            "views": incomingDataFormatViews[i].value,
            "orders": incomingDataFormatOrders[i].value,
            "tickets": incomingDataFormatTickets[i].value
          }
      )
    }
  }

}

function getMonthByNumber(month: number) {
  switch (month) {
    case 0:
      return "Januar";
    case 1:
      return "Februar";
    case 2:
      return "März";
    case 3:
      return "April";
    case 4:
      return "Mai";
    case 5:
      return "Juni";
    case 6:
      return "Juli";
    case 7:
      return "August";
    case 8:
      return "September";
    case 9:
      return "Oktober";
    case 10:
      return "November";
    case 11:
      return "Dezember";
  }
  return "Error";
}

let chart = null as am5xy.XYChart | null;
let series0 = null as am5xy.ColumnSeries | null;
let series1 = null as am5xy.ColumnSeries | null;
let series2 = null as am5xy.ColumnSeries | null;
let xAxis = null as am5xy.CategoryAxis<am5xy.AxisRenderer> | null;

function createChart() {
  root = am5.Root.new(chartdiv.value, {
    useSafeResolution: false
  });

  root.setThemes([am5themes_Animated.new(root)]);

  chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panY: false,
        layout: root.verticalLayout,
        panX: false,

        wheelX: "none",
        wheelY: "none",
        pinchZoomX: false,
        paddingLeft: 0,
      })
  );
  let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        renderer: am5xy.AxisRendererY.new(root, {
          strokeOpacity: 0.1
        })
      })
  );

  let xRenderer = am5xy.AxisRendererX.new(root, {
    minGridDistance: 70,
    minorGridEnabled: true
  });

  // Create X-axis
  xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
    categoryField: "date",
    renderer: xRenderer,
    tooltip: am5.Tooltip.new(root, {
      themeTags: ["axis"],
      animationDuration: 200
    })
  }));

  xRenderer.grid.template.setAll({
    location: 1
  })
  if (monthlytimeframe.value == false) {
    xRenderer.labels.template.setAll({

      fontSize: 15,
    })
  }


  xAxis.data.setAll(data);

  // Create series
  series0 = chart.series.push(am5xy.ColumnSeries.new(root, {
    name: "Seitenaufrufe",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "views",
    categoryXField: "date",
    clustered: false,
    tooltip: am5.Tooltip.new(root, {
      labelText: "Seitenaufrufe: {valueY}"
    })
  }));

  series0.columns.template.setAll({
    width: am5.percent(80),
    tooltipY: 25,
    strokeOpacity: 0
  });


  series0.data.setAll(data);


  series1 = chart.series.push(am5xy.ColumnSeries.new(root, {
    name: "Bestellungen",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "orders",
    categoryXField: "date",
    clustered: false,
    tooltip: am5.Tooltip.new(root, {
      labelText: "Bestellungen: {valueY}"
    })
  }));

  series1.columns.template.setAll({
    width: am5.percent(50),
    tooltipY: 20,
    strokeOpacity: 0
  });

  series1.data.setAll(data);

  series2 = chart.series.push(am5xy.ColumnSeries.new(root, {
    name: "Tickets",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "tickets",
    categoryXField: "date",
    clustered: false,
    tooltip: am5.Tooltip.new(root, {
      labelText: "Tickets: {valueY}"
    })
  }));

  series2.columns.template.setAll({
    width: am5.percent(15),
    tooltipY: 0,
    strokeOpacity: 0
  });

  series2.data.setAll(data);

  // Add legend
  let legend = chart.children.push(am5.Legend.new(root, {}));
  legend.data.setAll(chart.series.values);

  // Add cursor
  //chart.set("cursor", am5xy.XYCursor.new(root, {}));
  let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
  chart.appear(1000, 100);
  series0.appear();
  series1.appear();
  series2.appear();
}

function updateData() {
  xAxis?.data.setAll(data);
  series0?.data.setAll(data);
  series1?.data.setAll(data);
  series2?.data.setAll(data);
};
</script>


<style scoped>
.chartDiv {
  width: 100%;
  height: 500px;
}

.selector-div {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 2rem;
  margin-bottom: 10px;
  margin-top: 10px;
}

.daily-monthly-div {
  display: flex;
  justify-content: left;
  gap: 1rem;
}

.daily-monthly-button {
  padding: 0.5rem 1rem;
  border: 1px solid var(--primary-color);
  border-radius: 5px;
  background-color: white;
  color: var(--primary-color);
  cursor: pointer;
  transition: 0.3s;
  width: 7rem;
}

.select-time-div {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.selected {
  background-color: var(--primary-color);
  color: white;
}


@media screen and (max-width: 600px) {
  .chartDiv {
    height: 450px;
  }

  .selector-div {
    grid-template-columns: 1fr;
  }

  .daily-monthly-div {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }

  .daily-monthly-button {
    width: 45%;
  }

  .select-time-div {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

}
</style>