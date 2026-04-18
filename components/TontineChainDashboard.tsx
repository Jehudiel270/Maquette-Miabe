"use client";
import { useState } from "react";
import {
  Wallet,
  Users,
  Clock,
  Shield,
  CheckCircle2,
  TrendingUp,
  Calendar,
  Lock,
  FileText,
  LogOut,
  Zap,
  AlertCircle,
  ArrowDownFromLine,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { TontineCalendar } from "@/components/TontineCalendar";
import { ExitTontineModal } from "@/components/ExitTontineModal";
import { RulesModal } from "@/components/RulesModal";

interface Member {
  id: string;
  name: string;
  avatar: string;
  paid: boolean;
  autoLoanCovered?: boolean;
  amount: number;
}

interface Transaction {
  id: string;
  type: string;
  member: string;
  amount: number;
  timestamp: string;
  hash: string;
}

export function TontineChainDashboard() {
  const [showExitModal, setShowExitModal] = useState(false);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  const handleWithdraw = async () => {
    setIsWithdrawing(true);
    // Simulate withdrawal process
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsWithdrawing(false);
    // Success notification would go here
  };

  // Mock data for the dashboard
  const [tontineData] = useState({
    totalPot: 1250000,
    currency: "FCFA",
    currentBeneficiary: "Aïcha Koffi",
    frequency: "Tous les 10 jours",
    strictMode: true,
    contributionAmount: 50000,
    nextRoundDate: "25 avril 2026",
    totalMembers: 25,
    paidMembers: 25, // In strict mode, always 25/25 because auto-loans cover missing payments
    progressPercentage: 100, // Always 100% in strict mode
    members: [
      { id: "1", name: "Aïcha Koffi", avatar: "👩🏿", paid: true, amount: 50000 },
      { id: "2", name: "Kofi Mensah", avatar: "👨🏿", paid: true, amount: 50000 },
      {
        id: "3",
        name: "Fatou Diallo",
        avatar: "👩🏿",
        paid: true,
        amount: 50000,
      },
      {
        id: "4",
        name: "Ibrahim Touré",
        avatar: "👨🏿",
        paid: true,
        amount: 50000,
      },
      {
        id: "5",
        name: "Aminata Sow",
        avatar: "👩🏿",
        paid: true,
        autoLoanCovered: true,
        amount: 50000,
      }, // Covered by auto-loan
      {
        id: "6",
        name: "Kwame Asante",
        avatar: "👨🏿",
        paid: true,
        amount: 50000,
      },
      {
        id: "7",
        name: "Mariama Baldé",
        avatar: "👩🏿",
        paid: true,
        amount: 50000,
      },
      {
        id: "8",
        name: "Seydou Traoré",
        avatar: "👨🏿",
        paid: true,
        autoLoanCovered: true,
        amount: 50000,
      }, // Covered by auto-loan
      {
        id: "9",
        name: "Nathalie Assogba",
        avatar: "👩🏿",
        paid: true,
        amount: 50000,
      },
      {
        id: "10",
        name: "Jean-Claude Ahonon",
        avatar: "👨🏿",
        paid: true,
        amount: 50000,
      },
      {
        id: "11",
        name: "Fadila Ouedraogo",
        avatar: "👩🏿",
        paid: true,
        amount: 50000,
      },
      {
        id: "12",
        name: "Mohamed Keita",
        avatar: "👨🏿",
        paid: true,
        autoLoanCovered: true,
        amount: 50000,
      }, // Covered by auto-loan
    ] as Member[],
    transactions: [
      {
        id: "1",
        type: "Cotisation",
        member: "Aïcha Koffi",
        amount: 50000,
        timestamp: "15 avril 2026, 14:23",
        hash: "0x7f8a...9b2c",
      },
      {
        id: "2",
        type: "Emprunt Auto",
        member: "Aminata Sow",
        amount: 50000,
        timestamp: "15 avril 2026, 14:20",
        hash: "0x8b3f...2d4e",
      },
      {
        id: "3",
        type: "Cotisation",
        member: "Kofi Mensah",
        amount: 50000,
        timestamp: "15 avril 2026, 12:45",
        hash: "0x3c1d...4e8f",
      },
      {
        id: "4",
        type: "Emprunt Auto",
        member: "Seydou Traoré",
        amount: 50000,
        timestamp: "15 avril 2026, 11:30",
        hash: "0x5e9a...3c7b",
      },
      {
        id: "5",
        type: "Cotisation",
        member: "Fatou Diallo",
        amount: 50000,
        timestamp: "15 avril 2026, 10:12",
        hash: "0x9a4b...7c3d",
      },
      {
        id: "6",
        type: "Distribution",
        member: "Kwame Asante",
        amount: 1200000,
        timestamp: "5 avril 2026, 09:00",
        hash: "0x2e5f...1a8b",
      },
      {
        id: "7",
        type: "Cotisation",
        member: "Mariama Baldé",
        amount: 50000,
        timestamp: "4 avril 2026, 16:34",
        hash: "0x6d2c...9e4a",
      },
    ] as Transaction[],
  });

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-8 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl mb-1">TontineChain</h1>
            <p className="text-blue-100 text-sm opacity-90">
              Tontine Blockchain
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
            <Wallet className="w-6 h-6" />
          </div>
        </div>

        {/* Total Pot - Prominent Display */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <p className="text-blue-100 text-sm mb-2">Cagnotte totale</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl tracking-tight">
              {tontineData.totalPot.toLocaleString("fr-FR")}
            </span>
            <span className="text-lg text-blue-100">
              {tontineData.currency}
            </span>
          </div>
        </div>
      </header>

      <div className="px-6 py-6 space-y-4">
        {/* Current Beneficiary Card */}
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-sm">
          <div className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-green-600 text-white p-2 rounded-xl">
                <TrendingUp className="w-4 h-4" />
              </div>
              <span className="text-sm text-green-800">
                Bénéficiaire actuel du tour
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl text-green-900 mb-1">
                  {tontineData.currentBeneficiary}
                </p>
                <p className="text-sm text-green-700">Tour en cours</p>
              </div>
              <div className="text-5xl">👩🏿</div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="w-full border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-300 h-auto py-3"
            onClick={() => setShowRulesModal(true)}
          >
            <div className="flex flex-col items-center gap-1.5">
              <FileText className="w-5 h-5" />
              <span className="text-xs">Voir les règles</span>
            </div>
          </Button>
          <Button
            variant="outline"
            className="w-full border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800 hover:border-red-300 h-auto py-3"
            onClick={() => setShowExitModal(true)}
          >
            <div className="flex flex-col items-center gap-1.5">
              <LogOut className="w-5 h-5" />
              <span className="text-xs">Quitter la tontine</span>
            </div>
          </Button>
        </div>

        {/* Tontine Info Card */}
        <Card className="border-blue-100 shadow-sm">
          <div className="p-5 space-y-4">
            <h3 className="text-base mb-3 text-gray-900">
              Paramètres de la tontine
            </h3>

            {/* Frequency */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 text-blue-700 p-2 rounded-lg">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Fréquence</p>
                  <p className="text-base text-gray-900">
                    {tontineData.frequency}
                  </p>
                </div>
              </div>
              <Clock className="w-5 h-5 text-blue-600" />
            </div>

            <div className="border-t border-gray-100 pt-4">
              {/* Strict Mode */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-amber-100 text-amber-700 p-2 rounded-lg">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Mode strict</p>
                    <p className="text-base text-gray-900">
                      {tontineData.strictMode ? "Actif" : "Inactif"}
                    </p>
                  </div>
                </div>
                <Lock className="w-5 h-5 text-amber-600" />
              </div>
            </div>

            {tontineData.strictMode && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-3">
                <div className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-amber-700 mt-0.5 shrink-0" />
                  <p className="text-xs text-amber-800">
                    Les paiements sont garantis automatiquement. En cas de solde
                    insuffisant, un emprunt automatique est déclenché pour
                    couvrir la cotisation.
                  </p>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Contribution Progress */}
        <Card className="border-gray-200 shadow-sm">
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base text-gray-900">
                Progression des cotisations
              </h3>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                {tontineData.paidMembers}/{tontineData.totalMembers}
              </Badge>
            </div>
            <div className="relative">
              <div className="w-full bg-green-100 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-green-500 to-green-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${tontineData.progressPercentage}%` }}
                />
              </div>
            </div>
            <div className="flex items-center justify-between text-sm mt-3">
              <span className="text-green-700 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                {tontineData.progressPercentage}% complété
              </span>
              <span className="text-gray-600">
                Prochain tour: {tontineData.nextRoundDate}
              </span>
            </div>
          </div>
        </Card>

        {/* Members List */}
        <Card className="border-gray-200 shadow-sm">
          <div className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-gray-700" />
              <h3 className="text-base text-gray-900">Statut des membres</h3>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar">
              {tontineData.members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{member.avatar}</div>
                    <div>
                      <p className="text-sm text-gray-900">{member.name}</p>
                      <p className="text-xs text-gray-500">
                        {member.amount.toLocaleString("fr-FR")}{" "}
                        {tontineData.currency}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* CRITICAL FIX: In strict mode, show auto-loan coverage instead of "Non payé" */}
                    {member.autoLoanCovered ? (
                      <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100 gap-1 text-xs">
                        <Zap className="w-3 h-3" />
                        Emprunt auto
                      </Badge>
                    ) : (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Payé
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {tontineData.strictMode && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-start gap-2 text-xs text-gray-600">
                  <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  <p>
                    Mode strict actif : tous les paiements sont garantis. Les
                    emprunts automatiques couvrent les soldes insuffisants.
                  </p>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Calendar */}
        <TontineCalendar />

        {/* Transaction History */}
        <Card className="border-gray-200 shadow-sm">
          <div className="p-5">
            <h3 className="text-base text-gray-900 mb-4">
              Historique des transactions
            </h3>

            <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
              {tontineData.transactions.map((tx) => (
                <div
                  key={tx.id}
                  className={`border-l-4 pl-4 py-2 rounded-r-lg ${
                    tx.type === "Emprunt Auto"
                      ? "border-indigo-500 bg-indigo-50/50"
                      : tx.type === "Distribution"
                        ? "border-green-500 bg-green-50/50"
                        : "border-blue-500 bg-blue-50/50"
                  }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">{tx.type}</span> •{" "}
                        {tx.member}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {tx.timestamp}
                      </p>
                    </div>
                    <p
                      className={`text-sm ${
                        tx.type === "Distribution"
                          ? "text-green-700"
                          : "text-gray-900"
                      }`}
                    >
                      {tx.type === "Distribution" ? "+" : ""}
                      {tx.amount.toLocaleString("fr-FR")} {tontineData.currency}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-xs text-gray-400 font-mono">
                      Hash:
                    </span>
                    <span className="text-xs text-blue-600 font-mono">
                      {tx.hash}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Blockchain Transparency Notice - Enhanced */}
        <Card className="bg-gradient-to-br from-blue-600 to-blue-700 border-none shadow-md mb-8">
          <div className="p-5 text-white">
            <div className="flex items-start gap-3">
              <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg mt-0.5">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base mb-2 flex items-center gap-2">
                  Transparence totale blockchain
                  <CheckCircle2 className="w-4 h-4" />
                </h4>
                <p className="text-sm text-blue-100 leading-relaxed mb-3">
                  Chaque transaction est enregistrée de manière immuable et
                  vérifiable par tous les membres.
                </p>
                <p className="text-sm text-blue-100 leading-relaxed">
                  Les règles définies à la création (fréquence personnalisée et
                  mode strict) sont immuables et exécutées automatiquement par
                  le smart contract.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Withdrawal Button */}
        <Button
          variant="outline"
          onClick={handleWithdraw}
          disabled={isWithdrawing}
          className="w-full border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800 hover:border-green-300 h-auto py-3"
        >
          <div className="flex flex-col items-center gap-1.5">
            <ArrowDownFromLine className="w-5 h-5" />
            <span className="text-xs">
              {isWithdrawing ? "Traitement..." : "Retirer l'argent"}
            </span>
          </div>
        </Button>
      </div>

      {/* Modals */}
      <ExitTontineModal open={showExitModal} onOpenChange={setShowExitModal} />
      <RulesModal open={showRulesModal} onOpenChange={setShowRulesModal} />
    </div>
  );
}
