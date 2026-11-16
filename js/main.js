const baseUrl = "https://musicrecordapi20261112102328-ekakdscpg7epbrfn.brazilsouth-01.azurewebsites.net/api/musicrecord";
const app = Vue.createApp({
    data() {
        return {
            records: [],
            loading: true,
            error: null,
            title: "",
            artist: "",
            publicationYear: null
        };
    },
    methods: {
        async search() {
         this.loading = true;
         this.error = null;
         try {
            const response = await axios.get(baseUrl, {
                params: {
                    title: this.title,
                    artist: this.artist,
                    publicationYear: this.publicationYear 
                }
            });
            this.records = response.data;
         } catch (error) {
            this.error = error instanceof Error
                ? error.message
                : "Unable to search for records.";
         } finally {
            this.loading = false;
         }
        }
    },
    async mounted() {
        this.search();
    },
});

app.mount("#app");