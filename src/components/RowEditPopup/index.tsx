import React from "react";

import useFormWithValidation from "../../utils/useFormWithValidation";
import {editRow} from "../../utils/api/TableApi";
import PopupTemplate from "../PopupTemplate";
import {RowsInfoType} from "../../utils/types";
import {ERROR_EDITE_ROW_MESSAGE} from "../../utils/constants";

type EditPopupProps = {
    onClickClose: (arg: boolean) => void;
    selectedRow: RowsInfoType;
    setRowsInfo: ({...args}: RowsInfoType[]) => void;
    rowsInfo: RowsInfoType[];
    setIsLoading: (arg: boolean) => void;
}

const RowEditPopup: React.FC<EditPopupProps> = ({onClickClose, selectedRow, setRowsInfo, rowsInfo, setIsLoading}) => {
    const [errorEditRowMessage, setErrorEditRowMessage] = React.useState('');

    const initValues = {
        documentName: selectedRow.documentName,
        documentType: selectedRow.documentType,
        documentStatus: selectedRow.documentStatus,
        employeeNumber: selectedRow.employeeNumber,
        employeeSignatureName: selectedRow.employeeSignatureName,
        employeeSigDate: selectedRow.employeeSigDate.substring(0, 10),
        companySignatureName: selectedRow.companySignatureName,
        companySigDate: selectedRow.companySigDate.substring(0, 10),
    }

    const initErrors = {
        documentName: '',
        documentType: '',
        documentStatus: '',
        employeeNumber: '',
        employeeSignatureName: '',
        employeeSigDate: '',
        companySignatureName: '',
        companySigDate: '',
    }

    const {values, errors, isValid, handleChange} = useFormWithValidation(initValues, initErrors)

    const saveEditedData = async () => {
        const token = localStorage.getItem('JWT')
        setErrorEditRowMessage('')
        setIsLoading(true)
        try {
            if(token) {
                const updatedRow = await editRow<RowsInfoType>(token, selectedRow.id, {
                    documentName: values.documentName,
                    documentType: values.documentType,
                    documentStatus: values.documentStatus,
                    employeeNumber: values.employeeNumber,
                    employeeSignatureName: values.employeeSignatureName,
                    employeeSigDate: values.employeeSigDate + selectedRow.employeeSigDate.substring(10, 24),
                    companySignatureName: values.companySignatureName,
                    companySigDate: values.companySigDate + selectedRow.companySigDate.substring(10, 24),
                })
                const otherRow = rowsInfo.filter((item) => item.id !== updatedRow.id)
                setRowsInfo([...otherRow, updatedRow])
            }
        } catch (err) {
            setErrorEditRowMessage(ERROR_EDITE_ROW_MESSAGE)
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
            onSubmit={saveEditedData}
            errorMessage={errorEditRowMessage}
        />
    )
}

export default RowEditPopup
