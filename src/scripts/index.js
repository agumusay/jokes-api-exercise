import '../styles/main.scss';
import "regenerator-runtime/runtime";

// Defining the class
class Joke {
    constructor() {
        this.baseUrl = 'https://joke3.p.rapidapi.com/v1/';

        // API URLs
        this.randomJokeUrl = `${this.baseUrl}/joke`;
        // this.upvoteJokeUrl = `${baseUrl}/joke/${id}/upvote`;
        // this.downvoteJokeUrl = `${baseUrl}/joke/${id}/downvote`;

        // DOM Elements
        this.jokeElement = document.querySelector('.joke-container');
        this.spinner = document.querySelector('.spinner');

        this.jokeElement.style.display = 'none';
        this.spinner.style.display = 'block';
        // On load events
        this.fetchData();
    }

    getJokeTemplate(joke) {
        return `
        <div class="joke">
            <p>${joke.content}</p>

            <button data-vote="up">Upvote ${joke.upvotes}</button>
            <button data-vote="down">Downvote ${joke.downvotes}</button>
        </div>
        `;
    }

    addVoteEvents(jokeId) {
        document.querySelectorAll('[data-vote]').forEach((button) => {
            button.addEventListener('click', () => {
                this.updateVotes(jokeId, button.dataset.vote);
            });
        })
    }

    updateVotes(jokeId, vote) {
        // make a POST req here
        fetch(`${this.baseUrl}joke/${jokeId}/${vote}vote`, {
            "method": "POST",
            "headers": {
                "x-rapidapi-host": "joke3.p.rapidapi.com",
                "x-rapidapi-key": "eOPvhbJfSvmsh2uSs5NJaEoGVyz0p12KTTTjsn6ksL0p8Vj3S1"
            }
        })
            .then((res) => res.json())
            .then((joke) => {
                console.log(joke)
                // on success
                document.querySelector(`[data-vote="${vote}"]`).innerText = `${vote}vote ` + joke[`${vote}votes`];
            })
            .catch((e) => {})
    }

    fetchData() {
        this.jokeElement.style.display = 'none';
        this.spinner.style.display = 'block';
        // CORS
        // Cross Origin Resource Sharing -> checkout the OPTIONS request going on in the Network tab
        fetch("https://joke3.p.rapidapi.com/v1/joke", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "joke3.p.rapidapi.com",
                "x-rapidapi-key": "eOPvhbJfSvmsh2uSs5NJaEoGVyz0p12KTTTjsn6ksL0p8Vj3S1"
            }
        })
        .then(res => {
            console.log(res);

            return res.json()
        })
        .then((joke) => {
            this.jokeElement.style.display = 'block';
            this.spinner.style.display = 'none';

            const jokeHTML =  this.getJokeTemplate(joke);
            this.jokeElement.innerHTML = jokeHTML;

            // document.querySelector('[data-vote="down"]').addEventListener('click', () => {
            //     console.log('downvoting....');
            //     updateDownvotes(joke.id);
            // });

            this.addVoteEvents(joke.id);
        })
        .catch(err => {
            console.log(err);
        });
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    new Joke();
});

// Plan for action
// setup
    // collect DOM elements
    // on load events


// fetching data
// creating templates
// populating with data
