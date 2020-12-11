<template>
    <div class="day">
        <h1>Day Eight</h1>
        Part one : {{ partOne }}
        <hr>
        Part two : {{ partTwo }}
    </div>
</template>

<script>
    import Vue from 'vue';

    export default {
        name: 'DayEight',
        data() {
            return {
                partOne: null,
                partTwo: null
            }
        },
        mounted() {
            Vue.axios.get('http://localhost:3000/api/days/8part1')
            .then(response => {
                this.partOne = response.data.message;
            })
            .catch(e => {
                return e;
            });

            Vue.axios.get('http://localhost:3000/api/days/8part2')
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
