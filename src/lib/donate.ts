/** Wallet addresses for startup Rogue — ARF donations */

export const DONATE_WALLETS = [
  {
    id: "btc",
    name: "Bitcoin",
    symbol: "BTC",
    network: "Bitcoin Network",
    address: "bc1q0v85wdphm88cg5wlrfhrnue67sh2g6s30wlfam",
    color: "#F7931A",
  },
  {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    network: "Ethereum Mainnet",
    address: "0x78af25067c39a12887a3a29628e69b30d244c381",
    color: "#627EEA",
  },
  {
    id: "sol",
    name: "Solana",
    symbol: "SOL",
    network: "Solana",
    address: "EKzMxC4Yiad9THBbu8XREe4naigpPRqko6Z2HJLU9k8n",
    color: "#14F195",
  },
  {
    id: "usdc",
    name: "USD Coin",
    symbol: "USDC",
    network: "Ethereum (ERC-20)",
    address: "0x78af25067c39a12887a3a29628e69b30d244c381",
    color: "#2775CA",
  },
] as const;

export type DonateWallet = (typeof DONATE_WALLETS)[number];
