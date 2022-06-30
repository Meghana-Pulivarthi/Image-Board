// // this file will contain all of our  Vue code
import * as Vue from "./vue.js";

Vue.createApp({
    data() {
        return {
            images: [],
            title: "",
            user: "",
            description: "",
            url: "",
        };
    },

    mounted() {
        console.log("It is mounted");
        fetch("/images")
            .then((res) => res.json())
            .then((data) => {
                // console.log("response from /images:", data);
                this.images = data;
            });
    },
    methods: {
        handleSubmit(e) {
            //to prevent default refresh of page on submit we can use
            //e.preventDefault() here or use @submit.prevent in html
            // e.preventDefault();
            console.log("Handle submit");
            fetch("/upload", {
                method: "POST",
                body: new FormData(e.target),
            })
                .then((res) => res.json())
                .then((data) => console.log(data));
        },
    },
}).mount("#main");
