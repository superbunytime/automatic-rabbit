const { app, BrowserView, BrowserWindow } = require("electron");
const path = require("path");

const createWindow = () => {
  const win = new BrowserWindow({
    icon: "sussyb3Scream.png",
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");

  let wc = win.webContents
  wc.openDevTools()
  win.maximize()

  const view = new BrowserView()
  win.setBrowserView(view)
  console.log(win.getBounds())
  view.setBounds({ x: 0, y: 0, width: 1220, height: 1900 })
  //really frustrating; i want to set width and height dynamically but am having difficulty doing so
  view.webContents.loadURL('https://twitch.tv/sussybnuuy')
  //this code works to embed stream.
  //now what we need to do is hide this behind an event.
  //a placeholder event can be a button press
  //but eventually we want to have the twitch eventsub
  //fire when the streamer goes live.
};

app.whenReady().then(() => {
  createWindow();
  //open app on macOS functionality?? probably
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

//quit app if on windows or linux
//using windows/linux application closing conventions
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
