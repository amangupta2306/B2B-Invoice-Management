import { CompanyProfileForm } from "@/components/company-profile-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <Card className="m-4">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>
          Set up your company profile to enable smooth invoicing.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CompanyProfileForm />
      </CardContent>
    </Card>
  );
}
