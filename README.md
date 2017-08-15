# [Pokedex](http://fzpokedex.herokuapp.com)
Pokedex is single page application using react which consumes data from [Poke-API](http://pokeapi.co). This application created in order to complete technical assessment from Salestock Engineer Indonesia.

### Dependencies
There're several library i used to complete bulding this application as follows,
- [create-react-app](https://www.npmjs.com/package/create-react-app): used to initialized the project with all libraries in mind like react, react-dom, webpack and prop-types.
- [redux](https://www.npmjs.com/package/redux) and [react-redux](https://www.npmjs.com/package/react-redux): used to store application state such as pokemon url.
- [react-bootstrap](https://www.npmjs.com/package/react-bootstrap): used for standard style implementation.
- [react-router-dom](https://www.npmjs.com/package/react-router-dom): used for control routing on web application.
- [react-router-bootstrap](https://www.npmjs.com/package/react-router-bootstrap): used to create link supported by react-router on bootstrap component.

### Build & Run
To build the application you need to use npm and use command as follows,
```{engine='sh'}
$npm install
$npm run build
```
To start the application use command as follows, your application will start on //localhost:3000
```{engine='sh'}
$npm start              // run in development environment

$npm start -g serve     // run in build environment
```

### Application Flow
##### Homepage (/)
This page show all pokemon's name in list. This list updated as user scroll trough them. Click one of this list will redirect user to pokemon's profile.
##### Single Pokemon's Profile (/pokemon/:id)
This page show pokemon's profile. User can see image and all pokemon's data in there.
##### All Pokemon (/allpokemon)
This page show all pokemon's profile with infinite list. Profiles updated as user scroll trough them.
##### Filter: type
User can use filter by type and show them all pokemon corresponding with that type.

### Problem
There're several problems in working on this project which i hope can be learned by another react's developer specially when you're new into this project.
- React have different methodology in mind compare to MVC web development.
- Cross server communication problem known as CROS in react.
- The Poke-API doesn't allow user to request multiple pokemon's data at one request, instead we need to request the url first then fetch the data from it.

### Conclusion
React is a powerful framework, but writing in react can be complex enough as it is. You need to understanding design principles of react. React has several key features like component, state, and props. You need to design, which component you'll be create and which state and props will be pass trough the components, and that's it will be very important and you can be frustated when you didn't have clear design in mind since the methodology is different as standard MVC web development.
