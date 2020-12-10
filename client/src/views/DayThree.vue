<template>
    <div class="day">
        <h1>Day Three</h1>
        Part one : {{ dayPartOne() }}
        <hr>
        Part two : {{ dayPartTwo() }}
    </div>
</template>

<script>

    import txt from 'raw-loader!../inputs/day3.txt';


    export default {
        name: 'DayThree',
        data() {
            return {
                adventOfCodeInput: null
            }
        },
        methods: {
            dayPartOne() {

                console.log(txt);



                return "coucou";
            },
            dayPartTwo() {
                return "coucou";
            }
        }
    }
</script>

<style lang="css" scoped>
</style>
