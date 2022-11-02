import { useState, useEffect } from "react";
import ErrorMessage from "./ErrorMessage";

const networks = {
  Siriusnet: {
    chainId: `0x${Number(67390).toString(16)}`,
    chainName: "Siriusnet",
    nativeCurrency: {
      name: "Sirius",
      symbol: "MCD",
      decimals: 18
    },
    rpcUrls: [
      "https://u0tnafcv6j:o2T045sxuCNXL878RDQLp5__Zj-es2cvdjtgkl4etn0@u0v7kwtvtg-u0wj114sve-rpc.us0-aws.kaleido.io/",
      "https://u0v7kwtvtg-u0wj114sve-rpc.us0-aws.kaleido.io/"
    ],
    blockExplorerUrls: ["https://siriusnet.tryethernal.com/"]
  }
};

const changeNetwork = async ({ networkName, setError }) => {
  try {
    if (!window.ethereum) throw new Error("No crypto wallet found");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          ...networks[networkName]
        }
      ]
    });
  } catch (err) {
    setError(err.message);
  }
};

export default function App() {
  const [error, setError] = useState();

  const handleNetworkSwitch = async (networkName) => {
    setError();
    await changeNetwork({ networkName, setError });
  };

  const networkChanged = (chainId) => {
    console.log({ chainId });
  };

  useEffect(() => {
    window.ethereum.on("chainChanged", networkChanged);

    return () => {
      window.ethereum.removeListener("chainChanged", networkChanged);
    };
  }, []);

  return (
    <div className="credit-card w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
      <main className="mt-4 p-4">
        <div className="mt-4">
          <button
            onClick={() => handleNetworkSwitch("Siriusnet")}
            className="mt-2 mb-2 btn btn-primary submit-button focus:ring focus:outline-none w-full"
          >
            Connect to SiriusNet
          </button>
          <ErrorMessage message={error} />
        </div>
      </main>
    </div>
  );
}
