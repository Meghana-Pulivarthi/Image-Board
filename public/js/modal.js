const modal = {
    data() {
        return {
            image: {},
        };
    },
    props: ["image-selected"],
    mounted() {
        console.log("Modal mounted");
        console.log("accessing prop value", this.imageSelected);

        //fetch
        fetch(`/images/${this.imageSelected}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("response from /images:", data);
                this.image = data;

                console.log(this.image);
            });
    },
    methods: {
        notifyParent() {
            console.log("I want to let app.js know it should do sth!");
            this.$emit("close");
        },
    },
    template: `<div id="selected">
                     <h1 id="X" @click="notifyParent">x</h1>
                     <img id="selectedImg" v-bind:src="image.url" v-bind:alt="image.description">
                     <p id="selectedTitle">{{image.title}}</p>
                     <p id="selectedDesc">{{image.description}}</p>
</div>
    `,
};
export default modal;
