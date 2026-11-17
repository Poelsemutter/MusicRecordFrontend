const baseUrl = "https://musicrecordapi20261112102328-ekakdscpg7epbrfn.brazilsouth-01.azurewebsites.net/api/musicrecord";
const authUrl = "https://musicrecordapi20261112102328-ekakdscpg7epbrfn.brazilsouth-01.azurewebsites.net/api/auth";
const app = Vue.createApp({
    data() {
        return {
            records: [],
            loading: true,
            error: null,
            title: "",
            artist: "",
            publicationYear: null,
            username: "",
            password: "",
            token: localStorage.getItem("token")
        };
    },
    methods: {
        async login() {
           try {
                const response = await axios.post(`${authUrl}/login`, {
                    username: this.username,
                    password: this.password
                });
                this.token = response.data.token;
                localStorage.setItem("token", response.data.token);
                axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
                this.search();
            }
            catch (error) {
                this.error = error instanceof Error
                    ? error.message
                    : "Unable to login.";
            }
        },
        logout() {
            this.token = null;
            localStorage.removeItem("token");
            delete axios.defaults.headers.common["Authorization"];
            this.records = [];
        },
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

    computed: {
        isLoggedIn() {
            return !!this.token;
        }
    },
    async mounted() {
        if (this.token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
        }
        this.search();
    },
});

app.mount("#app");