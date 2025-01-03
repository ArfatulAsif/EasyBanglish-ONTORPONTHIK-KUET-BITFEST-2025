import { Select, SelectItem } from "@nextui-org/react";

const LogTypeSelector = ({ operationTypes, values, setValues }) => {
  return (
    <div>
      <Select
        className="max-w-xs"
        label="Favorite Animal"
        placeholder="Select an animal"
        selectedKeys={values}
        selectionMode="multiple"
        onSelectionChange={setValues}
      >
        {operationTypes &&
          operationTypes.map((operationType) => (
            <SelectItem key={operationType}>{operationType}</SelectItem>
          ))}
      </Select>
    </div>
  );
};

export default LogTypeSelector;
