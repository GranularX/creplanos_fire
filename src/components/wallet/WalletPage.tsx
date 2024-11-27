import React from 'react';
import { Wallet, CreditCard, ArrowUpRight, ArrowDownRight, DollarSign, History } from 'lucide-react';
import { Button } from '../Button';

export function WalletPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Balance Card */}
        <div className="glass-card p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Wallet Balance</h2>
              <p className="text-white/60">Manage your earnings and payments</p>
            </div>
            <Wallet className="w-12 h-12 text-primary" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-gradient-to-r from-primary to-secondary">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-white/80 text-sm mb-1">Available Balance</p>
                  <h3 className="text-3xl font-bold text-white">$2,458.30</h3>
                </div>
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" className="flex-1 !py-2">Withdraw</Button>
                <Button variant="secondary" className="flex-1 !py-2">Add Money</Button>
              </div>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-green-500/20">
                  <ArrowUpRight className="w-6 h-6 text-green-400" />
                </div>
                <p className="text-white/60">This Month</p>
              </div>
              <h4 className="text-2xl font-bold text-white mb-1">$4,589.00</h4>
              <p className="text-green-400 text-sm">+12.5% from last month</p>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-red-500/20">
                  <ArrowDownRight className="w-6 h-6 text-red-400" />
                </div>
                <p className="text-white/60">Pending</p>
              </div>
              <h4 className="text-2xl font-bold text-white mb-1">$958.00</h4>
              <p className="text-red-400 text-sm">3 pending payments</p>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Transaction History</h3>
            <Button variant="secondary">
              <History className="w-4 h-4 mr-2" />
              View All
            </Button>
          </div>

          <div className="space-y-4">
            {[
              { type: 'Payment Received', amount: '+$850.00', date: 'Today, 2:45 PM', status: 'Completed' },
              { type: 'Withdrawal', amount: '-$1,200.00', date: 'Yesterday, 4:30 PM', status: 'Processing' },
              { type: 'Payment Received', amount: '+$650.00', date: 'Mar 15, 2024', status: 'Completed' },
            ].map((transaction, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-xl bg-white/5"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${
                    transaction.amount.startsWith('+') ? 'bg-green-500/20' : 'bg-red-500/20'
                  }`}>
                    <DollarSign className={`w-5 h-5 ${
                      transaction.amount.startsWith('+') ? 'text-green-400' : 'text-red-400'
                    }`} />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{transaction.type}</h4>
                    <p className="text-white/60 text-sm">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.amount.startsWith('+') ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {transaction.amount}
                  </p>
                  <span className={`text-sm ${
                    transaction.status === 'Completed' ? 'text-green-400' : 'text-yellow-400'
                  }`}>
                    {transaction.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}