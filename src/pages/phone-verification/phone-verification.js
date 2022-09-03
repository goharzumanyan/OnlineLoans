import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactCodeInput from "react-verification-code-input";
import Paging from "../../components/paging";
import { useAppStore } from "../../stores/app-provider";
import "./phone-verification.scss";

const PhoneVerification = () => {
  const [code, setCode] = useState("");

  const { verifySession } = useAppStore();

  useEffect(() => {
    console.log(verifySession);
  }, []);

  const resendSms = () => {
    // alert("Նամակը ուղարկված է");
  };

  const verifyCode = () => {
    if (!code) return false;
    verifySession(code, "phone");
  };

  return (
    <div className="verification_page">
      <div className="main_section">
        <h2 className="section_title">Հեռախոսահամարի վավերացում</h2>
        <div className="small_fields">
          <div className="field_block">
            <div className="field_name">Կոդ</div>
            <ReactCodeInput
              className="input_cells"
              fields={4}
              onComplete={(data) => setCode(data)}
            />
          </div>
          <div className="info_block">
            Խնդրում ենք մուտքագրել Ձեր հեռախոսահամարին ուղարկված քառանիշ կոդը:
          </div>
          <div className="send_repeat">
            <span className="repeat_hint">Չե՞ք ստացել կոդը</span>{" "}
            <span className="inner_link" onClick={resendSms}>
              Ուղարկել նորից
            </span>
          </div>
        </div>

        <div className="buttons_block">
          <Link className="back_btn" to="/">
            Հետ
          </Link>
          <button className="next_btn" type="button" onClick={verifyCode}>
            Առաջ
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhoneVerification;
