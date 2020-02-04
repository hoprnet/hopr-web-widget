import React from "react";
import { minifyHex } from "src/utils";

// mostly similar to 'a' but includes a default behaviour
const Link = ({
  children,
  href,
  ...props
}: React.AnchorHTMLAttributes<any>) => {
  return (
    <>
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>

      <style jsx>{`
        a {
          color: var(--font-color);
          text-decoration: none;
        }

        a:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  );
};
export default Link;

// an etherscan link to an address
interface IAddressLinkProps extends React.AnchorHTMLAttributes<any> {
  address: string;
}
export const AddressLink = ({ address, ...props }: IAddressLinkProps) => {
  return (
    <Link href={`https://etherscan.io/address/${address}`} {...props}>
      {minifyHex(address)}
    </Link>
  );
};

// an etherscan link to a tx
interface ITxLinkProps extends React.AnchorHTMLAttributes<any> {
  tx: string;
}
export const TxLink = ({ tx, ...props }: ITxLinkProps) => {
  return (
    <Link href={`https://etherscan.io/tx/${tx}`} {...props}>
      {minifyHex(tx)}
    </Link>
  );
};

// an etherscan link to a token / user's balance
interface IBalanceLinkProps extends React.AnchorHTMLAttributes<any> {
  account: string;
  token: string;
}
export const BalanceLink = ({
  account,
  token,
  children,
  ...props
}: IBalanceLinkProps) => {
  return (
    <Link href={`https://etherscan.io/token/${token}?a=${account}`} {...props}>
      {children}
    </Link>
  );
};
