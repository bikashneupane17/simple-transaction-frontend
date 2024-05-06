import Form from "react-bootstrap/Form";

export const CustomInput = ({ label, ...rest }) => {
  return (
    <Form.Group className="mb-3">
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control {...rest} />
    </Form.Group>
  );
};

export const CustomSelect = ({ label, options, ...rest }) => {
  return (
    <Form.Group className="mb-3">
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Select {...rest}>
        <option value="">--Select--</option>
        {options.map((opt, index) => (
          <option key={index} value={opt.value}>
            {opt.text}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};
