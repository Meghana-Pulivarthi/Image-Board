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
    template: `<div>
                     <h1 @click="notifyParent"> X</h1>
                     <h1>I am your modal template</h1>
                     <img v-bind:src="image.url" v-bind:alt="image.description">
                     <p>{{image.title}}</p>
                     <p>{{image.description}}</p>
</div>
    `,
};
export default modal;
