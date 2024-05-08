<template>
    <div class="hello" ref="chartdiv">
    </div>

</template>


<script lang="ts" setup>
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

import { Event } from '~/classes/Event';

const chartdiv = ref();
let root = null;

const props = defineProps<{
    event: Event
}>()


onMounted(() => {
    root = am5.Root.new(chartdiv.value);
    //let root = am5.Root.new((this as any).$refs.chartdiv);

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
        am5xy.XYChart.new(root, {
            panY: false,
            layout: root.verticalLayout,
            panX: true,

            wheelX: "panX",
            wheelY: "zoomX",
            paddingLeft: 0,
        })
    );


    // Define data
    var data = [{
        "month": "Januar",
        "views": 1340,
        "orders": 100,
        "tickets": 200
    }, {
        "month": "Februar",
        "views": 3030,
        "orders": 1020,
        "tickets": 430
    }, {
        "month": "März",
        "views": 1000,
        "orders": 500,
        "tickets": 800
    }, {
        "month": "April",
        "views": 3000,
        "orders": 800,
        "tickets": 500
    }, {
        "month": "Mai",
        "views": 5120,
        "orders": 100,
        "tickets": 200
    }, {
        "month": "Juni",
        "views": 3000,
        "orders": 500,
        "tickets": 200
    }];
    let xRenderer = am5xy.AxisRendererX.new(root, {
        minGridDistance: 70,
        minorGridEnabled: true
    });

    // Create Y-axis
    /*
    let yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
            renderer: am5xy.AxisRendererY.new(root, {})
        })
    );
    */
    let yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
            min: 0,
            renderer: am5xy.AxisRendererY.new(root, {
                strokeOpacity: 0.1
            })
        })
    );

    // Create X-axis
    let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
        categoryField: "month",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {
            themeTags: ["axis"],
            animationDuration: 200
        })
        }));

    xRenderer.grid.template.setAll({
    location: 1
    })

    

    xAxis.data.setAll(data);
    
    // Create series
    let series0 = chart.series.push(am5xy.ColumnSeries.new(root, {
        name: "Seitenaufrufe",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "views",
        categoryXField: "month",
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


    let series1 = chart.series.push(am5xy.ColumnSeries.new(root, {
        name: "Bestellungen",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "orders",
        categoryXField: "month",
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

    let series2 = chart.series.push(am5xy.ColumnSeries.new(root, {
        name: "Tickets",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "tickets",
        categoryXField: "month",
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

});




</script>




<style scoped>
.hello {
    width: 100%;
    height: 500px;
}
</style>
