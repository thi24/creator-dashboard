<template>
    <div>
        <button @click="createChartJson()">Daily</button>
        <button>Weekly</button>
        <button>Monthly</button>
        <div>
            <input type="date" />
            <input type="date" />
        </div>
    </div>
    <div class="hello" ref="chartdiv">
    </div>

</template>


<script lang="ts" setup>
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

import { Event } from '~/classes/Event';

const chartdiv = ref();
const monthlytimeframe = ref(false);
let root = null;

const props = defineProps<{
    event: Event
}>()



// Define data
var data = [{
    "date": "Januar",
    "views": 1340,
    "orders": 100,
    "tickets": 200
}, {
    "date": "Februar",
    "views": 3030,
    "orders": 1020,
    "tickets": 430
}, {
    "date": "März",
    "views": 1000,
    "orders": 500,
    "tickets": 800
}, {
    "date": "April",
    "views": 3000,
    "orders": 800,
    "tickets": 500
}, {
    "date": "Mai",
    "views": 5120,
    "orders": 100,
    "tickets": 200
}, {
    "date": "Juni",
    "views": 3000,
    "orders": 500,
    "tickets": 200
}];





onMounted(() => {


    createChartJson();
    createChart();

});

function createChartJson() {
    data = [];
    if (monthlytimeframe.value == true) {
        let currentMonth = 0;
        // Aggregate daily data to monthly data
        let views = 0;
        let orders = 0;
        let tickets = 0;
        let date = new Date(incomingDataFormatViews[0].label);
        let i = 0;
        while (i < incomingDataFormatViews.length) {
            currentMonth = date.getMonth();
            while (date.getMonth() == currentMonth) {
                date = new Date(incomingDataFormatViews[i].label);
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
            let dateformat = new Date(incomingDataFormatViews[i].label).toLocaleDateString();
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

function createChart() {
    root = am5.Root.new(chartdiv.value);

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
    let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
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
    if(monthlytimeframe.value == false){
        xRenderer.labels.template.setAll({
            
            fontSize: 15,
        })
    }


    xAxis.data.setAll(data);

    // Create series
    let series0 = chart.series.push(am5xy.ColumnSeries.new(root, {
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


    let series1 = chart.series.push(am5xy.ColumnSeries.new(root, {
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

    let series2 = chart.series.push(am5xy.ColumnSeries.new(root, {
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

}




var incomingDataFormatViews =
    [
        {
            "label": "2024-01-01",
            "value": 100
        },
        {
            "label": "2024-01-02",
            "value": 200
        },
        {
            "label": "2024-01-03",
            "value": 300
        },
        {
            "label": "2024-01-04",
            "value": 400
        },
        {
            "label": "2024-01-05",
            "value": 500
        },
        {
            "label": "2024-01-06",
            "value": 600
        },
        {
            "label": "2024-01-07",
            "value": 700
        },
        {
            "label": "2024-01-08",
            "value": 800
        },
        {
            "label": "2024-01-09",
            "value": 900
        },
        {
            "label": "2024-01-10",
            "value": 1000
        },
        {
            "label": "2024-01-11",
            "value": 1100
        },
        {
            "label": "2024-01-12",
            "value": 1200
        },
        {
            "label": "2024-01-13",
            "value": 1300
        },
        {
            "label": "2024-01-14",
            "value": 1400
        },
        {
            "label": "2024-01-15",
            "value": 1500
        },
        {
            "label": "2024-01-16",
            "value": 1600
        },
        {
            "label": "2024-01-17",
            "value": 1700
        },
        {
            "label": "2024-01-18",
            "value": 1800
        },
        {
            "label": "2024-01-19",
            "value": 1900
        },
        {
            "label": "2024-01-20",
            "value": 2000
        },
        {
            "label": "2024-01-21",
            "value": 2100
        },
        {
            "label": "2024-01-22",
            "value": 2200
        },
        {
            "label": "2024-01-23",
            "value": 2300
        },
        {
            "label": "2024-02-23",
            "value": 2300
        },
        {
            "label": "2024-03-23",
            "value": 2300
        },
        {
            "label": "2024-04-23",
            "value": 2300
        },
    ]
    ;

var incomingDataFormatOrders = [
    {
        "label": "2024-01-01",
        "value": 10
    },
    {
        "label": "2024-01-02",
        "value": 20
    },
    {
        "label": "2024-01-03",
        "value": 30
    },
    {
        "label": "2024-01-04",
        "value": 40
    },
    {
        "label": "2024-01-05",
        "value": 50
    },
    {
        "label": "2024-01-06",
        "value": 60
    },
    {
        "label": "2024-01-07",
        "value": 70
    },
    {
        "label": "2024-01-08",
        "value": 80
    },
    {
        "label": "2024-01-09",
        "value": 90
    },
    {
        "label": "2024-01-10",
        "value": 100
    },
    {
        "label": "2024-01-11",
        "value": 110
    },
    {
        "label": "2024-01-12",
        "value": 120
    },
    {
        "label": "2024-01-13",
        "value": 130
    },
    {
        "label": "2024-01-14",
        "value": 140
    },
    {
        "label": "2024-01-15",
        "value": 150
    },
    {
        "label": "2024-01-16",
        "value": 160
    },
    {
        "label": "2024-01-17",
        "value": 170
    },
    {
        "label": "2024-01-18",
        "value": 180
    },
    {
        "label": "2024-01-19",
        "value": 190
    },
    {
        "label": "2024-01-20",
        "value": 200
    },
    {
        "label": "2024-01-21",
        "value": 210
    },
    {
        "label": "2024-01-22",
        "value": 220
    },
    {
        "label": "2024-01-23",
        "value": 230
    },
    {
        "label": "2024-02-23",
        "value": 2300
    },
    {
        "label": "2024-03-23",
        "value": 2300
    },
    {
        "label": "2024-04-23",
        "value": 2300
    },
]

var incomingDataFormatTickets = [
    {
        "label": "2024-01-01",
        "value": 1
    },
    {
        "label": "2024-01-02",
        "value": 2
    },
    {
        "label": "2024-01-03",
        "value": 3
    },
    {
        "label": "2024-01-04",
        "value": 4
    },
    {
        "label": "2024-01-05",
        "value": 5
    },
    {
        "label": "2024-01-06",
        "value": 6
    },
    {
        "label": "2024-01-07",
        "value": 7
    },
    {
        "label": "2024-01-08",
        "value": 8
    },
    {
        "label": "2024-01-09",
        "value": 9
    },
    {
        "label": "2024-01-10",
        "value": 10
    },
    {
        "label": "2024-01-11",
        "value": 11
    },
    {
        "label": "2024-01-12",
        "value": 12
    },
    {
        "label": "2024-01-13",
        "value": 13
    },
    {
        "label": "2024-01-14",
        "value": 14
    },
    {
        "label": "2024-01-15",
        "value": 15
    },
    {
        "label": "2024-01-16",
        "value": 16
    },
    {
        "label": "2024-01-17",
        "value": 17
    },
    {
        "label": "2024-01-18",
        "value": 18
    },
    {
        "label": "2024-01-19",
        "value": 19
    },
    {
        "label": "2024-01-20",
        "value": 20
    },
    {
        "label": "2024-01-21",
        "value": 21
    },
    {
        "label": "2024-01-22",
        "value": 22
    },
    {
        "label": "2024-01-23",
        "value": 23
    },
    {
        "label": "2024-02-23",
        "value": 2300
    },
    {
        "label": "2024-03-23",
        "value": 2300
    },
    {
        "label": "2024-04-23",
        "value": 2300
    },
]



</script>




<style scoped>
.hello {
    width: 100%;
    height: 500px;
}
</style>
