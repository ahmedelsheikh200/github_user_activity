const { argv } = require("node:process");

async function getActivity(username) {
    try {
        const res = await fetch(
            `https://api.github.com/users/${username}/events`
        );

        if (!res.ok) {
            throw new Error("User not found");
        }

        const events = await res.json();
        if (!events.length>0){
            throw new Error ('User not active')
        }

        events.forEach(event => {
            switch (event.type) {
                case "PushEvent":
                    console.log(
                        `- Pushed commits to ${event.repo.name}`
                    );
                    break;

                case "IssuesEvent":
                    console.log(
                        `- Opened an issue in ${event.repo.name}`
                    );
                    break;

                case "WatchEvent":
                    console.log(
                        `- Starred ${event.repo.name}`
                    );
                    break;

                default:
                    console.log(
                        `- ${event.type} in ${event.repo.name}`
                    );
            }
        });
    } catch (err) {
        console.log(`Error: ${err.message}`);
    }
}

if (!argv[2]) {
    console.log("Usage: github-activity <username>");
    process.exit(1);
}

getActivity(argv[2]);