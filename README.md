<h1 align="center">
  Hyperstatic starter
</h1>

[Live demo](https://hyperstatic-starter.netlify.com/)


## 🚀 Quick start: 
[Click here to use this template](https://github.com/loteoo/hyperstatic-starter/generate), or run these commands:  
```
# Clone project
git clone https://github.com/loteoo/hyperstatic-starter.git

cd hyperstatic-starter

npm install         # Install dependencies
npm start           # Dev server + live reload
```

Or use a [.zip download](https://github.com/loteoo/hyperstatic-starter/archive/master.zip)  


#### Building your site : 
```
# Build for production and generate service worker
npm run build

# Build for production, generate service worker AND pre-render pages
npm run render-pages
```

## Features
- Cutting edge code-splitting and bundle loading layer using [Hyperstatic](https://hyperstatic-demo.netlify.com/)  
- Uses [Parcel](https://parceljs.org/) for compilation, dev server and hot module reloading...  
- Works offline out of the box using [workbox](https://developers.google.com/web/tools/workbox/) to generate service workers and precache application files  
- PWA/SPA ready with a default web app manifest  
- Sane CSS defaults using [sanitize.css](https://csstools.github.io/sanitize.css/), a best-practices CSS reset  
- Uses the [Standard](https://standardjs.com/) JavaScript style guide with eslint  
-  Automatic import of the `h` function (say goodbye to that `h` import!)  
- [JSX](https://reactjs.org/docs/introducing-jsx.html) and all of the ES6-7-8-9 goodies are ready to go thanks to Parcel.  


## Sample file structure
Proposed folder structure as your project grows. Adapt it to your needs.  

```
├── dist/                             # Compiled static files (build output)
├── src/                              # Application source code
│   ├── app/                          # App files
│   │   ├── pages/                    # Site pages
│   │   │   ├── {PageName}.jsx        # Single file page
│   │   │   ├── {PageName}/           # Page with multiple files
│   │   │   │   ├── actions.js        # Local actions
│   │   │   │   ├── index.jsx         # Exported view
│   │   │   │   ├── style.css         # Page styles
│   │   │   │   └── other.svg         # Other related files
│   │   ├── components/               # Other components
│   │   │   └── {ComponentName}.jsx   # Single file component
│   │   ├── actions.js                # Global actions
│   │   ├── init.js                   # Initial app state
│   │   ├── routes.js                 # Route patterns
│   │   └── view.jsx                  # Root view
│   ├── app.js                        # Hyperapp instantiation
│   ├── global.css                    # Global styles
│   ├── index.html                    # Parcel entry
│   └── manifest.webmanifest          # Web app manifest
├── static/                           # Files to be copied in dist folder
├── ...
...
```



---  




This starter project was based on this [Hyperapp starter](https://github.com/loteoo/hyperapp-starter). Hyperstatic and a few pages was then added in.


