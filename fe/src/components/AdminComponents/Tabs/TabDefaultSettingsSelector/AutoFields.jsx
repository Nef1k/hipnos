import {FieldMappings} from "../fieldMappings";

const AutoFields = ({fields, values, onValuesChanged}) => {
  function handleFieldChange(fieldName, newValue) {
    onValuesChanged && onValuesChanged((prevState) => ({
      ...prevState,
      [fieldName]: newValue,
    }));
  }

  function getFieldComponent(fieldName, field) {
    const fieldType = field.type;
    const componentFactory = FieldMappings[fieldType];
    return componentFactory({
      fieldName, field,
      value: values[fieldName],
      onValueChanged: handleFieldChange,
    });
  }

  return (
    <>
      {Object.keys(fields).map((fieldName, idx) => {
        const field = fields[fieldName];
        return <div key={idx}>{getFieldComponent(fieldName, field)}</div>;
      })}
    </>
  );
}

export default AutoFields;
