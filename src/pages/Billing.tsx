
import { useEffect } from "react";
import AppLayout from "../components/layout/AppLayout";
import { BillingForm } from "../components/billing/BillingForm";
import { gsap } from "gsap";

const Billing = () => {
  useEffect(() => {
    // Animate page elements
    gsap.from(".page-header", {
      opacity: 0,
      y: -20,
      duration: 0.6
    });
  }, []);
  
  return (
    <AppLayout title="Billing System">
      <div className="page-header mb-8">
        <p className="text-muted-foreground">
          Create bills for customers
        </p>
      </div>
      
      <BillingForm />
    </AppLayout>
  );
};

export default Billing;
