"use client";
import {
  AlertTriangle,
  XCircle,
  Ban,
  TrendingDown,
  Shield,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ExitTontineModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExitTontineModal({
  open,
  onOpenChange,
}: ExitTontineModalProps) {
  const handleConfirmExit = () => {
    // This would trigger the smart contract exit function
    console.log("User confirmed exit from tontine");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-red-100 p-3 rounded-full">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <DialogTitle className="text-xl text-gray-900">
              Quitter la tontine
            </DialogTitle>
          </div>
          <DialogDescription className="text-left text-gray-600">
            Cette action entraîne des conséquences importantes et irréversibles.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-4">
          {/* Warning List */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="text-sm text-red-900 mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Risques et pénalités
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <XCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                <span className="text-sm text-red-800">
                  <strong>Perte des avantages de participation</strong> - Vous
                  perdez tous les droits accumulés dans la tontine
                </span>
              </li>
              <li className="flex items-start gap-3">
                <TrendingDown className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                <span className="text-sm text-red-800">
                  <strong>
                    Perte de la position dans l&apos;ordre des bénéficiaires
                  </strong>{" "}
                  - Votre tour ne sera jamais honoré
                </span>
              </li>
              <li className="flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                <span className="text-sm text-red-800">
                  <strong>Pénalités financières possibles</strong> définies par
                  le smart contract selon les règles de la tontine
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Ban className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                <span className="text-sm text-red-800">
                  <strong>Impossibilité de réintégrer la tontine</strong> sans
                  accord unanime du groupe
                </span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                <span className="text-sm text-red-800">
                  <strong>Impact sur l&apos;historique financier</strong> -
                  Cette sortie sera enregistrée de manière permanente sur la
                  blockchain
                </span>
              </li>
            </ul>
          </div>

          {/* Additional Info */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-900">
              <strong>Note importante :</strong> Cette action est irréversible
              et sera exécutée automatiquement par le smart contract.
              Assurez-vous de bien comprendre toutes les conséquences avant de
              continuer.
            </p>
          </div>
        </div>

        <DialogFooter className="flex-col-reverse sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto"
          >
            Annuler
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirmExit}
            className="w-full sm:w-auto bg-red-600 hover:bg-red-700"
          >
            Confirmer la sortie
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
