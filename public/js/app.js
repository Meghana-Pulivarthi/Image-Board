// // this file will contain all of our  Vue code
import * as Vue from "./vue.js";
// import firstComponent from "./first-component.js";
import modal from "./modal.js";

Vue.createApp({
    data() {
        return {
            images: [],
            title: "",
            user: "",
            description: "",
            url: "",
            imageSelected: "",
        };
    },
    components: {
        modal: modal,
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
        imageClicked(id) {
            console.log("Image clicked", id);
            this.imageSelected = id;
        },
        closemodal() {
            this.imageSelected = null;
            console.log("first component emitted close!!!");
            console.log(
                "the component would like have you make it disappear :D"
            );
            console.log("set this.moodSelected to sth falsy");
        },
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
