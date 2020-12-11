<template>
    <div class="day">
        <h1>Day Three</h1>
        Part one : {{ solve3to1 }}
        <hr>
        Part two : {{ getPartTwo() }}
    </div>
</template>

<script>
    import Vue from 'vue';

    export default {
        name: 'DayThree',
        data() {
            return {
                adventOfCodeInput: null,
                solve1to1: null,
                solve3to1: null,
                solve5to1: null,
                solve7to1: null,
                solve1to2: null,
                partOne: null
            }
        },
        methods: {
            getPartTwo() {
                return this.solve1to1 * this.solve3to1 * this.solve5to1 * this.solve7to1 * this.solve1to2;
            }
        },
        mounted() {

            let data1 = { right: 1, down: 1 };

            Vue.axios.post('http://localhost:3000/api/days/3', data1)
            .then(response => {
                this.solve1to1 = response.data.message;
            })
            .catch(e => {
                return e;
            });

            // -----------------------------------------------------------------

            let data5 = { right: 3, down: 1 };

            Vue.axios.post('http://localhost:3000/api/days/3', data5)
            .then(response => {
                this.solve3to1 = response.data.message;
                this.partOne = this.solve3to1;
            })
            .catch(e => {
                return e;
            });

            // -----------------------------------------------------------------

            let data2 = { right: 5, down: 1 }

            Vue.axios.post('http://localhost:3000/api/days/3', data2)
            .then(response => {
                this.solve5to1 = response.data.message;
            })
            .catch(e => {
                return e;
            });

            // -----------------------------------------------------------------

            let data3 = { right: 7, down: 1 };

            Vue.axios.post('http://localhost:3000/api/days/3', data3)
            .then(response => {
                this.solve7to1 = response.data.message;
            })
            .catch(e => {
                return e;
            });

            // -----------------------------------------------------------------

            let data4 = { right: 1, down: 2 };

            Vue.axios.post('http://localhost:3000/api/days/3', data4)
            .then(response => {
                this.solve1to2 = response.data.message;
            })
            .catch(e => {
                return e;
            });

        }
    }
</script>

<style lang="css" scoped>
</style>
