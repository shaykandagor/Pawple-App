import React from 'react';
import {StyleSheet} from 'react-native';
import ChipSelector from './ChipSelector';
import {IconSource} from 'react-native-paper/lib/typescript/components/Icon';
import {useFormikContext} from 'formik';

interface FormChipSelectorProps {
  name: string;
  options: string[];
  mode: 'flat' | 'outlined';
  icon: IconSource;
}

const FormChipSelector: React.FC<FormChipSelectorProps> = ({...props}) => {
  const {name, options, mode, icon} = props;

  const {values, setFieldValue, errors, touched, setFieldTouched} = useFormikContext();
  const _values: any = values;
  const _errors: any = errors;

  return (
    <ChipSelector
      options={options}
      selectedOptions={_values[name] || []}
      onSelect={(selected) => {
        setFieldValue(name, selected);
        setFieldTouched(name, true);
      }}
      mode={mode}
      icon={icon}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FormChipSelector;
