'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useState } from 'react';

export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [address, setAddress] = useState('');
  const [pubKey, setPubKey] = useState('');

  const handleConnectWallet = async () => {
    if (walletConnected) {
      setWalletConnected(false);
      return;
    }

    await window.keplr.enable('cosmoshub-4');

    const offlineSigner = await window.getOfflineSigner('cosmoshub-4');
    const accounts = await offlineSigner.getAccounts();

    setAddress(accounts[0].address);
    setPubKey(btoa(String.fromCharCode(...accounts[0].pubkey)));
    setWalletConnected(true);
  };

  return (
    <div className="px-6 py-2">
      <Card>
        <CardHeader>
          <CardTitle>Public Key Viewer</CardTitle>
          <CardDescription>
            Connect your wallet and see the public key of it
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleConnectWallet}>
            {walletConnected ? 'Disconnect' : 'Connect Wallet (Keplr)'}
          </Button>
          {walletConnected && (
            <div className="mt-4">
              <div>
                Address:{' '}
                <code className="font-mono font-semibold">{address}</code>
              </div>
              <div>
                Public Key (base64):{' '}
                <code className="font-mono font-semibold">{pubKey}</code>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
