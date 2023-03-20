import React from "react";

import useFormWithValidation from "../../utils/useFormWithValidation";
import PopupTemplate from "../PopupTemplate";
import {createRow} from "../../utils/api/TableApi";
import {RowsInfoType} from "../../utils/types";
import {ERROR_CREATE_ROW_MESSAGE} from "../../utils/constants";

type RowCreatePopupProps = {
    onClickClose: (arg: boolean) => void;
    setRowsInfo: ({...args}: RowsInfoType[]) => void;
    rowsInfo: RowsInfoType[];
    setIsLoading: (arg: boolean) => void;
}

const RowCreatePopup: React.FC<RowCreatePopupProps> = ({onClickClose, setRowsInfo, rowsInfo, setIsLoading}) => {
    const initValues = {
        documentName: '',
        documentType: '',
        documentStatus: '',
        employeeNumber: '',
        employeeSignatureName: '',
        employeeSigDate: '',
        companySignatureName: '',
        companySigDate: '',
    }
    const [errorCreateRowMessage, setErrorCreateRowMessage] = React.useState('');

    const {values, errors, isValid, handleChange} = useFormWithValidation(initValues, initValues)

    const createNewRow = async () => {
        const token = localStorage.getItem('JWT')
        setErrorCreateRowMessage('')
        setIsLoading(true)
        try {
            if (token) {
                const newRow = await createRow<RowsInfoType>(token, {
                    documentName: values.documentName,
                    documentType: values.documentType,
                    documentStatus: values.documentStatus,
                    employeeNumber: values.employeeNumber,
                    employeeSignatureName: values.employeeSignatureName,
                    employeeSigDate: new Date(values.employeeSigDate).toISOString(),
                    companySignatureName: values.companySignatureName,
                    companySigDate: new Date(values.companySigDate).toISOString(),
                })
                setRowsInfo([...rowsInfo, newRow])
            }
        } catch (err) {
            setErrorCreateRowMessage(ERROR_CREATE_ROW_MESSAGE)
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <PopupTemplate
            onClickClose={onClickClose}
            errors={errors}
            values={values}
            handleChange={handleChange}
            isValid={isValid}
            onSubmit={createNewRow}
            errorMessage={errorCreateRowMessage}
        />
    )
}

export default RowCreatePopup
