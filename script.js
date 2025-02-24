document.addEventListener("DOMContentLoaded", () => {
    const connectButton = document.getElementById("connectButton");

    if (!connectButton) {
        console.error("❌ Connect Wallet button not found in the DOM!");
        return;
    }

    async function connectWallet() {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
                const walletAddress = accounts[0];

                connectButton.innerText = `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;
                connectButton.style.backgroundColor = "#4CAF50"; // Green to indicate success

                console.log("✅ Wallet connected:", walletAddress);
            } catch (error) {
                console.error("❌ Wallet connection failed:", error);
                alert("Failed to connect wallet. Please try again.");
            }
        } else {
            alert("❌ MetaMask is not installed. Please install it from https://metamask.io/");
        }
    }

    connectButton.addEventListener("click", connectWallet);
});