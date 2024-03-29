# BCH API

[![Greenkeeper badge](https://badges.greenkeeper.io/christroutner/bch-api.svg)](https://greenkeeper.io/)

This is a fork and alternative implementation of
the [rest.bitcoin.com](https://github.com/Bitcoin-com/rest.bitcoin.com) repository.
The function of this code is to create a REST API server to provide a common
interface for working with a BCH full node and various indexers.

This repository is intended to be paired with my alternative implementation
of [BITBOX SDK](https://github.com/Bitcoin-com/bitbox-sdk):
[BITBOX JS](https://github.com/christroutner/bitbox-js).

Here is a YouTube video explaining the use of BITBOX and this REST API:

https://www.youtube.com/watch?v=o0FfW5rZPFs

Since this repo is being worked on by one person, as a hobby, updates will be
slow. But the road map I have planned is as follows:

- Replace the requirement for Insight API with Blockbook API for address and
utxo based calls.

- Remove rate limiting

- Setup automated dependency management through Greenkeeper, and automated
continuous-release with semantic versioning through Semantic Release.

- Ensure all unit and integration tests are passing.

- Update SLP token endpoints. Not totally sure of the scope here.

- Add end-to-end tests.

## Features
The following features have been implemented:

- Typescript removed and ES8 JavaScript used instead.
- npm audit run on all depedencies.

----

## REST

[rest.bitcoin.com](https://rest.bitcoin.com) is the REST layer for Bitcoin.com's Cloud.

More info: [developer.bitcoin.com](https://developer.bitcoin.com). Chatroom [http://geni.us/CashDev](geni.us/CashDev)

Testnet available at [trest.bitcoin.com](https://trest.bitcoin.com)

## Usage

You can also run an instance of REST for your own full node.

### Prerequisites

#### NodeJS

Install nodejs's LTS. 8.11.4 at the time of writing.

https://nodejs.org/en/

#### build-essential package

If you encounter

```
gyp ERR! build error
gyp ERR! stack Error: not found: make
```

For Ubuntu

```
sudo apt-get install build-essential
```

For CENTOS

```
RUN yum install -y make gcc*
```

### Full node

Fire up a full Bitcoin Cash node and add the following to your `bitcoin.conf`.

```
# Accept command line and JSON-RPC commands.
server=1

# Username for JSON-RPC connections
rpcuser=rpcUsername

# Password for JSON-RPC connections
rpcpassword=rpcPasssword

# If you're running REST on a different host than bitcoind's localhost
# rpcallowip=*
# Or you can restrict by IP or range of IPs
# rpcallowip=192.168.1.*

# Enable zeromq for real-time data
zmqpubrawtx=tcp://your.nodes.ip.address:28332
zmqpubrawblock=tcp://your.nodes.ip.address:28332
zmqpubhashtx=tcp://your.nodes.ip.address:28332
zmqpubhashblock=tcp://your.nodes.ip.address:28332
```

Also allow tcp requests on port `28332`

```
sudo ufw allow 28332
```

### Clone the repo

Next clone the rest.bitcoin.com repo.

```
git clone https://github.com/Bitcoin-com/rest.bitcoin.com.git
```

#### Install dependencies

`cd` into the newly cloned directory and install the dependencies.

```
cd rest.bitcoin.com
npm install
```

#### Build REST

```bash
npm run build
```

#### Start REST

Now you need to start REST and pass in the following environment variables

- BITCOINCOM_BASEURL - On rest.bitcoin.com this env var is to our internal insight API. You can use insight's public API.
- RPC_BASEURL - The IP address of your full BCH node
- RPC_PASSWORD - The rpc password of your full BCH node
- RPC_USERNAME - The rpc username of your full BCH node
- ZEROMQ_PORT - The port on which you enabled ZeroMQ
- ZEROMQ_URL - The IP address of your full BCH node
- NETWORK - mainnet or testnet depending on which network you're using
- BITDB_URL - mainnet or testnet BITDB URL
- SLPDB_URL - mainnet or testnet SLPDB URL
- RATE_LIMIT_MAX_REQUESTS (optional) - Rate limit per route per minute. Defaults to 60. Set to 0 to disable rate limit.
- NON_JS_FRAMEWORK (optional) - enables endpoints to create, mint, send, burn and burnAll SLP tokens

Here's how the final command would look

```
BITCOINCOM_BASEURL=https://bch-insight.bitpay.com/api/ RPC_BASEURL=http://your.nodes.ip.address:8332/ RPC_PASSWORD=rpcPasssword RPC_USERNAME=rpcUsername ZEROMQ_PORT=28332 ZEROMQ_URL=your.nodes.ip.address BITDB_URL=https://bitdb.bitcoin.com/ SLPDB_URL=https://slpdb.bitcoin.com/ NETWORK=mainnet npm run dev
```

Starting in the regtest mode (partly working since the bitcoincom_baseurl does not work with local nodes):

```bash
PORT=3000 BITCOINCOM_BASEURL=http://localhost:3000/api/ RPC_BASEURL=http://localhost:18332/ RPC_PASSWORD=regtest RPC_USERNAME=regtest ZEROMQ_PORT=0 ZEROMQ_URL=0 NETWORK=local npm start
```

#### View in browser

Finally open `http://localhost:3000/` and confirm you see the GUI
