
const app = Vue.createApp({
    data() {
        return {
            records: [],
            loading: true,
            error: null,
        };
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
    },
});

app.mount("#app");