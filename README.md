# Node.JS-RS-School-2022Q4 Task 4 - Websocket remote control

This is remote control backend using `nutjs.dev` library and websocket. 

User interface for remote control backend take from [here](https://github.com/rolling-scopes-school/remote-control)

The backend allows to do the following:

- Start websocket server
- Handle websocket connection
- Move mouse (Up, Down, Left, Right)
- Draw circle, rectangle and square  
- Send current mouse coordinates
- Send desktop capture

---

## Application features
If you use multiple monitors:
- you can move mouse, get mouse position on any monitor
- you can draw figures, do print screen only on main monitor

---

## How to install

To run this app, you should do the following steps:

1. Clone this repository, for example:
    ```
    https://github.com/dab10/websocket-remote-control.git
    ``` 
2. Switch branch to `develop`
3. Run the command line and go to the created folder
4. Install dependencies by entering the command
    ```
    npm install
    ``` 
5. Run app:
    ```
    npm run start
    ```

---

## How to use

Open 
```
http://localhost:8181
```
8181 is port by default, you can change it in .env file

By default websocket server run in 8080 port

If you change websocket server port in .env file, you should enter in field "WebSocket URL" new port and press "Submit" button

Press arrow buttons on your keyboard for move mouse

Press "p" button on your keyboard for get mouse position

Press "c" button on your keyboard for draw circle

Press "r" button on your keyboard for draw rectangular

Press "s" button on your keyboard for draw square

You can get part of screen image with LCtrl+p keyboard buttons

---

## Contacts
Please, contact me if you have any questions.

discord: bazhenovda#5973

telegram: @dab1000