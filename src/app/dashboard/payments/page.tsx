'use client'

import { CreditCard, Calendar, ArrowDownCircle, ArrowUpCircle } from 'lucide-react'

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
        <p className="mt-1 text-sm text-gray-600">
          View and manage your payment history
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Total Spent</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">$2,890</p>
          <div className="mt-1 text-sm text-green-600 flex items-center">
            <ArrowUpCircle className="h-4 w-4 mr-1" />
            <span>4.3% from last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Pending Payments</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">$450</p>
          <div className="mt-1 text-sm text-red-600 flex items-center">
            <ArrowDownCircle className="h-4 w-4 mr-1" />
            <span>2 pending transactions</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Last Payment</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">$599</p>
          <div className="mt-1 text-sm text-gray-600 flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>March 15, 2024</span>
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {[1, 2, 3, 4].map((transaction) => (
            <div key={transaction} className="p-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <CreditCard className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Machu Picchu Tour Package</p>
                  <p className="text-sm text-gray-500">Mar 15, 2024 at 2:30 PM</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">$599.00</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Completed
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 