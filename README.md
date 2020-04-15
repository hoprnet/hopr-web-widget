# HOPR net

HOPR is a privacy-preserving messaging protocol that incentivizes users to participate in the network. It provides privacy by relaying messages via several relay nodes to the recipient. Relay nodes are getting paid via payment channels for their services.

## hopr-web-widget

Provides a graphical user interface to interact with the [`hopr.network`](https://hopr.network) [dApp](https://ethereum.stackexchange.com/questions/383/what-is-a-dapp).

## Table of Contents:

- [HOPR net](#hopr-net)
  - [hopr-web-widget](#hopr-web-widget)
- [Requirements](#requirements)
- [Install](#install)
- [Development](#development)
- [Building](#building)


## Requirements

- [Node.js](https://nodejs.org)
- [Yarn](https://yarnpkg.com)

## Install

```bash
# Installs dependancies
yarn
```

## Development

The widget uses the [HOPR ethereum smart contracts](https://github.com/hoprnet/hopr-ethereum/tree/develop) to interact / aggregate events. This requires the developer to deploy the smart contracts in a local testnet and ensure the widget is using the [correct addresses](./src/contracts/addresses.json).

Instructions [here](https://github.com/hoprnet/hopr-ethereum/tree/develop#migrating).

```bash
# after smart contracts are deployed

# Starts project in development mode
yarn start
```

## Building

```bash
# Builds project
yarn build
```
