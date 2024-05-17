<template>
    <div class="chartDiv" ref="chartdiv">
        <h1 v-if="chartError">Daten konnten nicht geladen werden, bitte versuchen sie es später erneuet</h1>
    </div>
</template>


<script setup lang="ts">
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const chartError = ref(false) as Ref<boolean>;
const chartdiv = ref() as Ref<HTMLDivElement>;


let root = null as am5.Root | null;
let chart = null as am5percent.PieChart | null;
let series = null as am5percent.PieSeries | null;


const props = defineProps<{
    event: Event;
}>();

onMounted(() => {
    createChart();
});

function createChart() {
    root = am5.Root.new(chartdiv.value);
    root.setThemes([
        am5themes_Animated.new(root)
    ]);
    chart = root.container.children.push(am5percent.PieChart.new(root, {
        layout: root.verticalLayout
    }));

    series = chart.series.push(am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category"
    }));

    series.data.setAll([
        { value: 89, category: "Erschienen" },
        { value: 11, category: "Nicht Erschienen" }
    ]);
    series.appear(1000, 100);
}


</script>




<style scoped>
.chartDiv {
    width: 100%;
    height: 300px;
}
</style>