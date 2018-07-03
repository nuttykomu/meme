# <img width=300 src="https://user-images.githubusercontent.com/39887645/42199120-81a46340-7e41-11e8-96a0-a04b0913d669.png">

メ² is a meme generator that runs in the browser that provides an easy interface for creating two-caption memes. The client (UI) is built as a single-page application (SPA) using [Vue.js](https://vuejs.org/). The server (meme generator) is implemented as a simple RESTful web service written in [Hapi.js](https://hapijs.com/).

## Motivation

**[The Challenge]** Build a toy application that makes use of the following technologies:

- [x] ImageMagick
- [x] Node.js
- [x] Vue.js
- [x] webpack
- [ ] Docker (`TODO`)

I developed メ² in order to learn the fundamentals of Vue.js and a few other technologies. In hindsight, I would have chosen a project with a bigger scope. The scope of this project was rather small so I never got the chance to use some of the more advanced features of the framework. While メ² was developed as a SPA, it only has a single page, so I didn't get the chance to use Vue Router to map different routes to different components. Furthermore, there weren't any complex interactions between different Vue components, so I didn't get the chance to use a fancy state management library like Veux or even a simple global event bus to facilitate component interactions. Just passing props from parent to child components and emitting values back up from child to parent components sufficed for this project.

## Screenshot

![メ² Screenshot](https://user-images.githubusercontent.com/39887645/42200181-ea4766b8-7e46-11e8-8817-2727bfe5c1f4.png)
