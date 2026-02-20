import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ErrorMessage = ({ message }: { message: string }) => (
  <Alert variant="destructive" className="max-w-md mx-auto bg-red-950/60 border-red-700/50 text-red-200">
    <AlertTriangle className="h-4 w-4" />
    <AlertDescription>{message}</AlertDescription>
  </Alert>
);

export default ErrorMessage;
