# NearBoba

NearBoba is a simple web app that queries the [Yelp Business Search API](https://docs.developer.yelp.com/reference/v3_business_search) for boba places.

It has a React frontend, and uses the MaterialUI component library. It also uses a node express server for proxying requests to the Yelp API.

## Running the app

This application requires `npm` and `node` ([npm docs](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)).

```bash
npm --version # ensure you can run
```

Run the server and frontend together:

```bash
# create a .env file and add your YELP_API_KEY
touch .env
echo "YELP_API_KEY=<your-key-here>" >> .env

# run app
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Testing

Run tests with `npm test`

## Design Decisions and Tradeoffs

- I spent most of my time developing the UI of the app; I've added TODOs in the code where I'd like to spend more time improving it. Because of this, I've spent less time on testing and setup experience than I'd have liked.
- I used express for the backend, as it was easy to set up. We need a backend on our own domain to proxy requests to the Yelp API.
- I designed a parent component (Boba) for the page, with two child components, (Form and BusinessTable). This allowed each component to be small and focussed, but does require passing down of handlers via props so that the children can reflect updates.
- I've opted for a very specific UI, which was faster to build, vs a more open-ended form that would allow for different types of queries.
- I've requested a small number of results in the default page load, to optimize for faster load times for the table. This means that the user will probably have more work to do to change the number of results manually.
- I also opted to gather the data for all 3 locations, and then display the full table, rather than update the table each time one of the 3 initial requests completes. This leads to a less jarring user experience, however, we then have to wait for all 3 requests (slower initial load).
- The description asked for a list of all boba shops first, and then the ability to filter that list, which lead to my design of getting data for all 3 locations at once. Typically I might split up those requests, and I did design the backend to support per-location queries.
- I used MaterialUI for the UI components, as it has a wealth of ready-to-use components that enabled me to build something quickly. Trade off: Speed of development vs usability - the components are a bit laggy, and they're more heavyweight/complex than I need for a simple app, but it is a lot faster to put together the app vs spending time on making each UI component.

## Improvements/TODOs

### Code

- [ ] make the classifying of results into offices more robust (currently doing a zip code comparison)
- [ ] if the user has selected one office and requests more data, fetch data only from that office rather than all 3
- [ ] add more tests
- [ ] address npm package dep vulnerabilities
- [ ] package the app with Docker
- [ ] modify server to allow for more flexible querying
- [ ] add more lint rules to the project e.g. import sorting

### Product

- [ ] add user feedback if the limit is invalid
- [ ] add enter key handler to form
- [ ] add an Alert to display errors
- [ ] query different search terms e.g. "bubble tea"
- [ ] add more columns/info to the table
- [ ] consider adding a `maxHeight` to the results table so that controls don't jump to the bottom when the number of rows per page is changed
- [ ] add table help text for the Distance column (confusing when `All` is selected)
