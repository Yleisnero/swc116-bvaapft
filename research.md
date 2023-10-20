# Research

# About block.number

Is using `block.number` still an issue with etherium switching to
proof-of-stake?

Deep dive:
## Beacon Chain

The Beacon Chain is a "system" chain which runs the consensus layer. I.e. it
manages the validators.

Check this out for more infos:
* https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md

## Consensus clients:
There are multiple consensus clients available 
* https://ethereum.org/en/developers/docs/nodes-and-clients/#consensus-clients

## Prysm (Consensus Client)

Prysm is the most used consensus client (33% of the network)
* https://github.com/prysmaticlabs/prysm


## When is a new block created?

At each slot a validator is slected to propose a new block. The number of
seconds each slot has is hardcoded (12 seconds). Can be found here:
* https://github.com/ethereum/consensus-specs/blob/dev/configs/mainnet.yaml

Can this change? Will this change? It may be different per net (mainnet /
testnet). But idk if it will ever change on the mainnet? 

"a bundle of configuration variables which are expected to differ between
different modes of operation, e.g. testing, but not generally between different
networks" (source beacon-chain.md)

