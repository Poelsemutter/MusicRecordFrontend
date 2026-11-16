
const app = Vue.createApp({
    data() {
        return {
            records: [],
            loading: true,
            error: null,
            title: "",
            artist: ""
        };
    },
    methods: {
        async search() {
            const params = new URLSearchParams({ title: this.title, artist: this.artist });
            const response = await axios.get(
                `https://musicrecordapi20261112102328-ekakdscpg7epbrfn.brazilsouth-01.azurewebsites.net/api/musicrecord?${params}`)
            this.records = await response.json()

            // const data = await response.json();
            // this.records = data;
        }
    },
    async mounted() {
        try {
            const response = await axios.get(
                "https://musicrecordapi20261112102328-ekakdscpg7epbrfn.brazilsouth-01.azurewebsites.net/api/musicrecord",
            );
            this.records = response.data;
        } catch (error) {
            this.error = error instanceof Error
                ? error.message
                : "Unable to load the records.";
        } finally {
            this.loading = false;
        }
        try {

    },
});

app.mount("#app");