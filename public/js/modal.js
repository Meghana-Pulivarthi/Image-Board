const modal = {
    data() {
        return {
            image: {},
            comments: [],
            user: "",
            comment: "",
        };
    },

    props: ["image-selected"],

    mounted() {
        console.log("Modal mounted");
        console.log("accessing prop value image", this.imageSelected);
        // if (!Number.parseInt(`${this.imageSelected}`)) {
        // }
        //fetch highlighted image
        fetch(`/imagespopup/${this.imageSelected}`)
            .then((res) => res.json())
            .then((res) => {
                console.log("response from /imagespopup:", res);
                if (res.data) {
                    this.image = res.data;
                } else {
                    this.$emit("close");
                }
            });

        //fetch comments
        fetch(`/comments/${this.imageSelected}`)
            .then((res) => res.json())
            .then((data) => {
                // console.log("response from /comments", data);
                this.comments = data;
            })
            .catch((err) => {
                console.log("Error in fetch comments", err);
            });
    },

    methods: {
        notifyParent() {
            // console.log("I want to let app.js know it should do sth!");
            this.$emit("close");
        },
        handleSubmitComment() {
            fetch("/comments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user: this.user,
                    comment: this.comment,
                    images_id: this.imageSelected,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log("data", data);
                    this.comments.push(data.payload);
                });
        },
    },

    template: `<div id="selected">
                     <h1 id="X" @click="notifyParent">❌</h1>
                     <img id="selectedImg"  v-bind:src="image.url" v-bind:alt="image.description">
                     <p id="selectedTitle">{{image.title}}</p>
                     <p id="selectedDesc">{{image.description}}</p>

            <form  method="post" @submit.prevent="handleSubmitComment">
            <input required name='username' placeholder="enter your name" type="text" v-model="user">
            <input required name='comment' placeholder="comment" type="text" v-model="comment">
            <button>Submit</button>
        </form>
<div v-if="comments.length" v-for="comment in comments" :key="comment.id" id="comment">                             
<p>{{comment.comment}}</p>
<p>{{comment.username}}  {{comment.commented_at}}</p>
    </div>
        </div>
    `,
};
export default modal;
