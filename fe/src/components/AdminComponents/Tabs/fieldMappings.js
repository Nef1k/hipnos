import CharField from "./TabFields/CharField";
import NumericField from "./TabFields/NumericField";
import ChoicesMultipleField from "./TabFields/ChoicesMultiple";
import DateTimeField from "./TabFields/DateTimeField";
import BooleanField from "./TabFields/BooleanField";

export const FieldMappings = {
  "char": ({fieldName, field, value, onValueChanged}) => (
    <CharField fieldName={fieldName} field={field} value={value} onValueChanged={onValueChanged} />),
  "integer": ({fieldName, field, value, onValueChanged}) => (
    <NumericField fieldName={fieldName} field={field} />),
  "choice_multiple": ({fieldName, field, value, onValueChanged}) => (
    <ChoicesMultipleField fieldName={fieldName} field={field} />),
  "datetime": ({fieldName, field, value, onValueChanged}) => (
    <DateTimeField fieldName={fieldName} field={field} value={value} onValueChanged={onValueChanged} />),
  "boolean": ({fieldName, field, value, onValueChanged}) => (
    <BooleanField fieldName={fieldName} field={field} value={value} onValueChanged={onValueChanged} />),
}
