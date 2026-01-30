
export enum TabType {
  HOME = 'home',
  DEALS = 'deals',
  REDEEM = 'redeem',
  COMMUNITY = 'community',
  WALLET = 'wallet',
  ACCOUNT = 'account'
}

export interface Product {
  id: number;
  name: string;
  price: string;
  oldPrice: string;
  discount: string;
  category: string;
  platform: string;
  icon: string;
}

export interface Voucher {
  id: string;
  brand: string;
  value: string;
  price: number;
  expiry: string;
  code?: string;
  qr?: string;
}

export interface WithdrawalRecord {
  id: string;
  amount: number;
  time: string;
  status: 'completed' | 'pending';
}

export interface User {
  name: string;
  avatar: string;
  rank: string;
  birthYear: number;
  phone: string;
  bankAccount: string;
  bankName: string;
  bankOwnerName: string;
  email: string;
  balance: number;
}

export interface Bank {
  id: string;
  name: string;
  shortName: string;
  logo?: string;
}
