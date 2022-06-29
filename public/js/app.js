// // this file will contain all of our  Vue code
import * as Vue from "./vue.js";

Vue.createApp({
    data() {
        return {
            images: [],
        };
    },

    mounted() {
        console.log("Its mounted s ");
        fetch("/images")
            .then((res) => res.json())
            .then((data) => {
                console.log("response from /images:", data);
                this.images = data;
            });
    },
    methods: {
       
    },
}).mount("#main");
