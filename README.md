

![explorer UI](./src/static/explorer-UI.png)

## AirSwap Explorer UI

[![Discord](https://img.shields.io/discord/590643190281928738.svg)](https://chat.airswap.io)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
![Twitter Follow](https://img.shields.io/twitter/follow/airswap?style=social)


[AirSwap](https://www.airswap.io/) is a peer-to-peer trading network for Ethereum tokens. Peers connect based on common interest, agree on a price through mutual cryptographic signatures, and settle trades without intermediaries. [AirSwap Explorer](https://explorer.airswap.io/) is an open-source interface to monitor real-time activity on the AirSwap network.



## Resources
Docs → [https://docs.airswap.io/](https://docs.airswap.io/)

Website → [https://www.airswap.io/](https://www.airswap.io/)

Whitepaper → [https://swap.tech/whitepaper/](https://swap.tech/whitepaper/)

Twitter → [https://twitter.com/airswap?lang=en](https://twitter.com/airswap)

Discord →  [https://chat.airswap.io](http://chat.airswap.io)


## Run Locally
This repository uses .nvmrc to manage node version, so run `nvm install` before `yarn` to make sure you are running the correct node version.

### `yarn install`
Install dependencies required to run the app.

### `yarn start:dev` or `yarn start:prod`
Runs the app locally against development or production environment. Add a `network` query parameter corresponding to different [chainIds](https://github.com/airswap/airswap-protocols/blob/559f70277ba1c8c87a95a74089aa110b43bcd49c/tools/constants/index.ts#L30-L35) to access different networks.
E.x. 'https://localhost:3001/?network=4' will show Rinkeby Network data.

### `yarn locale`
Re-generates locale messages.

## Contributions
Contributions are encouraged! Simply fork this repository or create a new branch and open a pull request.
