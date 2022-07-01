const firstComponent = {
    data() {
        return {
            heading: "first component",
            count: 1,
            greetee: "",
        };
    },
    props: ["passingProp", "selected-mood"],
    mounted() {
        console.log("First component mounted");
        console.log("accessing prop value", this.passingProp);
        console.log("mood selected", this.selectdMood);
        setTimeout(() => {
            (this.greetee = "cayenne"), 3000;
        });
    },
    methods: {
        increaseCount() {
            console.log("user wants to up count");
            this.count++;
        },
        motifyParent() {
            console.log("I want to let app.js  know it should do something");
            this.$emit("close");
        },
    },
    template: `<h1 @click="notifyParent>Tell parent to do something</h1>
    <div><h1>I am your first {{heading}}</h1>
    <h2>Hello{{greetee}}</h2>
    <h2>Count is:{{count}}</h2>
    <button @click="increaseCount"> increase count </button>
        <button @click="count--"> decrease count </button>

    </div>`,
};

export default firstComponent;
