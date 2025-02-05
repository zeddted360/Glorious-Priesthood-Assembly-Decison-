import {
  Card,
  CardContent,
} from "@/components/ui/card";
import FormHeader from "./FormHeader";
import Form from "./Form";

const MembershipForm = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <Card className="max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        {/* Header Section */}
        <FormHeader />
        {/* Form Section */}
        <CardContent className="p-6 text-gray-900 dark:text-gray-100">
          <Form />
        </CardContent>
      </Card>
    </div>
  );
};

export default MembershipForm;
