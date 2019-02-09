# car-auction-network

## Requirements
### 1. Tools
  * git
  * node 8.9.x and npm
  * python 2.7.x
  * docker and docker compose
 
### 2. npm packages

 You should not use ```npm install``` with ```sudo``` it results in permission errors in later stages.
 Better option use ```nvm``` to manage node.
 To install ```nvm``` [use this](https://github.com/creationix/nvm#installation).
 
 Now install following: 
  
  #### composer-cli
  ```shell
  npm install -g composer-cli
  ```
  #### composer-playground
  ```shell
  npm install -g composer-playground
  ```
  #### yo generator-hyperledger-composer
  ```shell
  npm install -g yo generator-hyperledger-composer
  ```
  #### composer-rest-server
  ```shell
  npm install -g composer-rest-server
  ```
  
### 3. Hyperledger fabric (local)
To install fabric locally run following one by one: 

``` shell
mkdir ~/fabric-dev-servers
cd ~/fabric-dev-servers
curl -O https://raw.githubusercontent.com/hyperledger/composer-tools/master/packages/fabric-dev-servers/fabric-dev-servers.tar.gz
tar -xvf fabric-dev-servers.tar.gz
export FABRIC_VERSION=hlfv12
./downloadFabric.sh
./startFabric.sh
./createPeerAdminCard.sh
```

## To run 
To generate BNA from model files run this from directory where model file are stored
```
composer archive create --sourceType dir --sourceName . 
```
Install .bna on fabric using
``` shell
composer network install --archiveFile car-auction-network@0.0.1.bna --card PeerAdmin@hlfv1
```
Deploy
``` shell
composer network start --networkName car-auction-network --networkVersion 0.0.1 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file admin@car-auctin-network
```
Interact with network by running  ```composer-playground``` command.



# References
* [Hyperleger Fabric](https://hyperledger-fabric.readthedocs.io/en/release-1.3/whatis.html)

* [Hyperleger Composer](https://hyperledger.github.io/composer/v0.19/introduction/introduction)

* [What is blockchain technology?](https://blockgeeks.com/guides/what-is-blockchain-technology/)
