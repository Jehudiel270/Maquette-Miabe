"use client";

import { useState } from 'react';
import { 
  CreditCard, 
  Building2, 
  Smartphone, 
  Shield, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Lock,
  ChevronRight
} from 'lucide-react';

type PaymentMethod = 'card' | 'bank' | 'mobile';
type PaymentStatus = 'pending' | 'processing' | 'confirmed';

export function PaymentScreen() {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('card');
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('pending');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const amount = '50,000';
  const nextDeadline = '25 avril 2026';
  const strictMode = true;
  const transactionId = '0x7a8f9b2c4d...3e5f1a6b';

  const paymentMethods = [
    { id: 'card' as PaymentMethod, name: 'Carte bancaire', icon: CreditCard },
    { id: 'bank' as PaymentMethod, name: 'Virement bancaire', icon: Building2 },
    { id: 'mobile' as PaymentMethod, name: 'Mobile Money', icon: Smartphone },
  ];

  const handlePayment = () => {
    setPaymentStatus('processing');
    
    setTimeout(() => {
      setPaymentStatus('confirmed');
      setShowConfirmation(true);
    }, 2000);
  };

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-emerald-600" />
            </div>
            
            <h2 className="text-2xl mb-2 text-gray-900">Paiement confirmé</h2>
            <p className="text-gray-600 mb-8">
              Votre contribution a été enregistrée avec succès sur la blockchain
            </p>

            <div className="bg-gray-50 rounded-2xl p-6 mb-6 text-left">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Montant payé</span>
                <span className="text-2xl text-gray-900">{amount} FCFA</span>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-600 text-sm">Prochaine échéance</span>
                  <span className="text-gray-900">{nextDeadline}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">ID de transaction</span>
                  <span className="text-blue-600 text-xs font-mono">{transactionId}</span>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex items-start gap-2">
                <Shield className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-blue-800">
                  Transaction sécurisée et enregistrée de manière permanente sur la blockchain
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowConfirmation(false)}
              className="w-full bg-gray-900 text-white py-4 rounded-2xl hover:bg-gray-800 transition-colors"
            >
              Retour à l&apos;accueil
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-emerald-600 pt-12 pb-24 px-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-white text-2xl mb-2">TontineChain</h1>
          <p className="text-blue-100 text-sm">Contribution mensuelle</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 -mt-16">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          
          {/* Amount Section */}
          <div className="p-8 border-b border-gray-100">
            <p className="text-gray-600 text-sm mb-2">Montant à payer</p>
            <p className="text-5xl text-gray-900 mb-6">{amount} <span className="text-2xl text-gray-600">FCFA</span></p>
            
            <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
              <Clock className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-amber-800 mb-0.5">Prochaine échéance</p>
                <p className="text-amber-900">{nextDeadline}</p>
              </div>
            </div>
          </div>

          {/* Strict Mode Indicator */}
          {strictMode && (
            <div className="px-8 pt-6">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center gap-3">
                <Lock className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-blue-900 text-sm">Mode strict actif</p>
                  <p className="text-blue-700 text-xs mt-0.5">Paiement automatique activé</p>
                </div>
              </div>
            </div>
          )}

          {/* Payment Methods */}
          <div className="p-8">
            <h3 className="text-gray-900 mb-4">Méthode de paiement</h3>
            
            <div className="space-y-3 mb-6">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                      selectedMethod === method.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      selectedMethod === method.id ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        selectedMethod === method.id ? 'text-blue-600' : 'text-gray-600'
                      }`} />
                    </div>
                    
                    <span className={`flex-1 text-left ${
                      selectedMethod === method.id ? 'text-blue-900' : 'text-gray-900'
                    }`}>
                      {method.name}
                    </span>
                    
                    <ChevronRight className={`w-5 h-5 ${
                      selectedMethod === method.id ? 'text-blue-600' : 'text-gray-400'
                    }`} />
                  </button>
                );
              })}
            </div>

            {/* Payment Status */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3">
                {paymentStatus === 'pending' && (
                  <>
                    <AlertCircle className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-900">Statut : En attente</p>
                      <p className="text-xs text-gray-600 mt-0.5">Prêt à effectuer le paiement</p>
                    </div>
                  </>
                )}
                
                {paymentStatus === 'processing' && (
                  <>
                    <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    <div>
                      <p className="text-sm text-blue-900">Traitement en cours...</p>
                      <p className="text-xs text-blue-700 mt-0.5">Vérification blockchain</p>
                    </div>
                  </>
                )}
                
                {paymentStatus === 'confirmed' && (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="text-sm text-emerald-900">Statut : Confirmé</p>
                      <p className="text-xs text-emerald-700 mt-0.5">Enregistré sur la blockchain</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6 flex items-start gap-3">
              <Shield className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-900 mb-1">Transaction sécurisée</p>
                <p className="text-xs text-gray-600">
                  Vos données sont cryptées et la transaction est enregistrée sur la blockchain pour une traçabilité complète
                </p>
              </div>
            </div>

            {/* Pay Button */}
            <button
              onClick={handlePayment}
              disabled={paymentStatus !== 'pending'}
              className={`w-full py-4 rounded-2xl transition-all text-white ${
                paymentStatus === 'pending'
                  ? 'bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              {paymentStatus === 'pending' && 'Payer maintenant'}
              {paymentStatus === 'processing' && 'Traitement...'}
              {paymentStatus === 'confirmed' && 'Paiement effectué'}
            </button>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="text-center py-8 text-gray-500 text-xs">
          <p>Propulsé par la technologie blockchain</p>
          <p className="mt-1">Paiements sécurisés et transparents</p>
        </div>
      </div>
    </div>
  );
}
