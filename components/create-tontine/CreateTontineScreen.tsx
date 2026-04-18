"use client";

import { useState } from 'react';
import { Shield, Users, TrendingUp, Lock, Info, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import { BeneficiaryOrder } from '@/components/create-tontine/BeneficiaryOrder';
import { FrequencySelector } from '@/components/create-tontine/FrequencySelector';
import { DatePicker } from '@/components/create-tontine/DatePicker';

export function CreateTontineScreen() {
  const [tontineName, setTontineName] = useState('');
  const [numberOfMembers, setNumberOfMembers] = useState<number>(5);
  const [contributionAmount, setContributionAmount] = useState('');
  const [frequency, setFrequency] = useState({
    type: 'mensuelle' as 'hebdomadaire' | 'mensuelle' | 'personnalisée',
    customInterval: 1,
    customUnit: 'semaines' as 'jours' | 'semaines' | 'mois',
  });
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [beneficiaries, setBeneficiaries] = useState<string[]>([]);
  const [strictMode, setStrictMode] = useState(false);

  const handleCreateTontine = () => {
    console.log('Creating tontine with:', {
      tontineName,
      numberOfMembers,
      contributionAmount,
      frequency,
      startDate,
      beneficiaries,
      strictMode,
    });
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-50 flex items-center justify-center p-4">
      {/* Mobile Phone Frame */}
      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-600 to-green-600 px-6 py-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
          
          <div className="relative">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <Shield className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold">TontineChain</h1>
            </div>
            <p className="text-blue-100 text-sm">Sécurisé par blockchain</p>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-6 max-h-[650px] overflow-y-auto custom-scrollbar">
          {/* Alert about immutable rules */}
          <Alert className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 shadow-sm">
            <Lock className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-sm text-green-800 ml-2 leading-relaxed">
              Les règles définies sont enregistrées sur la blockchain et ne peuvent plus être modifiées après création.
            </AlertDescription>
          </Alert>

          {/* Tontine Name */}
          <div className="space-y-2.5">
            <Label htmlFor="tontine-name" className="text-gray-700 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              Nom de la tontine
            </Label>
            <Input
              id="tontine-name"
              placeholder="Ex: Groupe Entraide Quartier"
              value={tontineName}
              onChange={(e) => setTontineName(e.target.value)}
              className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl h-12 shadow-sm"
            />
          </div>

          {/* Number of Members */}
          <div className="space-y-2.5">
            <Label htmlFor="num-members" className="text-gray-700 flex items-center gap-2">
              <Users className="w-4 h-4 text-green-600" />
              Nombre de membres
            </Label>
            <Input
              id="num-members"
              type="number"
              min="2"
              max="50"
              value={numberOfMembers}
              onChange={(e) => setNumberOfMembers(parseInt(e.target.value) || 0)}
              className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl h-12 shadow-sm"
            />
          </div>

          {/* Contribution Amount */}
          <div className="space-y-2.5">
            <Label htmlFor="contribution" className="text-gray-700">
              Montant de cotisation
            </Label>
            <div className="relative">
              <Input
                id="contribution"
                type="number"
                placeholder="Ex: 10000"
                value={contributionAmount}
                onChange={(e) => setContributionAmount(e.target.value)}
                className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl h-12 pr-20 shadow-sm"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 px-3 py-1 bg-gradient-to-r from-blue-100 to-green-100 text-blue-700 rounded-lg text-sm font-semibold">
                FCFA
              </span>
            </div>
          </div>

          {/* Frequency Selector */}
          <FrequencySelector value={frequency} onChange={setFrequency} />

          {/* Beneficiary Order */}
          <BeneficiaryOrder
            numberOfMembers={numberOfMembers}
            beneficiaries={beneficiaries}
            setBeneficiaries={setBeneficiaries}
          />

          {/* Start Date */}
          <DatePicker
            date={startDate}
            onDateChange={setStartDate}
            label="Date de début"
            minDate={today}
          />

          {/* Divider */}
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-xs text-gray-500 font-medium">
                Options avancées
              </span>
            </div>
          </div>

          {/* Mode Strict */}
          <Card className="p-5 bg-gradient-to-br from-blue-50/50 to-purple-50/50 border-blue-200/50 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-purple-600" />
                  <Label htmlFor="strict-mode" className="text-gray-900 font-semibold cursor-pointer">
                    Mode strict
                  </Label>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  Le mode strict active le prélèvement automatique des cotisations. En cas de solde insuffisant, 
                  un emprunt peut être déclenché automatiquement avec notification à l'utilisateur.
                </p>
              </div>
              <Switch
                id="strict-mode"
                checked={strictMode}
                onCheckedChange={setStrictMode}
                className="mt-1"
              />
            </div>
            
            {strictMode && (
              <div className="mt-3 p-3 bg-purple-100/50 rounded-lg border border-purple-200/50">
                <p className="text-xs text-purple-800 font-medium flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5" />
                  Mode strict activé - Prélèvements automatiques
                </p>
              </div>
            )}
          </Card>

          {/* Info Card */}
          <Card className="bg-gradient-to-br from-blue-50 to-green-50 border-blue-200 p-5 shadow-sm">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-gray-700">
                <p className="font-semibold text-blue-900 mb-1.5">Transparence totale</p>
                <p className="text-xs leading-relaxed">
                  Chaque membre pourra vérifier en temps réel qui a payé et le montant de la cagnotte. 
                  La libération automatique se fera selon l'ordre défini.
                </p>
              </div>
            </div>
          </Card>

          {/* Create Button */}
          <div className="pt-2 pb-4">
            <Button
              onClick={handleCreateTontine}
              className="w-full bg-gradient-to-r from-blue-600 via-blue-600 to-green-600 hover:from-blue-700 hover:via-blue-700 hover:to-green-700 text-white py-7 rounded-2xl shadow-xl hover:shadow-2xl transition-all font-bold text-lg group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <Shield className="w-6 h-6 mr-2 relative z-10" />
              <span className="relative z-10">Créer la tontine</span>
            </Button>
          </div>

          {/* Security Notice */}
          <div className="text-center pb-2">
            <p className="text-xs text-gray-500 font-medium">
              🔒 Sécurisé par smart contract • Immuable • Transparent
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
