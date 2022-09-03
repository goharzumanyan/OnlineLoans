import { useLocation, Redirect } from "react-router-dom";
import Paging from "../paging";
import NewLoanApplicationRoutes from "../../routes/new-loan-application";
import { useState } from "react";
import { useEffect } from "react";
import { redirect } from "../../helpers/utils";
import { DataFormProvider, useDataForm } from "../../stores/form-context";

const steps = [
  {
    path: "profile/personal-details",
  },
  {
    path: "profile/contact-details",
  },
  {
    path: "profile/address",
  },
  {
    path: "profile/attachments",
  },
  {
    path: "application",
  },
]

const NewLoanApplicationComponentImpl = () => {
  const [step, setStep] = useState(1);
  const params = new URLSearchParams(useLocation().search);
  const clientId = params.get('clientId');
  const callbackUrl = params.get('callbackUrl');
  const loanTypeId = params.get('loanTypeId');
  const amount = params.get('amount');
  const referenceId = params.get('referenceId');
  const redirectUrl = params.get('redirectUrl');
  const data = params.get('data');

  useEffect(() => {
    dataForm.handleOnAfterSave(moveToNext);
    dataForm.handleOnSave(() => { });
    redirect(`/new-loan-application/${steps[step - 1].path}`);
  }, [step]);

  const dataForm = useDataForm();

  const hasNext = () => step - 1 < steps.length;
  const hasPrev = () => step > 1;

  const moveToNext = () => {
    if (step - 1 < steps.length) {
      setStep(step + 1);
    }
  }

  const onNext = () => {
    dataForm.onSave();
  }

  const onPrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  }

  return <>
    <div className="title_block">
      <h1 className="page_title">Ապառիկ վճարում</h1>
      {/*<Paging page={1} forward={handleSubmit(onSubmit)} />*/}
      <Paging page={step} count={steps.length} forward={step >= steps.length ? null : onNext} back={step <= 1 ? null : onPrev} />
    </div>
    <div className="main_section" >
      <NewLoanApplicationRoutes />
      <div className="buttons_block">
        {hasPrev()
          ? <button className="back_btn" onClick={onPrev}>
            {step === steps.length ? "Հրաժարվել" : "Հետ"}
          </button>
          : null}
        {hasNext()
          ? <button className="next_btn" onClick={dataForm.onSave}>
            {step === steps.length ? "Հաստատել" : "Առաջ"}
          </button>
          : null}
        </div>
      </div>
  </>;
}

const NewLoanApplicationComponent = () =>
  <DataFormProvider>
    <NewLoanApplicationComponentImpl />
  </DataFormProvider>

export default NewLoanApplicationComponent;