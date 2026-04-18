"use client";
import {
  FileText,
  DollarSign,
  Calendar,
  Users,
  Shield,
  Zap,
  CreditCard,
  LogOut,
  Lock,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface RulesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RulesModal({ open, onOpenChange }: RulesModalProps) {
  // Mock tontine rules data
  const rules = {
    contributionAmount: 50000,
    currency: "FCFA",
    frequency: "Tous les 10 jours",
    customFrequency: true,
    totalMembers: 25,
    strictMode: true,
    beneficiaryOrder: [
      "Aïcha Koffi",
      "Kofi Mensah",
      "Fatou Diallo",
      "Ibrahim Touré",
      "Aminata Sow",
      "Kwame Asante",
      "... et 19 autres membres",
    ],
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto custom-scrollbar">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-100 p-3 rounded-full">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <DialogTitle className="text-xl text-gray-900">
              Règles de la tontine
            </DialogTitle>
          </div>
          <DialogDescription className="text-left text-gray-600">
            Règles immuables définies par le smart contract
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 my-4">
          {/* Contribution Amount */}
          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-blue-600" />
              <h4 className="text-sm text-gray-900">Montant de cotisation</h4>
            </div>
            <p className="text-2xl text-gray-900">
              {rules.contributionAmount.toLocaleString("fr-FR")}{" "}
              {rules.currency}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Par membre, à chaque cycle
            </p>
          </div>

          {/* Frequency */}
          <div className="border-l-4 border-green-500 pl-4 py-2">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-green-600" />
              <h4 className="text-sm text-gray-900">Fréquence de cotisation</h4>
            </div>
            <p className="text-lg text-gray-900">{rules.frequency}</p>
            {rules.customFrequency && (
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100 mt-2">
                Fréquence personnalisée
              </Badge>
            )}
          </div>

          {/* Strict Mode */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-5 h-5 text-amber-600" />
              <h4 className="text-sm text-gray-900">Mode strict</h4>
              <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 ml-auto">
                {rules.strictMode ? "Actif" : "Inactif"}
              </Badge>
            </div>
            {rules.strictMode && (
              <div className="space-y-2 text-sm text-amber-900">
                <p className="flex items-start gap-2">
                  <Lock className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>
                    Aucun retard de paiement n&apos;est toléré. Le système
                    garantit automatiquement toutes les cotisations.
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Automatic Payment Conditions */}
          <div className="border-l-4 border-purple-500 pl-4 py-2">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-purple-600" />
              <h4 className="text-sm text-gray-900">
                Conditions de paiement automatique
              </h4>
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-purple-600">•</span>
                <span>
                  Les cotisations sont automatiquement prélevées à chaque
                  échéance
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600">•</span>
                <span>
                  Le smart contract vérifie et exécute les transactions
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600">•</span>
                <span>Aucune intervention manuelle n&apos;est requise</span>
              </li>
            </ul>
          </div>

          {/* Automatic Loan Conditions (Strict Mode) */}
          {rules.strictMode && (
            <div className="border-l-4 border-indigo-500 pl-4 py-2">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="w-4 h-4 text-indigo-600" />
                <h4 className="text-sm text-gray-900">
                  Conditions d&apos;emprunt automatique
                </h4>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600">•</span>
                  <span>
                    Si votre solde est insuffisant, un emprunt automatique est
                    déclenché
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600">•</span>
                  <span>
                    L&apos;emprunt couvre le montant de la cotisation manquante
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600">•</span>
                  <span>
                    Des intérêts s&apos;appliquent selon les termes du contrat
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600">•</span>
                  <span>
                    Le remboursement est prioritaire lors de votre distribution
                  </span>
                </li>
              </ul>
            </div>
          )}

          {/* Beneficiary Order */}
          <div className="border-l-4 border-cyan-500 pl-4 py-2">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-cyan-600" />
              <h4 className="text-sm text-gray-900">Ordre des bénéficiaires</h4>
            </div>
            <p className="text-xs text-gray-500 mb-3">
              Ordre immuable défini à la création ({rules.totalMembers} membres)
            </p>
            <div className="space-y-1.5 max-h-40 overflow-y-auto custom-scrollbar">
              {rules.beneficiaryOrder.map((name, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm bg-gray-50 p-2 rounded"
                >
                  <span className="text-gray-500 min-w-[24px]">
                    {index + 1}.
                  </span>
                  <span className="text-gray-700">{name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Exit Conditions */}
          <div className="border-l-4 border-red-500 pl-4 py-2">
            <div className="flex items-center gap-2 mb-2">
              <LogOut className="w-4 h-4 text-red-600" />
              <h4 className="text-sm text-gray-900">Conditions de retrait</h4>
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-red-600">•</span>
                <span>
                  Sortie possible uniquement avant votre tour de bénéficiaire
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600">•</span>
                <span>
                  Pénalités financières définies par le smart contract
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600">•</span>
                <span>Perte de tous les droits accumulés</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600">•</span>
                <span>Action irréversible enregistrée sur la blockchain</span>
              </li>
            </ul>
          </div>

          {/* Blockchain Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
              <div>
                <h4 className="text-sm text-blue-900 mb-1">
                  Smart Contract Immuable
                </h4>
                <p className="text-xs text-blue-700 leading-relaxed">
                  Toutes ces règles sont codées dans un smart contract déployé
                  sur la blockchain. Elles ne peuvent être modifiées par aucun
                  membre, garantissant une transparence et une équité totales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
