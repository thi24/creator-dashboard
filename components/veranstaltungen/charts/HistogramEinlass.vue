<template>
    <div class="select-time-div">
        <input v-model="selectedDate" type="date" @input="getChartData()" />
    </div>
    <div class="chartDiv" ref="chartdiv">
        <h1 v-if="chartError">Daten konnten nicht geladen werden, bitte versuchen sie es später erneuet</h1>
    </div>
</template>


<script setup lang="ts">
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

import { getTicketValidationsPerDay } from '~/requests/analytics';
import { TicketValidation } from '~/classes/TicketValidation';
import { Event } from '~/classes/Event';

const chartError = ref(false) as Ref<boolean>;
const chartdiv = ref() as Ref<HTMLDivElement>;

const selectedDate = ref(new Date().toISOString().substring(0, 10)) as Ref<string>;

let root = null as am5.Root | null;
let chart = null as am5xy.XYChart | null;
let series = null as am5xy.ColumnSeries | null;
let xAxis = null as am5xy.CategoryAxis<am5xy.AxisRenderer> | null;

const props = defineProps<{
    event: Event;
}>();

onMounted(() => {
    getChartData();
    createChart();
});

function getChartData() {
    if (!props.event.id) return;
    // Get data from API
    let onSuccess = (_data: TicketValidation[]) => {
        chartError.value = false;
        data = _data.map((validation) => {
            return {
                time: validation.validationTime.split(":")[0] + " Uhr",
                value: validation.count
            }
        });
        if (chart == null) {
            createChart();
        } else {
            updateData();
        }
    }
    let onError = () => {
        chartError.value = true;
    }
    getTicketValidationsPerDay(props.event.id, selectedDate.value, onSuccess, onError);
}

function updateData() {
    xAxis?.data.setAll(data);
    series?.data.setAll(data);
}

function createChart() {
    root = am5.Root.new(chartdiv.value);
    root.setThemes([
        am5themes_Animated.new(root)
    ]);
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
        minGridDistance: 20,
        minorGridEnabled: true,
    });

    // Create X-axis
    xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
        categoryField: "time",
        renderer: xRenderer,
    }));

    xRenderer.grid.template.setAll({
        location: 1
    })

    // only executed if on mobile
    if (window.innerWidth < 600) {
        xRenderer.labels.template.setAll({
            rotation: -90,
            centerY: am5.p50,
            centerX: am5.p100,
            paddingRight: 15
        });
    }

    // Create series with example data of hourly incoming people
    series = chart.series.push(am5xy.ColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        categoryXField: "time",
        tooltipText: "Besucher: {valueY}",
        tooltip: am5.Tooltip.new(root, {
            themeTags: ["series"],
            animationDuration: 200
        })
    }));
    series.columns.template.setAll({
        width: am5.percent(80),
        tooltipY: 25,
        strokeOpacity: 0
    });
    xAxis.data.setAll(data)
    series.data.setAll(data)

    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));



}

let data = [
    {
        "time": "17 Uhr",
        "value": 100
    },
    {
        "time": "18 Uhr",
        "value": 200
    },
    {
        "time": "19 Uhr",
        "value": 300
    },
    {
        "time": "20 Uhr",
        "value": 400
    },
    {
        "time": "21 Uhr",
        "value": 500
    },
    {
        "time": "22 Uhr",
        "value": 600
    },
    {
        "time": "23 Uhr",
        "value": 700
    },
    {
        "time": "24 Uhr",
        "value": 800
    }
];


</script>


<style scoped>
.chartDiv {
    width: 100%;
    height: 500px;
}
</style>