import demjson3 as demjson
chainInfoObj = '''{
	"4": {
		"id": 4,
		"name": "Rinkeby",
		"isTestNetwork": true,
		"icon": "/chain_assets/eth.svg",
		"wallets": [
			"injected",
			"walletConnect"
		],
		"explorer": {
			"address": "https://rinkeby.etherscan.io/address/{{address}}",
			"transactionHash": "https://rinkeby.etherscan.io/tx/{{tx}}"
		},
		"supportedCurrencies": {
			"0xc7ad46e0b8a400bb3c915120d284aafba8fc4735": {
				"icon": "/chain_assets/dai.svg",
				"label": "DAI",
				"address": "0xc7ad46e0b8a400bb3c915120d284aafba8fc4735",
				"pair": "0xa478c2975ab1ea89e8196811f51a7b7ade33eb11",
				"decimals": 18
			},
			"0xc778417e063141139fce010982780140aa0cd5ab": {
				"icon": "/chain_assets/weth.svg",
				"label": "WETH",
				"address": "0xc778417e063141139fce010982780140aa0cd5ab",
				"pair": "0x0",
				"decimals": 18
			},
			"0xeb8f08a975ab53e34d8a0330e0d34de942c95926": {
				"icon": "/chain_assets/usdc.svg",
				"label": "USDC",
				"address": "0xeb8f08a975ab53e34d8a0330e0d34de942c95926",
				"pair": "0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc",
				"decimals": 6
			}
		},
		"qbContracts": {
			"applications": "0x3f718a42d1E7EDE928b81A72eE9eF3d63607d999",
			"workspace": "0x85d6F1C1129778e87eD3671E332AA364d0beb5D1",
			"grantFactory": "0xB6E5b2faBe68B7212d1c25f44480a4B75812B901",
			"reviews": "0xfbFeEc614A6468BF29888B1591D6bb2fde223Ae5"
		},
		"subgraphClientUrl": "https://the-graph.questbook.app/subgraphs/name/qb-subgraph-rinkeby",
		"rpcUrls": [
			"https://rinkeby.infura.io/v3/"
		],
		"nativeCurrency": {
			"name": "Rinkeby ETH",
			"symbol": "ETH",
			"decimals": 18
		}
	},
	"10": {
		"id": 10,
		"name": "Optimism Mainnet",
		"isTestNetwork": false,
		"icon": "/chain_assets/eth.svg",
		"wallets": [
			"injected",
			"walletConnect"
		],
		"explorer": {
			"address": "https://optimistic.etherscan.io/address/{{address}}/",
			"transactionHash": "https://optimistic.etherscan.io/tx/{{tx}}/"
		},
		"supportedCurrencies": {
			"0xda10009cbd5d07dd0cecc66161fc93d7c9000da1": {
				"icon": "/chain_assets/dai.svg",
				"label": "DAI",
				"address": "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1",
				"pair": "0xa478c2975ab1ea89e8196811f51a7b7ade33eb11",
				"decimals": 18
			},
			"0x4200000000000000000000000000000000000006": {
				"icon": "/chain_assets/weth.svg",
				"label": "WETH",
				"address": "0x4200000000000000000000000000000000000006",
				"pair": "0x0",
				"decimals": 18
			},
			"0x7f5c764cbc14f9669b88837ca1490cca17c31607": {
				"icon": "/chain_assets/usdc.svg",
				"label": "USDC",
				"address": "0x7f5c764cbc14f9669b88837ca1490cca17c31607",
				"pair": "0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc",
				"decimals": 6
			},
			"0x9e1028f5f1d5ede59748ffcee5532509976840e0": {
				"icon": "/chain_assets/perp.svg",
				"label": "PERP",
				"address": "0x9e1028f5f1d5ede59748ffcee5532509976840e0",
				"pair": "0xf66369997ae562bc9eec2ab9541581252f9ca383",
				"decimals": 18
			},
			"0x8700daec35af8ff88c16bdf0418774cb3d7599b4": {
				"icon": "/chain_assets/snx.svg",
				"label": "SNX",
				"address": "0x8700daec35af8ff88c16bdf0418774cb3d7599b4",
				"pair": "0x43ae24960e5534731fc831386c07755a2dc33d47",
				"decimals": 18
			},
			"0x8c6f28f2f1a3c87f0f938b96d27520d9751ec8d9": {
				"icon": "/chain_assets/sUSD.svg",
				"label": "sUSD",
				"address": "0x8c6f28f2f1a3c87f0f938b96d27520d9751ec8d9",
				"pair": "0xf80758ab42c3b07da84053fd88804bcb6baa4b5c",
				"decimals": 18
			}
		},
		"qbContracts": {
			"workspace": "0x2dB223158288B2299480aF577eDF30D5a533F137",
			"applications": "0xF4Db8BdDF1029764e4E09e7cE34149371a9A7027",
			"grantFactory": "0xf08bCcf3C9DE7Daf25BCe13C87D0dd69754E0a33",
			"reviews": "0xab163375C1aD08e24005771cC9908a1C7c61Adaa"
		},
		"subgraphClientUrl": "https://the-graph.questbook.app/subgraphs/name/qb-subgraph-optimism-mainnet",
		"rpcUrls": [
			"https://optimism-mainnet.infura.io/v3/"
		],
		"nativeCurrency": {
			"name": "Optimistic Ethereum",
			"symbol": "ETH",
			"decimals": 18
		}
	},
	"40": {
		"id": 40,
		"name": "Telos Mainnet",
		"isTestNetwork": false,
		"icon": "/chain_assets/telos.svg",
		"wallets": [
			"injected",
			"walletConnect"
		],
		"explorer": {
			"address": "https://www.teloscan.io/address/{{address}}/",
			"transactionHash": "https://www.teloscan.io/tx/{{tx}}/"
		},
		"supportedCurrencies": {
			"0x818ec0A7Fe18Ff94269904fCED6AE3DaE6d6dC0b": {
				"icon": "/chain_assets/usdc.svg",
				"label": "USDC",
				"address": "0x818ec0A7Fe18Ff94269904fCED6AE3DaE6d6dC0b",
				"pair": "0x0",
				"decimals": 6
			}
		},
		"qbContracts": {
			"applications": "0xcbE56313F2A7592d97caf909d6A8b8cD72e9Fbae",
			"workspace": "0x02bE08DeD04a6A7F7D4b5593cD303AC8Cef652DB",
			"grantFactory": "0x56A4a132e3Ab595F657F4B2c4A3e1484F38C32b6",
			"reviews": "0x4dF627729f8a79F3A8bCD42C069d15bC4777830A"
		},
		"subgraphClientUrl": "https://the-graph.questbook.app/subgraphs/name/qb-subgraph-telos-mainnet",
		"rpcUrls": [
			"https://mainnet.telos.net/evm"
		],
		"nativeCurrency": {
			"name": "Telos Mainnet",
			"symbol": "TLOS",
			"decimals": 18
		}
	},
	"41": {
		"id": 41,
		"name": "Telos Testnet",
		"isTestNetwork": true,
		"icon": "/chain_assets/telos.svg",
		"wallets": [
			"injected",
			"walletConnect"
		],
		"explorer": {
			"address": "https://testnet.teloscan.io/address/{{address}}/",
			"transactionHash": "https://testnet.teloscan.io/tx/{{tx}}/"
		},
		"supportedCurrencies": {
			"0x818ec0A7Fe18Ff94269904fCED6AE3DaE6d6dC0b": {
				"icon": "/chain_assets/usdc.svg",
				"label": "USDC",
				"address": "0x818ec0A7Fe18Ff94269904fCED6AE3DaE6d6dC0b",
				"pair": "0x0",
				"decimals": 6
			}
		},
		"qbContracts": {
			"applications": "0x0022B3FB492596C86CF114b460D9Bd6a9cf80Ba2",
			"workspace": "0x0c58ff1573c0c3F07B54D4dE0Ab19e047F4785FB",
			"grantFactory": "0xbD4c8Aea352851D2c043D31B07B155B7F14505AC",
			"reviews": "0xe99Be727911552f671e18f37C42d0d6961f07675"
		},
		"subgraphClientUrl": "https://the-graph.questbook.app/subgraphs/name/qb-subgraph-telos-testnet",
		"rpcUrls": [
			"https://testnet.telos.net/evm"
		],
		"nativeCurrency": {
			"name": "Telos Testnet",
			"symbol": "TLOS",
			"decimals": 18
		}
	},
	"42": {
		"id": 42,
		"name": "Kovan",
		"isTestNetwork": true,
		"icon": "/chain_assets/eth.svg",
		"wallets": [
			"injected",
			"walletConnect"
		],
		"explorer": {
			"address": "https://kovan.etherscan.io/address/{{address}}",
			"transactionHash": "https://kovan.etherscan.io/tx/{{tx}}"
		},
		"supportedCurrencies": {
			"0x04df6e4121c27713ed22341e7c7df330f56f289b": {
				"icon": "/chain_assets/dai.svg",
				"label": "DAI",
				"address": "0x04df6e4121c27713ed22341e7c7df330f56f289b",
				"pair": "0xa478c2975ab1ea89e8196811f51a7b7ade33eb11",
				"decimals": 18
			},
			"0xd0a1e359811322d97991e03f863a0c30c2cf029c": {
				"icon": "/chain_assets/weth.svg",
				"label": "WETH",
				"address": "0xd0a1e359811322d97991e03f863a0c30c2cf029c",
				"pair": "0x0",
				"decimals": 18
			},
			"0xe22da380ee6b445bb8273c81944adeb6e8450422": {
				"icon": "/chain_assets/usdc.svg",
				"label": "USDC",
				"address": "0xe22da380ee6b445bb8273c81944adeb6e8450422",
				"pair": "0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc",
				"decimals": 6
			}
		},
		"qbContracts": {
			"applications": "0x611a8740ed9B18d7C78e2286E651c4970eEC4AA1",
			"workspace": "0xA23FAe98239E5a8d5F1D2944725d06F2E79226EB",
			"grantFactory": "0xAeee48268A49508FB246E7D563f5b01Fd10f4758",
			"reviews": "0x2704726624bEeE50435aA5364820C61026B56214"
		},
		"subgraphClientUrl": "https://the-graph.questbook.app/subgraphs/name/qb-subgraph-kovan",
		"rpcUrls": [
			"https://kovan.infura.io/v3/"
		],
		"nativeCurrency": {
			"name": "Kovan",
			"symbol": "KOV",
			"decimals": 18
		}
	},
	"69": {
		"id": 69,
		"name": "Optimism Testnet",
		"isTestNetwork": true,
		"icon": "/chain_assets/eth.svg",
		"wallets": [
			"injected",
			"walletConnect"
		],
		"explorer": {
			"address": "https://optimistic.etherscan.io/address/{{address}}/",
			"transactionHash": "https://optimistic.etherscan.io/tx/{{tx}}/"
		},
		"supportedCurrencies": {
			"0xda10009cbd5d07dd0cecc66161fc93d7c9000da1": {
				"icon": "/chain_assets/dai.svg",
				"label": "DAI",
				"address": "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1",
				"pair": "0xa478c2975ab1ea89e8196811f51a7b7ade33eb11",
				"decimals": 18
			}
		},
		"qbContracts": {
			"workspace": "0x168A72b08FCFF48192E0B1A27486f4394a4F86e1",
			"applications": "0xC6b6356FBdcf6CC6EA4Cb90Cd11B7E3c5848F312",
			"grantFactory": "0xCc3367953734da16bC7740696617b62d80845C90",
			"reviews": "0x6178d7Ac94E045d39850Ef6f35cCD0D4851DAbeC"
		},
		"subgraphClientUrl": "https://the-graph.questbook.app/subgraphs/name/qb-subgraph-optimism-kovan",
		"rpcUrls": [
			"https://optimism-kovan.infura.io/v3/"
		],
		"nativeCurrency": {
			"name": "Optimism Kovan",
			"symbol": "KOR",
			"decimals": 18
		}
	},
	"137": {
		"id": 137,
		"name": "Polygon Mainnet",
		"isTestNetwork": false,
		"icon": "/chain_assets/matic.svg",
		"wallets": [
			"injected",
			"walletConnect"
		],
		"explorer": {
			"address": "https://polygonscan.com/address/{{address}}/",
			"transactionHash": "https://polygonscan.com/tx/{{tx}}/"
		},
		"supportedCurrencies": {
			"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063": {
				"icon": "/chain_assets/dai.svg",
				"label": "DAI",
				"address": "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
				"pair": "0xa478c2975ab1ea89e8196811f51a7b7ade33eb11",
				"decimals": 18
			},
			"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270": {
				"icon": "/chain_assets/matic.svg",
				"label": "WMATIC",
				"address": "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
				"pair": "0x819f3450da6f110ba6ea52195b3beafa246062de",
				"decimals": 18
			},
			"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619": {
				"icon": "/chain_assets/weth.svg",
				"label": "WETH",
				"address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
				"pair": "0x0",
				"decimals": 18
			},
			"0x2791bca1f2de4661ed88a30c99a7a9449aa84174": {
				"icon": "/chain_assets/usdc.svg",
				"label": "USDC",
				"address": "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
				"pair": "0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc",
				"decimals": 6
			},
			"0xd6df932a45c0f255f85145f286ea0b292b21c90b": {
				"icon": "/chain_assets/aave.svg",
				"label": "AAVE",
				"address": "0xd6df932a45c0f255f85145f286ea0b292b21c90b",
				"pair": "0xdfc14d2af169b0d36c4eff567ada9b2e0cae044f",
				"decimals": 18
			},
			"0x282d8efce846a88b159800bd4130ad77443fa1a1": {
				"icon": "/chain_assets/ocean.svg",
				"label": "OCEAN",
				"address": "0x282d8efce846a88b159800bd4130ad77443fa1a1",
				"pair": "0x9b7dad79fc16106b47a3dab791f389c167e15eb0",
				"decimals": 18
			},
			"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f": {
				"icon": "/chain_assets/inch.svg",
				"label": "1INCH",
				"address": "0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
				"pair": "0x26aad2da94c59524ac0d93f6d6cbf9071d7086f2",
				"decimals": 18
			},
			"0x91c89a94567980f0e9723b487b0bed586ee96aa7": {
				"icon": "/chain_assets/biconomy.svg",
				"label": "BICO",
				"address": "0x91c89a94567980f0e9723b487b0bed586ee96aa7",
				"decimals": 18
			},
			"0x6c0ab120dbd11ba701aff6748568311668f63fe0": {
				"icon": "/chain_assets/apwine.svg",
				"label": "APW",
				"address": "0x6c0ab120dbd11ba701aff6748568311668f63fe0",
				"decimals": 18
			},
			"0x236ba47c763a8ee1a8f064e867d0751b1714fdf8": {
				"icon": "/chain_assets/boba.svg",
				"label": "BOBA",
				"address": "0x236ba47c763a8ee1a8f064e867d0751b1714fdf8",
				"pair": "0xcc6c24c992059ced4a390b9d2f743645bfe1de49",
				"decimals": 18
			},
			"0xd10852df03ea8b8af0cc0b09cac3f7dbb15e0433": {
				"icon": "/chain_assets/flux.svg",
				"label": "FLUX",
				"address": "0xd10852df03ea8b8af0cc0b09cac3f7dbb15e0433",
				"pair": "0x27fa67302c513f5512bbfa5065800c2d7b3871f4",
				"decimals": 18
			},
			"0x3962f4a0a0051dcce0be73a7e09cef5756736712": {
				"icon": "/chain_assets/livepeer.svg",
				"label": "LPT",
				"address": "0x3962f4a0a0051dcce0be73a7e09cef5756736712",
				"decimals": 18
			},
			"0x62c4b802f2153a281dc87994427f606f561cc620": {
				"icon": "/chain_assets/spruce.svg",
				"label": "SPR",
				"address": "0x62c4b802f2153a281dc87994427f606f561cc620",
				"decimals": 18
			},
			"0x980111ae1b84e50222c8843e3a7a038f36fecd2b": {
				"icon": "/chain_assets/stackos.svg",
				"label": "STACK",
				"address": "0x980111ae1b84e50222c8843e3a7a038f36fecd2b",
				"pair": "0x635b58600509acfe70e0bd4c4935c08182774e58",
				"decimals": 18
			},
			"0x3066818837c5e6ed6601bd5a91b0762877a6b731": {
				"icon": "/chain_assets/uma.svg",
				"label": "UMA",
				"address": "0x3066818837c5e6ed6601bd5a91b0762877a6b731",
				"decimals": 18
			},
			"0xb33eaad8d922b1083446dc23f610c2567fb5180f": {
				"icon": "/chain_assets/uniswap.svg",
				"label": "UNI",
				"address": "0xb33eaad8d922b1083446dc23f610c2567fb5180f",
				"pair": "0xd3d2e2692501a5c9ca623199d38826e513033a17",
				"decimals": 18
			},
			"0xda537104d6a5edd53c6fbba9a898708e465260b6": {
				"icon": "/chain_assets/yearn.svg",
				"label": "YFI",
				"address": "0xda537104d6a5edd53c6fbba9a898708e465260b6",
				"pair": "0x2fdbadf3c4d5a8666bc06645b8358ab803996e28",
				"decimals": 18
			},
			"0x9a06db14d639796b25a6cec6a1bf614fd98815ec": {
				"icon": "/chain_assets/zkp.svg",
				"label": "ZKP",
				"address": "0x9a06db14d639796b25a6cec6a1bf614fd98815ec",
				"decimals": 18
			},
			"0xf7e78d9c4c74df889a83c8c8d6d05bf70ff75876": {
				"icon": "/chain_assets/unlock.svg",
				"label": "UDT",
				"address": "0xf7e78d9c4c74df889a83c8c8d6d05bf70ff75876",
				"pair": "0x0",
				"decimals": 18
			}
		},
		"qbContracts": {
			"workspace": "0x168A72b08FCFF48192E0B1A27486f4394a4F86e1",
			"applications": "0xE9d6c045232b7f4C07C151f368E747EBE46209E4",
			"grantFactory": "0xC6b6356FBdcf6CC6EA4Cb90Cd11B7E3c5848F312",
			"reviews": "0xdC5EbC9130a2e7Ad776E3503fa6Dcf16D80ca915"
		},
		"subgraphClientUrl": "https://the-graph.questbook.app/subgraphs/name/qb-subgraph-polygon-mainnet",
		"rpcUrls": [
			"https://polygon-mainnet.infura.io/v3/",
			"https://polygon-mainnet.g.alchemy.com/v2/"
		],
		"nativeCurrency": {
			"name": "Polygon Mainnet",
			"symbol": "MATIC",
			"decimals": 18
		}
	},
	"1001": {
		"id": 1001,
		"name": "Klaytn Testnet",
		"isTestNetwork": true,
		"icon": "/chain_assets/klay.svg",
		"wallets": [
			"injected",
			"walletConnect"
		],
		"explorer": {
			"address": "https://baobab.scope.klaytn.com/account/{{address}}",
			"transactionHash": "https://baobab.scope.klaytn.com/tx/{{tx}}"
		},
		"supportedCurrencies": {
			"0x9330dd6713c8328a8d82b14e3f60a0f0b4cc7bfb": {
				"icon": "/chain_assets/klay.svg",
				"label": "KLAY",
				"address": "0x9330dd6713c8328a8d82b14e3f60a0f0b4cc7bfb",
				"decimals": 18
			}
		},
		"qbContracts": {
			"applications": "0xCF6247753d0cf5CB2FEe2F291cCCfd2e9d63C8b2",
			"workspace": "0x4F17f6b38f9115Bd1464253C21Ce4ec1EE2a161F",
			"grantFactory": "0xf1d57f0997A3EBdD286C686d9781eE57800d3792",
			"reviews": "0x55acDb12EAf85976b31581072C9d58Be5b3D0378"
		},
		"subgraphClientUrl": "https://the-graph.questbook.app/subgraphs/name/qb-subgraph-klaytn-testnet",
		"rpcUrls": [
			"https://api.baobab.klaytn.net:8651"
		],
		"nativeCurrency": {
			"name": "Klaytn Testnet",
			"symbol": "KLAY",
			"decimals": 18
		}
	},
	"1287": {
		"id": 1287,
		"name": "Moonbase Alpha",
		"isTestNetwork": true,
		"icon": "/chain_assets/eth.svg",
		"wallets": [
			"injected",
			"walletConnect"
		],
		"explorer": {
			"address": "https://moonbase.moonscan.io/address/{{address}}",
			"transactionHash": "https://moonbase.moonscan.io/tx/{{tx}}"
		},
		"supportedCurrencies": {
			"0x3a9c9484e0e82596fb4c2e7fec97106c4c2310fa": {
				"icon": "/chain_assets/eth.svg",
				"label": "ELP",
				"address": "0x3a9c9484e0e82596fb4c2e7fec97106c4c2310fa",
				"pair": "0x0",
				"decimals": 18
			},
			"0xed13b028697febd70f34cf9a9e280a8f1e98fd29": {
				"icon": "/chain_assets/eth.svg",
				"label": "NEPT",
				"address": "0xed13b028697febd70f34cf9a9e280a8f1e98fd29",
				"pair": "0x0",
				"decimals": 18
			}
		},
		"qbContracts": {
			"applications": "0xF4Db8BdDF1029764e4E09e7cE34149371a9A7027",
			"workspace": "0x2dB223158288B2299480aF577eDF30D5a533F137",
			"grantFactory": "0xf08bCcf3C9DE7Daf25BCe13C87D0dd69754E0a33",
			"reviews": "0xab163375C1aD08e24005771cC9908a1C7c61Adaa"
		},
		"subgraphClientUrl": "https://the-graph.questbook.app/subgraphs/name/qb-subgraph-moonbase-alpha",
		"rpcUrls": [
			"https://rpc.api.moonbase.moonbeam.network"
		],
		"nativeCurrency": {
			"name": "DEV",
			"symbol": "DEV",
			"decimals": 18
		}
	},
	"2153": {
		"id": 2153,
		"name": "Findora Testnet",
		"isTestNetwork": true,
		"icon": "/chain_assets/findora.svg",
		"wallets": [
			"injected",
			"walletConnect"
		],
		"explorer": {
			"address": "https://testnet-anvil.evm.findorascan.io/address/{{address}}",
			"transactionHash": "https://testnet-anvil.evm.findorascan.io/tx/{{tx}}"
		},
		"supportedCurrencies": {
			"0x0000000000000000000000000000000000001000": {
				"icon": "/chain_assets/findora.svg",
				"label": "FRA",
				"address": "0x0000000000000000000000000000000000001000",
				"decimals": 18
			}
		},
		"qbContracts": {
			"applications": "0x5f12ad812bE963A2d73BeAB23ecdc6fc02d9ce45",
			"workspace": "0xBbc87cE003542c25E70b1A63d4F00Fac99733590",
			"grantFactory": "0x96d854825678CD02A8eEA22a53Ee6DC6D1aE9722",
			"reviews": "0x8ee0b5412441d85c2BF32b83d24886B2B2D686c2"
		},
		"subgraphClientUrl": "https://the-graph.questbook.app/subgraphs/name/qb-subgraph-findora-testnet",
		"rpcUrls": [
			"https://ev2awpyss5.execute-api.ap-south-1.amazonaws.com/v0/findora"
		],
		"nativeCurrency": {
			"name": "Findora",
			"symbol": "FRA",
			"decimals": 18
		}
	},
	"8217": {
		"id": 8217,
		"name": "Klaytn Mainnet",
		"isTestNetwork": false,
		"icon": "/chain_assets/klay.svg",
		"wallets": [
			"injected",
			"walletConnect"
		],
		"explorer": {
			"address": "https://scope.klaytn.com/account/{{address}}",
			"transactionHash": "https://scope.klaytn.com/tx/{{tx}}"
		},
		"supportedCurrencies": {
			"0xe4f05a66ec68b54a58b17c22107b02e0232cc817": {
				"icon": "/chain_assets/klay.svg",
				"label": "WKLAY",
				"address": "0xe4f05a66ec68b54a58b17c22107b02e0232cc817",
				"decimals": 18
			}
		},
		"qbContracts": {
			"applications": "0x2d49a247AA77cA433218C9567953645bE04A7b3A",
			"workspace": "0xda717ab1206c59493e1E5c66F4e0712B39EC6D81",
			"grantFactory": "0x32798CC9da06363eF2b0eE12e54cD4476D9C891a",
			"reviews": "0x6Cb5Ee567592eD1fBdA48413a1F95e848d289D34"
		},
		"subgraphClientUrl": "https://the-graph.questbook.app/subgraphs/name/qb-subgraph-klaytn-mainnet",
		"rpcUrls": [
			"https://public-node-api.klaytnapi.com/v1/cypress"
		],
		"nativeCurrency": {
			"name": "Klaytn Mainnet",
			"symbol": "KLAY",
			"decimals": 18
		}
	},
	"9000": {
		"id": 9000,
		"name": "Evmos Testnet",
		"isTestNetwork": true,
		"icon": "/chain_assets/eth.svg",
		"wallets": [
			"injected",
			"walletConnect"
		],
		"explorer": {
			"address": "https://evm.evmos.dev/address/{{address}}",
			"transactionHash": "https://evm.evmos.dev/tx/{{tx}}"
		},
		"supportedCurrencies": {
			"0xae95d4890bf4471501e0066b6c6244e1caaee791": {
				"icon": "/chain_assets/usdc.svg",
				"label": "USDC",
				"address": "0xae95d4890bf4471501e0066b6c6244e1caaee791",
				"pair": "0x0",
				"decimals": 6
			}
		},
		"qbContracts": {
			"applications": "0xF4Db8BdDF1029764e4E09e7cE34149371a9A7027",
			"workspace": "0x2dB223158288B2299480aF577eDF30D5a533F137",
			"grantFactory": "0xf08bCcf3C9DE7Daf25BCe13C87D0dd69754E0a33",
			"reviews": "0xab163375C1aD08e24005771cC9908a1C7c61Adaa"
		},
		"subgraphClientUrl": "https://the-graph.questbook.app/subgraphs/name/qb-subgraph-evmos-testnet",
		"rpcUrls": [
			"https://41d67fdgs4.execute-api.ap-south-1.amazonaws.com/v0/evmos"
		],
		"nativeCurrency": {
			"name": "Test EVMOS",
			"symbol": "tEVMOS",
			"decimals": 18
		}
	},
	"42220": {
		"id": 42220,
		"name": "Celo Mainnet",
		"isTestNetwork": false,
		"icon": "/chain_assets/celo.svg",
		"wallets": [
			"injected",
			"walletConnect"
		],
		"explorer": {
			"address": "https://celoscan.xyz/address/{{address}}",
			"transactionHash": "https://celoscan.xyz/tx/{{tx}}"
		},
		"supportedCurrencies": {
			"0x471ece3750da237f93b8e339c536989b8978a438": {
				"icon": "/chain_assets/celo_token.svg",
				"label": "CELO",
				"address": "0x471ece3750da237f93b8e339c536989b8978a438",
				"decimals": 18
			},
			"0x765de816845861e75a25fca122bb6898b8b1282a": {
				"icon": "/chain_assets/cusd.svg",
				"label": "cUSD",
				"address": "0x765de816845861e75a25fca122bb6898b8b1282a",
				"decimals": 18
			}
		},
		"qbContracts": {
			"applications": "0x32798CC9da06363eF2b0eE12e54cD4476D9C891a",
			"workspace": "0x6D0f81BDA11995f25921aAd5B43359630E65Ca96",
			"grantFactory": "0xda717ab1206c59493e1E5c66F4e0712B39EC6D81",
			"reviews": "0x2d49a247AA77cA433218C9567953645bE04A7b3A"
		},
		"subgraphClientUrl": "https://the-graph.questbook.app/subgraphs/name/qb-subgraph-celo-mainnet",
		"rpcUrls": [
			"https://forno.celo.org"
		],
		"nativeCurrency": {
			"name": "celo",
			"symbol": "CELO",
			"decimals": 18
		}
	},
	"44787": {
		"id": 44787,
		"name": "Celo Testnet",
		"isTestNetwork": true,
		"icon": "/chain_assets/celo.svg",
		"wallets": [
			"injected",
			"walletConnect"
		],
		"explorer": {
			"address": "https://alfajores-blockscout.celo-testnet.org/address/{{address}}",
			"transactionHash": "https://alfajores-blockscout.celo-testnet.org/tx/{{tx}}"
		},
		"supportedCurrencies": {
			"0x7d91e51c8f218f7140188a155f5c75388630b6a8": {
				"icon": "/chain_assets/dai.svg",
				"label": "DAI",
				"address": "0x7d91e51c8f218f7140188a155f5c75388630b6a8",
				"pair": "0xa478c2975ab1ea89e8196811f51a7b7ade33eb11",
				"decimals": 18
			},
			"0xf194afdf50b03e69bd7d057c1aa9e10c9954e4c9": {
				"icon": "/chain_assets/celo_token.svg",
				"label": "CELO",
				"address": "0xf194afdf50b03e69bd7d057c1aa9e10c9954e4c9",
				"decimals": 18
			},
			"0x874069fa1eb16d44d622f2e0ca25eea172369bc1": {
				"icon": "/chain_assets/cusd.svg",
				"label": "cUSD",
				"address": "0x874069fa1eb16d44d622f2e0ca25eea172369bc1",
				"decimals": 18
			}
		},
		"qbContracts": {
			"workspace": "0xF39E0AA8cA215D41dF7c9AeB3aBa76FfdAd0951F",
			"applications": "0xE9d6c045232b7f4C07C151f368E747EBE46209E4",
			"grantFactory": "0xCc3367953734da16bC7740696617b62d80845C90",
			"reviews": "0x6Cb5Ee567592eD1fBdA48413a1F95e848d289D34"
		},
		"subgraphClientUrl": "https://the-graph.questbook.app/subgraphs/name/qb-subgraph-celo-alfajores-testnet",
		"rpcUrls": [
			"https://alfajores-forno.celo-testnet.org"
		],
		"nativeCurrency": {
			"name": "Celo Alfajores Testnet",
			"symbol": "CELO",
			"decimals": 18
		}
	},
	"80001": {
		"id": 80001,
		"name": "Polygon Testnet",
		"isTestNetwork": true,
		"icon": "/chain_assets/matic.svg",
		"wallets": [
			"injected",
			"walletConnect"
		],
		"explorer": {
			"address": "https://mumbai.polygonscan.com/address/{{address}}/",
			"transactionHash": "https://mumbai.polygonscan.com/tx/{{tx}}/"
		},
		"supportedCurrencies": {
			"0x9c3c9283d3e44854697cd22d3faa240cfb032889": {
				"icon": "/chain_assets/matic.svg",
				"label": "WMATIC",
				"address": "0x9c3c9283d3e44854697cd22d3faa240cfb032889",
				"pair": "0x819f3450da6f110ba6ea52195b3beafa246062de",
				"decimals": 18
			},
			"0xe6b8a5cf854791412c1f6efc7caf629f5df1c747": {
				"icon": "/chain_assets/usdc.svg",
				"label": "USDC",
				"address": "0xe6b8a5cf854791412c1f6efc7caf629f5df1c747",
				"pair": "0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc",
				"decimals": 6
			}
		},
		"qbContracts": {
			"applications": "0x261ec50d06A2E1812bCa92a76ad98f41D7bD641A",
			"workspace": "0xDE5DaE7a56972589f6c1D80cf3b2eE9aAa8303cF",
			"grantFactory": "0x02961f1ba548B58A1Ffe3B381cda7CAdfC70f422",
			"reviews": "0x03EC09846a59e1Cdd89aadAAb728B4611CcFDe78"
		},
		"subgraphClientUrl": "https://the-graph.questbook.app/subgraphs/name/qb-subgraph-polygon-mumbai",
		"rpcUrls": [
			"https://polygon-mumbai.infura.io/v3/"
		],
		"nativeCurrency": {
			"name": "Polygon Testnet",
			"symbol": "MATIC",
			"decimals": 18
		}
	},
	"245022926": {
		"id": 245022926,
		"name": "Neon Devnet",
		"isTestNetwork": true,
		"icon": "/chain_assets/neon.svg",
		"wallets": [
			"injected",
			"walletConnect"
		],
		"explorer": {
			"address": "https://neonscan.org/address/{{address}}/",
			"transactionHash": "https://neonscan.org/tx/{{tx}}/"
		},
		"supportedCurrencies": {
			"0x7ad98aeadbbcdf3693b0b53c09da4033704c9322": {
				"icon": "/chain_assets/dai.svg",
				"label": "DAI",
				"address": "0x7ad98aeadbbcdf3693b0b53c09da4033704c9322",
				"pair": "0xa478c2975ab1ea89e8196811f51a7b7ade33eb11",
				"decimals": 9
			},
			"0xf8ad328e98f85fccbf09e43b16dcbbda7e84beab": {
				"icon": "/chain_assets/neon.svg",
				"label": "WNEON",
				"address": "0xf8ad328e98f85fccbf09e43b16dcbbda7e84beab",
				"decimals": 18
			},
			"0x2578c6c1ac883443388edd688ca10e87d088bfa8": {
				"icon": "/chain_assets/usdc.svg",
				"label": "USDC",
				"address": "0x2578c6c1ac883443388edd688ca10e87d088bfa8",
				"pair": "0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc",
				"decimals": 6
			}
		},
		"qbContracts": {
			"workspace": "0x6D0f81BDA11995f25921aAd5B43359630E65Ca96",
			"applications": "0x32798CC9da06363eF2b0eE12e54cD4476D9C891a",
			"grantFactory": "0xda717ab1206c59493e1E5c66F4e0712B39EC6D81",
			"reviews": "0x2d49a247AA77cA433218C9567953645bE04A7b3A"
		},
		"subgraphClientUrl": "https://the-graph.questbook.app/subgraphs/name/qb-subgraph-neon-devnet",
		"rpcUrls": [
			"http://neon-devnet-rpc.questbook.app:9090/solana"
		],
		"nativeCurrency": {
			"name": "Neon Devnet",
			"symbol": "NEON",
			"decimals": 18
		}
	},
	"1313161555": {
		"id": 1313161555,
		"name": "Aurora Testnet",
		"isTestNetwork": true,
		"icon": "/chain_assets/eth.svg",
		"wallets": [
			"injected",
			"walletConnect"
		],
		"explorer": {
			"address": "https://testnet.aurorascan.dev/address/{{address}}",
			"transactionHash": "https://testnet.aurorascan.dev/tx/{{tx}}"
		},
		"supportedCurrencies": {
			"0x9e70345a1b3d2d55fb29be4adbd2a6e38ee57d83": {
				"icon": "/chain_assets/weth.svg",
				"label": "WETH",
				"address": "0x9e70345a1b3d2d55fb29be4adbd2a6e38ee57d83",
				"pair": "0x0",
				"decimals": 18
			},
			"0xaab34177b4b5ca686d3ee1ce705133cb3554b183": {
				"icon": "/chain_assets/usdc.svg",
				"label": "USDC",
				"address": "0xaab34177b4b5ca686d3ee1ce705133cb3554b183",
				"pair": "0x0",
				"decimals": 6
			}
		},
		"qbContracts": {
			"applications": "0xC6b6356FBdcf6CC6EA4Cb90Cd11B7E3c5848F312",
			"workspace": "0x168A72b08FCFF48192E0B1A27486f4394a4F86e1",
			"grantFactory": "0xCc3367953734da16bC7740696617b62d80845C90",
			"reviews": "0x6178d7Ac94E045d39850Ef6f35cCD0D4851DAbeC"
		},
		"subgraphClientUrl": "https://the-graph.questbook.app/subgraphs/name/qb-subgraph-aurora-testnet",
		"rpcUrls": [
			"https://testnet.aurora.dev/"
		],
		"nativeCurrency": {
			"name": "Aurora ETH",
			"symbol": "ETH",
			"decimals": 18
		}
	},
	"1666600000": {
		"id": 1666600000,
		"name": "Harmony Mainnet",
		"isTestNetwork": false,
		"icon": "/chain_assets/harmony.svg",
		"wallets": [
			"injected",
			"walletConnect"
		],
		"explorer": {
			"address": "https://explorer.harmony.one/address/{{address}}/",
			"transactionHash": "https://explorer.harmony.one/tx/{{tx}}/"
		},
		"supportedCurrencies": {
			"0x985458e523db3d53125813ed68c274899e9dfab4": {
				"icon": "/chain_assets/usdc.svg",
				"label": "USDC",
				"address": "0x985458e523db3d53125813ed68c274899e9dfab4",
				"pair": "0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc",
				"decimals": 6
			}
		},
		"qbContracts": {
			"applications": "0x32798CC9da06363eF2b0eE12e54cD4476D9C891a",
			"workspace": "0x6D0f81BDA11995f25921aAd5B43359630E65Ca96",
			"grantFactory": "0xda717ab1206c59493e1E5c66F4e0712B39EC6D81",
			"reviews": "0x2d49a247AA77cA433218C9567953645bE04A7b3A"
		},
		"subgraphClientUrl": "https://the-graph.questbook.app/subgraphs/name/qb-subgraph-harmony-mainnet",
		"rpcUrls": [
			"https://api.harmony.one"
		],
		"nativeCurrency": {
			"name": "Harmony Mainnet",
			"symbol": "ONE",
			"decimals": 18
		}
	},
	"1666700000": {
		"id": 1666700000,
		"name": "Harmony Testnet ONE",
		"isTestNetwork": true,
		"icon": "/chain_assets/harmony.svg",
		"wallets": [
			"injected",
			"walletConnect"
		],
		"explorer": {
			"address": "https://explorer.pops.one/address/{{address}}/",
			"transactionHash": "https://explorer.pops.one/tx/{{tx}}/"
		},
		"supportedCurrencies": {
			"0x778fbd9df477b888534ebd84a3d2c9d5347bf149": {
				"icon": "/chain_assets/usdc.svg",
				"label": "USDC",
				"address": "0x778fbd9df477b888534ebd84a3d2c9d5347bf149",
				"pair": "0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc",
				"decimals": 6
			},
			"0xc27255d7805fc79e4616d5cd50d6f4464aea75a3": {
				"icon": "/chain_assets/dai.svg",
				"label": "1DAI",
				"address": "0xc27255d7805fc79e4616d5cd50d6f4464aea75a3",
				"pair": "0xa478c2975ab1ea89e8196811f51a7b7ade33eb11",
				"decimals": 18
			},
			"0x1e120b3b4af96e7f394ecaf84375b1c661830013": {
				"icon": "/chain_assets/weth.svg",
				"label": "1ETH",
				"address": "0x1e120b3b4af96e7f394ecaf84375b1c661830013",
				"pair": "0x0",
				"decimals": 18
			}
		},
		"qbContracts": {
			"workspace": "0x6D0f81BDA11995f25921aAd5B43359630E65Ca96",
			"applications": "0x32798CC9da06363eF2b0eE12e54cD4476D9C891a",
			"grantFactory": "0xda717ab1206c59493e1E5c66F4e0712B39EC6D81",
			"reviews": "0x2d49a247AA77cA433218C9567953645bE04A7b3A"
		},
		"subgraphClientUrl": "https://the-graph.questbook.app/subgraphs/name/qb-subgraph-harmony-testnet",
		"rpcUrls": [
			"https://api.s0.pops.one"
		],
		"nativeCurrency": {
			"name": "Harmony Testnet",
			"symbol": "ONE",
			"decimals": 18
		}
	}
}'''

chainInfo = demjson.decode(chainInfoObj)

s = ''
for c in chainInfo.values():
  s = s + '{' +  'chainId: {0}, endpoint: \'{1}\''.format(c['id'], c['subgraphClientUrl']) + '},'

print(s)