var controlABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "AlterData",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "AlterUser",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "freeId",
				"type": "uint256"
			}
		],
		"name": "FreeApproved",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "freeId",
				"type": "uint256"
			}
		],
		"name": "FreeDenied",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "userId",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "dataId",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "msgId",
				"type": "uint256"
			}
		],
		"name": "FreeRequest",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "dataId",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "dataName",
				"type": "string"
			}
		],
		"name": "NewData",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "userId",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "userName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "NewUser",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "userId",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "dataId",
				"type": "uint8"
			}
		],
		"name": "RequestApproved",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "_dataId",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "_credit",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_address",
				"type": "string"
			},
			{
				"internalType": "uint8[]",
				"name": "_not",
				"type": "uint8[]"
			}
		],
		"name": "alterData",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "_userId",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_pwd",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "alterUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "_userId",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "_dataId",
				"type": "uint8"
			}
		],
		"name": "checkCredit",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "_dataId",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "_userId",
				"type": "uint8"
			}
		],
		"name": "checkList",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "_owner",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "_credit",
				"type": "uint8"
			},
			{
				"internalType": "uint8[]",
				"name": "_not",
				"type": "uint8[]"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_address",
				"type": "string"
			}
		],
		"name": "createData",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_userName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_pwd",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_userAddress",
				"type": "address"
			}
		],
		"name": "createUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "datas",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "dataId",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "dataCredit",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "downloadTimes",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "dataName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "dataDescription",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "dataAddress",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_ad",
				"type": "address"
			}
		],
		"name": "fadToid",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "_id",
				"type": "uint8"
			}
		],
		"name": "fdataToOwner",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "fdnameToid",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "fnameToid",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_freeId",
				"type": "uint256"
			}
		],
		"name": "freeApproved",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_freeId",
				"type": "uint256"
			}
		],
		"name": "freeDenied",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "_userId",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "_dataId",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "_text",
				"type": "string"
			}
		],
		"name": "freeRequest",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "_id",
				"type": "uint8"
			}
		],
		"name": "getAccessible",
		"outputs": [
			{
				"internalType": "uint8[]",
				"name": "",
				"type": "uint8[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "_id",
				"type": "uint8"
			}
		],
		"name": "getAccessibleLength",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getDataLength",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getMsgLength",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "_id",
				"type": "uint8"
			}
		],
		"name": "getMsgList",
		"outputs": [
			{
				"internalType": "uint8[]",
				"name": "",
				"type": "uint8[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "_id",
				"type": "uint8"
			}
		],
		"name": "getMsgListLength",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "_id",
				"type": "uint8"
			}
		],
		"name": "getNotAllowed",
		"outputs": [
			{
				"internalType": "uint8[]",
				"name": "",
				"type": "uint8[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "_id",
				"type": "uint8"
			}
		],
		"name": "getNotAllowedLength",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getUserLength",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint8",
				"name": "_id",
				"type": "uint8"
			}
		],
		"name": "isExitDataName",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_userAddress",
				"type": "address"
			},
			{
				"internalType": "uint8",
				"name": "_id",
				"type": "uint8"
			}
		],
		"name": "isExitUserAddress",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_username",
				"type": "string"
			},
			{
				"internalType": "uint8",
				"name": "_id",
				"type": "uint8"
			}
		],
		"name": "isExitUserName",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "msgs",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "reqId",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "resId",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "dataId",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "status",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "text",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "_userId",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "_dataId",
				"type": "uint8"
			}
		],
		"name": "shareRequest",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "users",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "userId",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "credit",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "userName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "pwd",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "userDescription",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]