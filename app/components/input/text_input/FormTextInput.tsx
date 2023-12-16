import {StyleSheet} from 'react-native'
import React from 'react'
import {useFormikContext} from 'formik';
import {HelperText, TextInput, TextInputProps} from 'react-native-paper';

interface FormTextInputProps {
    name: string;
    inputProps?: TextInputProps;
    helpText?: string;
}


const FormTextInput: React.FC<FormTextInputProps> = ({inputProps, name, helpText}) => {
    const {values, setFieldValue, errors} = useFormikContext();
    const _values: any = values;
    const _errors: any = errors;
    return (
        <>
            <TextInput
                {...{
                    ...inputProps,
                    value: _values[name],
                    onChangeText: (value: any) => setFieldValue(name, value),
                    error: _errors[name],
                }}
            />
            {(_errors[name] || helpText) && (
                <HelperText type={_errors[name] ? "error" : "info"} visible={Boolean(errors)}>
                    {_errors[name] ? _errors[name] : helpText}
                </HelperText>
            )}
        </>

    )
}

export default FormTextInput

const styles = StyleSheet.create({})