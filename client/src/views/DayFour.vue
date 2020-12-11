<template>
    <div class="day">
        <h1>Day Four</h1>
        Part one : {{ partOne }}
        <hr>
        Part two : {{ partTwo }}
    </div>
</template>

<script>
    import Vue from 'vue';

    export default {
        name: 'DayFour',
        data() {
            return {
                partOne: null,
                partTwo: null
            }
        },
        methods: {

        },
        mounted() {
            Vue.axios.get('http://localhost:3000/api/days/4part1')
            .then(response => {
                this.partOne = response.data.message;
            })
            .catch(e => {
                return e;
            });

            Vue.axios.get('http://localhost:3000/api/days/4part2')
            .then(response => {
                this.partTwo = response.data.message;
            })
            .catch(e => {
                return e;
            });
        }
    }
</script>

<style lang="css" scoped>
</style>
