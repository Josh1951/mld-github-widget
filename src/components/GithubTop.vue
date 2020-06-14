<template>
    <div class="wrapper">
        <div class="header">
            <h1>Most stars: {{ language }}</h1>
            <em>Repos created since {{ dateInWords(this.searchDate) }}</em>
        </div>

        <!--Display error if incomplete results or other error -->
        <div v-if="error" class="alert alert-danger" role="alert">
            Results may be incomplete, please refresh the page.
        </div>

        <div v-if="error !== '' " class="alert alert-danger" role="alert">
            {{ error }}
        </div>

        <!--Loop over each object in repositories array-->
        <div v-for="repository in repositories">
            <!--Template for each repository-->
            <div class="repository">
                <a :href="repository.html_url" target="_blank" rel="noopener noreferrer">{{ repository.full_name }}</a>

                <p>{{ repository.description }}</p>

                <div class="meta">
                    <em>Created: {{ dateInWords(repository.created_at) }}</em>
                    <span><i class="fas fa-star"></i> {{ repository.stargazers_count }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import { parseISO, format, subMonths } from 'date-fns';

    const githubApi = 'https://api.github.com/search/repositories?';

    export default {
        name: 'GithubTop',

        //Configurable properties of component
        props: {
            language: String,
            date: String
        },

        //Component data
        data: function () {
            return {
                incompleteResults: false,
                error: '',
                repositories: [],
                url: `${githubApi}q=language:${this.language}+created:%3E=${format(subMonths(parseISO(this.date), 1), 'yyyy-MM-dd')}&per_page=3&sort=stars&order=desc`
            }
        },

        //Component Methods
        methods: {
            //Function to retrieve data from API
            fetchData(url) {
                axios.get(url)
                    .then(response => {
                        if (response.data.incomplete_results === true) {
                            //Display error box
                            this.incompleteResults = true;
                        } else {
                            //Populate repositories array with relevant results
                            this.repositories = response.data.items;
                        }
                    }).catch(error => {
                        //Display error
                        this.error=(error);
                        console.log(error);
                });
            },

            //Function to format given date in words
            dateInWords(date) {
                return format(parseISO(date), 'do MMMM, yyyy')
            }
        },

        //Computed data
        computed: {
            //Returns current date minus 1 month
            searchDate() {
                return format(subMonths(parseISO(this.date), 1), 'yyyy-MM-dd');
            },
        },

        //Code to run once component is mounted to the DOM
        mounted() {
            //Retrieve data
            this.fetchData(this.url);
        },
    }
</script>

<!--Styles for component-->
<style scoped>
    .wrapper {
        width: 600px;
        border: 5px solid #222;
        border-radius: 20px;
        padding: 30px 30px;
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
        min-height: 490px;
        background-color: #fff;
    }

    .repository {
        padding-bottom: 15px;
    }

    .repository a {
        font-size: larger;
    }
    .repository p {
        margin-bottom: 5px;
    }

    .header {
        margin-bottom: 20px;
    }

    .header h1 {
        margin-bottom: 5px;
    }

    .meta {
        color: #666666;
    }

    .meta span {
        float: right;
    }

</style>