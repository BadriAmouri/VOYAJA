import React from "react";

const TermsCheckbox = ({ checked, onChange, errorMessage }) => (
  <div className="check">
    <input type="checkbox" checked={checked} onChange={onChange} />
    <label>I agree to all the Terms and Privacy Policies</label>
    {errorMessage && <p className="error-message">{errorMessage}</p>}
  </div>
);

export default TermsCheckbox;
