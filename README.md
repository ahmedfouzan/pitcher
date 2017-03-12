# Pitcher

An image sharing web application, with additional features like video sharing, live video streaming, chat.

### Version
1.0.0

## Prerequisites

* [NodeJS](https://nodejs.org/)
* [Neo4j](https://neo4j.com/)

## Installation

Clone this repository

```bash
git clone https://github.com/ahmedfouzan/pitcher.git
```

Change into the directory

```bash
cd pitcher
```

Install the dependencies

```bash
npm install
```

### Running

Run the app

```bash
npm start
```

### End Points

Using the following endpoints you can

* Register a user

```
POST /users/register
```

* Login

```
POST /users/authenticate   // Gives a token
```

* Requires token to authorize

```
POST /users/profile
```

## Deployment

To be added....

## Built With

* Serverside - [NodeJS](https://nodejs.org/), [ExpressJS](http://expressjs.com/)
* Database - [Neo4j](https://neo4j.com/)
* Frontend - [Bootstrap](https://getbootstrap.com/), [JQuery](https://jquery.com/), [AngularJS](http://angularjs.org/)

## Authors

* [**Ahmed Fouzan**](https://github.com/ahmedfouzan)
* [**Mohammed Imran**](https://github.com/imran-14)
* [**Heerak Agrawal**](https://github.com/heerak23)

## License

[MIT](http://opensource.org/licenses/MIT)