# LupaAndPepi.com

Custom theme for [Lupa & Pepi Shopify store](http://lupaandpepi.myshopify.com/).

[Lupa & Pepi Trello Board](https://trello.com/b/N0qZd2c9/lupa-pepi)

## Development Environment

The following are directions to setup necessary software, download the code, and get started developing.

### Prerequisites

- Install [Git](http://git-scm.com/downloads)
- Install [Node.js](http://nodejs.org/download/)
- Install [Grunt CLI](http://gruntjs.com/getting-started)
- Install [Google Chrome](https://www.google.com/intl/en/chrome/browser/)
- Install [LiveReload Extension](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en)
- Install [GraphicsMagick](http://www.graphicsmagick.org/README.html#installation)

### Code

- Clone repo: `git clone https://github.com/hparra/lupaandpepi.com`
- Install node modules: `npm install`

#### Configure .env file

You must create a file named `.env` in the root directory which contains the Shopify password and API key. They can be found on the [Private Apps](https://lupaandpepi.myshopify.com/admin/apps/private) section of the admin panel. This file must *not* be committed. Git is configured ignore it.

The `.env` file should have the following structure:

```
SHOPIFY_API_KEY=somelongstringofnumbersandletters
SHOPIFY_PASSWORD=anotherlongstringofnumbersandletters
```

### Development

The default grunt task watches for changes in files and uploads them. Simply run `grunt` and develop away. Open the page you're working on in Chrome and enable LiveReload so that browser automatically refreshes when changes are uploaded.

### Images

Images should be placed in root images/ directory. If they are icons and you desire to put them in the sprite then place them in images/icons/. Sprites will only be created if `grunt` is already watching. If not you have to run `grunt spriteHD` followed by `grunt css`.