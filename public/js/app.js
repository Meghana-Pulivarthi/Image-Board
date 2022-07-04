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
            visible: true,
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
            //     console.log("first component emitted close!!!");
            //     console.log(
            //         "the component would like have you make it disappear :D"
            //     );
            //     console.log("set this.moodSelected to sth falsy");
        },
        moreClicked() {
            /* 

array = [1,2,3,4,5,6]

array[array.length - 1]

arrayObj = [{},{},{},{}]

obj={
    id,
    count,
    name,
}

obj.count
obj[count]


array[array.length-1].count

*/

            console.log("More clicked");
            console.log(
                "images[] smallest id is: ",
                this.images[this.images.length - 1].id
            );
            // console.log("this.moreSelected", moreSelected);
            fetch(`/moreimages/${this.images[this.images.length - 1].id}`)
                .then((res) => res.json())
                .then((data) => {
                    console.log("response from /images:", data);
                    this.images = [...this.images, ...data];

                    for (var i = 0; i <= data.length; i++) {
                        // console.log("data[i].id", data[i].id);
                        // console.log("data[i].lowestid", data[i].lowestId);
                        if (data[i].lowestId == data[i].id) {
                            this.visible = null;
                        }
                    }
                });
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
