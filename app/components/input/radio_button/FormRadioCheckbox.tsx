import React from 'react';
import RadioButtonComponent from './RadioCheckbox';
import {useFormikContext} from 'formik';

interface FormRadioCheckboxProps {
    name: string;
    label: string;
}

const FormRadioCheckbox: React.FC<FormRadioCheckboxProps> = ({name, label}) => {
    const {values, setFieldValue} = useFormikContext();
    const _values: any = values;

    const onPress = (isChecked: boolean) => {
        setFieldValue(name, isChecked);
    };

    return (
        <>
            <RadioButtonComponent
                value={_values[name]}
                label={label}
                onValueChange={onPress}
            />
        </>
    );
};

export default FormRadioCheckbox;
