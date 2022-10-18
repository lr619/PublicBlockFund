import Link from "next/link";
import { useEffect, useState } from "react";
import * as fcl from "@onflow/fcl";
import { useAuth } from "../contexts/AuthContext";
import "../flow/config";
import styles from '../styles/Home.module.css'

export default function Navbar() {
  const { user, logOut, logIn } = useAuth();
  const [balance, setBalance] = useState();

  useEffect(() => {
    getBalance();
  }, [user])

  async function getBalance() {
    if (!user.loggedIn) {
      setBalance(null);
      return;
    }
    const response = await fcl.query({
      cadence: `
      import FungibleToken from 0xStandard
      import ExampleToken from 0xDeployer

      pub fun main(account: Address): UFix64? {
          let vaultRef = getAccount(account).getCapability(ExampleToken.VaultBalancePath)
                          .borrow<&ExampleToken.Vault{FungibleToken.Balance}>()

          return vaultRef?.balance
      }
      `,
      args: (arg, t) => [arg(user.addr, t.Address)]
    });

    setBalance(response);
  }

  return (
    <div>
      <div className='mb-5 flex justify-between items-center pt-2'>
        <Link href="/">
          <a>
            <h1 className={styles.sooth}>VOTING</h1>
          </a>
        </Link>
        <div className="flex gap-10">
          <div className='flex space-x-4 items-center'>
            <h1 className='text-[#38E8C6]'>Address: </h1>
            <h1 className='border px-7 text-center text-[#38E8C6] text-sm py-1 rounded-xl border-[#38E8C6] w-56'>{user.loggedIn ? user.addr : "Please connect wallet -->"}</h1>
          </div>
          {!balance ? null :
            <div className='flex space-x-4 items-center'>
              <h1 className='text-[#38E8C6]'>Balance: </h1>
              <h1 className='border px-7 text-center text-[#38E8C6] text-sm py-1 rounded-xl border-[#38E8C6] w-36'>{parseFloat(balance).toFixed(2)}</h1>
            </div>
          }
        </div>
        <div>{!user.loggedIn ? <button className='border rounded-xl border-[#38E8C6] px-5 text-sm text-[#38E8C6] py-1'
          onClick={logIn}>Connect</button> : <button className='border rounded-xl border-[#38E8C6]
        px-5 text-sm text-[#38E8C6] py-1' onClick={logOut}>Logout</button>}
        </div>
      </div>
      <hr className='border-[#38E8C6]' />
    </div>
  );
}