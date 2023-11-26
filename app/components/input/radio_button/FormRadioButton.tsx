import React from 'react';
import RadioButtonComponent from './RadioButtonComponent';
import {useFormikContext} from 'formik';

interface FormRadioButtonProps {
    name: string;
    value: string;
    status: 'checked' | 'unchecked';
    label: string;
}

const FormRadioButton: React.FC<FormRadioButtonProps> = ({name, value, status, label}) => {
    const {values, setFieldValue} = useFormikContext();
    const _values: any = values;

    const onPress = () => {
        setFieldValue(name, _values[name] === value ? '' : value);
    };

    return (
        <>
            <RadioButtonComponent
                value={value}
                status={_values[name] === value ? 'checked' : 'unchecked'}
                label={label}
                onPress={onPress}
            />
        </>
    );
};

export default FormRadioButton;
