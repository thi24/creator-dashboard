<template>
    <div class="chartDiv" ref="chartdiv">
        <h1 v-if="chartError">Daten konnten nicht geladen werden, bitte versuchen sie es später erneuet</h1>
    </div>
</template>


<script setup lang="ts">
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

import { getAmountOfValidTickets, getAmountOfRedeemedTickets } from '~/requests/analytics';
import { Event } from '~/classes/Event';
import UiIcon from '~/components/ui/UiIcon.vue';

const chartError = ref(false) as Ref<boolean>;
const chartdiv = ref() as Ref<HTMLDivElement>;

const redeemedTickets = ref(0) as Ref<number>;
const validTickets = ref(0) as Ref<number>;
const data = ref([]) as Ref<{ value: number, category: string }[]>;


let root = null as am5.Root | null;
let chart = null as am5percent.PieChart | null;
let series = null as am5percent.PieSeries | null;
let legend = null as am5.Legend | null;


const props = defineProps<{
    event: Event;
}>();

onMounted(() => {
    getChartData();
});


function getChartData() {
    if (!props.event.id) return;
    let amountRedeemedTickets = new Promise<void>((resolve, reject) => {
        if (props.event.id == null) {
            return;
        }
        getAmountOfRedeemedTickets(props.event.id,
            (data: number) => {
                redeemedTickets.value = data;
                resolve();
            },
            () => {
                onError();
                reject();
            });
    });
    let amountValidTickets = new Promise<void>((resolve, reject) => {
        if (props.event.id == null) {
            return;
        }
        getAmountOfValidTickets(props.event.id,
            (data: number) => {
                validTickets.value = data;
                resolve();
            },
            () => {
                onError();
                reject();
            });
    });
    let onError = () => {
        chartError.value = true;
    }
    Promise.all([amountRedeemedTickets, amountValidTickets]).then(() => {
        chartError.value = false;
        data.value = [
            { value: redeemedTickets.value, category: "Erschienen:" },
            { value: validTickets.value, category: "Nicht Erschienen:" }
        ];
        if (chart == null) {
            createChart();
        } else {
            updateData();
        }
    });


}

function createChart() {
    root = am5.Root.new(chartdiv.value);
    root.setThemes([
        am5themes_Animated.new(root)
    ]);

    chart = root.container.children.push(am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
        radius: am5.percent(75),
        centerX: am5.percent(15),
        innerRadius: am5.percent(50),


    }));

    series = chart.series.push(am5percent.PieSeries.new(root, {
        name: "series",
        valueField: "value",
        categoryField: "category",
    }));

    series.data.setAll([
        { value: redeemedTickets.value, category: "Erschienen" },
        { value: validTickets.value, category: "Nicht Erschienen" }
    ]);

    legend = chart.children.push(am5.Legend.new(root, {
        x: am5.percent(85),
        y: am5.percent(10),
        layout: root.verticalLayout,
    }));
    legend.valueLabels.template.adapters.add("text", (text, target) => {
        return "{value.formatNumber('#.0a)}";
    });
    legend.labels.template.setAll({
        text: "{category}:",
    });

    legend.data.setAll(series.dataItems);

    legend.appear(1000, 100);
    series.appear(1000, 100);
    chart.appear(1000, 100);

}

function updateData() {
    series?.data.setAll(data.value);
    legend?.data.setAll(series?.dataItems);
}


</script>




<style scoped>
.chartDiv {
    width: 100%;
    height: 500px;
}
</style>