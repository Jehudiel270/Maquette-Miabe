"use client";

import { useEffect } from 'react';
import { ArrowUpDown, User, Crown } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface BeneficiaryOrderProps {
  numberOfMembers: number;
  beneficiaries: string[];
  setBeneficiaries: (beneficiaries: string[]) => void;
}

export function BeneficiaryOrder({
  numberOfMembers,
  beneficiaries,
  setBeneficiaries,
}: BeneficiaryOrderProps) {
  useEffect(() => {
    const newBeneficiaries = Array(numberOfMembers).fill('').map((_, i) =>
      beneficiaries[i] || ''
    );
    setBeneficiaries(newBeneficiaries);
  }, [numberOfMembers]);

  const handleBeneficiaryChange = (index: number, value: string) => {
    const updated = [...beneficiaries];
    updated[index] = value;
    setBeneficiaries(updated);
  };

  return (
    <div className="space-y-3">
      <Label className="text-gray-700 flex items-center gap-2">
        <ArrowUpDown className="w-4 h-4 text-green-600" />
        Ordre des bénéficiaires
      </Label>

      <Card className="p-4 bg-gray-50 border-gray-200">
        <div className="space-y-2 max-h-[280px] overflow-y-auto custom-scrollbar pr-1">
          {Array.from({ length: numberOfMembers }).map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 shadow-sm"
            >
              {/* Position Badge */}
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-white font-bold text-sm flex-shrink-0 ${
                index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
                index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500' :
                index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-600' :
                'bg-gradient-to-br from-blue-500 to-green-500'
              }`}>
                {index === 0 ? <Crown className="w-4 h-4" /> : index + 1}
              </div>

              {/* Member Input */}
              <div className="flex-1 flex items-center gap-2">
                <User className="w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder={`Membre ${index + 1}`}
                  value={beneficiaries[index] || ''}
                  onChange={(e) => handleBeneficiaryChange(index, e.target.value)}
                  className="border-none bg-transparent focus:ring-0 focus:border-none p-0 h-auto text-sm"
                />
              </div>

              {/* Turn Label */}
              <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
                Tour {index + 1}
              </span>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-500 mt-3 flex items-start gap-2">
          <span className="text-green-600">ℹ️</span>
          <span>
            L'ordre défini détermine qui reçoit la cagnotte à chaque tour.
            Cet ordre sera verrouillé dans le smart contract.
          </span>
        </p>
      </Card>
    </div>
  );
}
